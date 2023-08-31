'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../firebase/firebase-config";
import { collection, query, where, onSnapshot, orderBy, Timestamp } from "firebase/firestore";
import { auth } from '@/app/firebase/firebase-config'
import Loading from "../../components/loading";
import Image from "next/image";

export default function GroupMessagebox() {
    const params = useParams()
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const groupsRef = collection(db, 'groupMessages');
    const currentuserUid = auth.currentUser?.uid;
    const groupId = params.name;

    useEffect(() => {
        const queryMessage = query(
            groupsRef,
            where('groupId', '==', groupId),
            orderBy('createdAt')
        );

        const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
            let temPmessages: any[] = [];
            snapshot.forEach((doc) => {
                temPmessages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(temPmessages);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    if (loading) {
        return (
            <div className="flex items-center h-full justify-center">
                <Loading />
            </div>
        );
    };

    if (messages.length == 0) {
        return (
            <div className="flex flex-col items-center h-full justify-center">
                <Image src='https://media.giphy.com/media/DmfxhgObaJt2Qd9HOR/giphy-downsized.gif' alt='animated imahge' width={100} height={100} className="rounded-sm" />
                <h1>oops...no messages, send a message</h1>
            </div>
        );
    };

    const formatTimestamp = (timestamp: Timestamp | null | undefined) => {
        if (timestamp) {
            const date = timestamp.toDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const period = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            return `${formattedHours}:${formattedMinutes} ${period}`;
        }else console.log('wait');
        

    };

    return (
        <div>
            {messages?.map((message) => {
                const isSentByCurrentUser = message.senderId === currentuserUid;
                return (
                    <div key={message.createdAt} className={`flex flex-col justify-between items-center max-w-[70%] border w-fit px-4 py-2 mb-4 mt-1 font-sans shadow-md bg-[#4F46E5] text-white text-md ${isSentByCurrentUser ? 'ml-auto mr-2 rounded-md rounded-tr-none' : 'ml-2 rounded-md rounded-tl-none'}`}>
                        <div className=" w-full">
                            <p className="text-xs text-start">{message.user}</p>
                        </div>
                        <div className="flex items-center">
                            <div className="text-start break-words">
                                <h1>{message.text}</h1>
                            </div>
                            <div className="ml-2 mt-auto">
                                <p className="text-sm">{formatTimestamp(message.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}