'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, addDoc, serverTimestamp, FieldValue } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebase-config';
import { BsSend } from 'react-icons/bs';
import toast from 'react-hot-toast';

type MessageType = {
    text: string,
    createdAt: FieldValue,
    user: string | null | undefined,
    senderId: string | undefined,
    receiverId: string | string[],
    conversationId: string,
    imageUrl: string | null | undefined
};

export default function Chatbox() {
    const params = useParams();
    const [newMessage, setNewMessage] = useState('');
    const messageRef = collection(db, 'messages');
    const userImage = auth.currentUser?.photoURL;
    const currentuserUid = auth.currentUser?.uid;
    const receiveruserUid = params.name;

    const generateConversationId = ({ currentuserUid, receiveruserUid }: any) => {
        const sortedIds = [currentuserUid, receiveruserUid].sort(); //returns the id's in asending order
        return `${sortedIds[0]}_${sortedIds[1]}`; //concats the two id's with an underscore
    };

    const conversationId = generateConversationId({ currentuserUid, receiveruserUid });

    const MessageDetails: MessageType = {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser?.displayName,
        senderId: auth.currentUser?.uid,
        receiverId: params.name,
        conversationId,
        imageUrl: userImage
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (newMessage === '') {
            toast.error('Enter a message before sending');
        } else {
            await addDoc(messageRef, MessageDetails);
            setNewMessage('');
        };
    };

    return (
        <div className='border h-5/6 flex items-center justify-center w-11/12 bg-white rounded-lg'>
            {currentuserUid ? (
                <div className='border h-full flex items-center justify-center w-full shadow-md bg-white px-1 rounded-lg dark:bg-[#242633]'>
                    <input
                        type="text"
                        placeholder='write a message'
                        className=" outline-none h-5/6 w-11/12 px-3 dark:bg-[#242633]"
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
    );
}; 