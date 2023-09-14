'use client';

import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import { useParams } from "next/navigation";

type chatNav = {
    username: string,
    online: boolean | null
}

export default function ChatNav() {
    const params = useParams();
    const receiveruserUid = params.name as string;
    const [userInfo, setUserInfo] = useState<chatNav>({
        username: '',
        online: null
    })

    const currentUsreUid = auth.currentUser?.uid
    const userRef = doc(db, 'users', receiveruserUid);

    if(currentUsreUid){
        useEffect(() => {
            async function getOnlineStatus() {
                const unsubscribe = onSnapshot(userRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setUserInfo({
                            username: data.username,
                            online: data.online
                        });
                    } else {
                        setUserInfo({
                            username: 'no user',
                            online: null
                        });
                    }
                })
                return () => {
                    unsubscribe();
                }
            }
            getOnlineStatus();
        }, [])
    }

    return (
        <div>
            {currentUsreUid ? (
                <div className="mx-2">
                    <h1 className="text-md font-semibold">{userInfo?.username ? userInfo.username : ''}</h1>
                    {userInfo?.online ? <p><span className="mr-1 inline-block w-2 h-2 bg-green-500 rounded-full"></span>Online</p> : <p className="text-sm"><span className="mr-1 inline-block w-2 h-2 bg-red-500 rounded-full"></span>Offline</p>}
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};