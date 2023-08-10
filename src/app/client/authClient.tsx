'use client'

import { auth, provider } from '../../../firebase'
import { signInWithPopup } from 'firebase/auth'
import { setCookie } from 'cookies-next'
import { useContext } from 'react'
import { AuthContext } from '../state/authContext'
import { authProps } from '../components/auth'

export default function AuthClient({setIsAuth}:authProps) {
    const checkContext = useContext(AuthContext)

    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            setCookie('auth-token', result.user.refreshToken)

            checkContext?.setAuthData({
                username: result.user.email,
                photo: result.user.photoURL,
                email: result.user.email
            })

            setIsAuth(true)

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <button
                className="border px-8 py-2 text-lg rounded rounded-xl bg-black text-white transform transition-all duration-300 hover:scale-105"
                onClick={handleSignIn}
            >
                Sign In
            </button>
        </div>
    )
}