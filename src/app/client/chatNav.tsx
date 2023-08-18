'use client'

import { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useParams } from "next/navigation";


export default function ChatNav() {
    const params = useParams();
    const [chatDisplayName, setChatDisplayName] = useState('');
    const collectionRef = collection(db, 'users');

    const getChatDisplayName = async() => {
        const querySnapshot = await getDocs(collectionRef);
        const collectionData = querySnapshot.docs.map(doc => doc.data());
        collectionData.map((data)=> {
            if(data.userId == params.name){
                setChatDisplayName(data.username); 
            };
        });   
    };
    

    useEffect(()=> {
        getChatDisplayName()
    },[]);

    

    return (
        <div>
            <div className="mx-2">
                <h1 className="font-semibold text-lg">{chatDisplayName ? chatDisplayName : ''}</h1>
                <p className="text-sm font-medium">Last seen 5mins ago</p>
            </div>
        </div>
    )
}