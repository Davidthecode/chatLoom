'use client';

import { useState } from 'react';
import { collection, addDoc, FieldValue, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase-config';
import { BsSend } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';

type MessageType = {
    text: string,
    createdAt: FieldValue,
    user: string | null | undefined,
    senderId: string | undefined,
    groupId: string | null
};

export default function GroupChatbox() {
    const {name} = useParams()
    
    const [newMessage, setNewMessage] = useState('');
    const groupsRef = collection(db, 'groupMessages');
    const currentuserUid = auth.currentUser?.uid;

    const MessageDetails: MessageType = {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser?.displayName,
        senderId: auth.currentUser?.uid,
        groupId: name as string
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (newMessage === '') {
            toast.error('Enter a message before sending');
        } else {
            await addDoc(groupsRef, MessageDetails);
            setNewMessage('');
        };
    };

    return (
        <div className='border h-5/6 flex items-center justify-center w-11/12 bg-white rounded-lg'>
            {currentuserUid ? (
                <div className='border h-full flex items-center justify-center w-full shadow-md bg-white px-1 rounded-lg'>
                    <input
                        type="text"
                        placeholder='write a message'
                        className=" outline-none h-5/6 w-11/12 px-3"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <div className='flex items-center justify-between bg-green-500 rounded-xl text-white ml-auto mb-2 px-4 py-1 cursor-pointer text-sm mt-auto' onClick={handleSubmit}>
                        <BsSend className='mr-1' />
                        <p>send</p>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}