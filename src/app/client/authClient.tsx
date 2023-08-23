'use client';

import Image from 'next/image';
import { auth, provider, db } from '../firebase/firebase-config';
import { collection, doc, setDoc } from 'firebase/firestore';
import { signInWithPopup } from 'firebase/auth';
import { setCookie } from 'cookies-next';
import { useContext } from 'react';
import { AuthContext } from '../state/authContext';
import google from '../../../public/google-icon.png';

export default function AuthClient() {
    const checkContext = useContext(AuthContext);
    
    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setCookie('auth-token', result.user.refreshToken); //set auth-token to cookies to keep track of user auth state
            const userDocRef = doc(collection(db, 'users'), result.user.uid);
            await setDoc(userDocRef, {
                username: result.user.displayName,
                photoUrl: result.user.photoURL,
                email: result.user.email,
                userId: result.user.uid,
                creationTime: result.user.metadata.creationTime,
                lastSignInTime: result.user.metadata.lastSignInTime,
            });
            checkContext?.setIsAuth(true);
        } catch (error) {
            console.log(error);
        };
    };
    
    return (
        <div>
            <button
                className="border px-8 py-2 text-lg rounded rounded-lg bg-black text-white transform transition-all duration-300 flex w-full justify-center items-center mt-8 h-14 text-sm font-semibold"
                onClick={handleSignIn}
            >
                <Image src={google} alt='image' className='w-5 h-5 mr-2' />
                Sign In with Google
            </button>
        </div>
    );
};