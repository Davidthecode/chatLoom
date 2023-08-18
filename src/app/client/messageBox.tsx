'use client'

import { useParams } from "next/navigation"
import { db } from "../firebase/firebase-config";
import { getDocs, collection, query, where, onSnapshot, orderBy } from "firebase/firestore"
import { useEffect, useState } from "react";
import { auth } from '@/app/firebase/firebase-config'
import Image from "next/image";

export default function MessageBox() {
    const params = useParams();
    const [messages, setMessages] = useState<any[]>([]);
    const messageRef = collection(db, 'messages');

    const currentUserId = auth.currentUser?.uid
    console.log(messages);

    useEffect(() => {
        const queryMessage = query(
            messageRef,
            where('senderId', 'in', [currentUserId, params.name]),
            where('receiverId', 'in', [currentUserId, params.name]),
            // orderBy('createdAt')
        );

        const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
            let temPmessages: any[] = [];
            snapshot.forEach((doc) => {
                temPmessages.push({ ...doc.data(), id: doc.id })
                console.log(messages);
                setMessages(temPmessages)
            })
        })
        return () => unsubscribe()
    }, [])

    if (messages.length < 1) {
        return <h1>oops...no messages, send a message</h1>
    }

    return (
        <div>
            {messages?.map((message) => {
                const isSentByCurrentUser = message.senderId === currentUserId;
                return (
                    <div key={message.createdAt} className={`max-w-[70%] border w-fit px-2 py-2 mb-4 mt-1 shadow-md ${isSentByCurrentUser ? 'ml-auto mr-2 rounded-xl rounded-tr-none' : 'ml-2 rounded-xl rounded-tl-none'}`}>
                        <div className="flex items-center justify-start">
                            <Image src={message.imageUrl} alt="image" width={20} height={20}  className="rounded-full mr-1"/>
                            <p className="text-xs">{message.user}</p>
                        </div>
                        <div className="text-start break-words">
                            <h1>{message.text}</h1>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}