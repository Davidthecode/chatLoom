'use client'

import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useState } from 'react'
import { db, auth } from '../firebase/firebase-config'
import { BsSend } from 'react-icons/bs'

export default function Chatbox() {
    const [newMessage, setNewMessage] = useState('')
    const messageRef = collection(db, 'messages')

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (newMessage === '') return
        await addDoc(messageRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser?.displayName,
            userId: auth.currentUser?.uid
        })
        setNewMessage('')
    };

    return (
        <div className='border h-1/6 flex flex-col items-center justify-center w-11/12'>
            <input
                type="text"
                className=" outline-none h-5/6 w-11/12"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className='flex items-center justify-between bg-green-500 rounded-xl text-white ml-auto mb-2 px-4 py-1 cursor-pointer text-sm mr-2' onClick={handleSubmit}>
                <BsSend className='mr-1' />
                <p>send</p>
            </div>
        </div>
    )
} 