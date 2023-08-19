'use client'

import { collection, addDoc, serverTimestamp, FieldValue } from 'firebase/firestore';
import { useState } from 'react';
import { db, auth } from '../firebase/firebase-config';
import { BsSend } from 'react-icons/bs';
import { useParams } from 'next/navigation';
import toast, {Toaster} from 'react-hot-toast';

type MessageType = {
    text: string,
    createdAt: FieldValue,
    user: string | null | undefined,
    senderId: string | undefined,
    receiverId: string | string[],
    imageUrl: string | null | undefined
};

export default function Chatbox() {
    const params = useParams();
    const [newMessage, setNewMessage] = useState('');
    const messageRef = collection(db, 'messages');

    const userImage = auth.currentUser?.photoURL;

    const MessageDetails: MessageType = {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser?.displayName,
        senderId: auth.currentUser?.uid,
        receiverId: params.name,
        imageUrl: userImage
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (newMessage === ''){
            toast.error('please enter a message before sending');
        }else {
            await addDoc(messageRef, MessageDetails);
            setNewMessage('');
        }
       
    };

    return (
        <div className='border h-5/6 flex items-center justify-center w-11/12 shadow-md bg-white px-1'>
            <input
                type="text"
                className=" outline-none h-5/6 w-11/12 px-3"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className='flex items-center justify-between bg-green-500 rounded-xl text-white ml-auto mb-2 px-4 py-1 cursor-pointer text-sm mt-auto' onClick={handleSubmit}>
                <BsSend className='mr-1' />
                <p>send</p>
            </div>
            <Toaster position='top-center' />
        </div>
    )
} 