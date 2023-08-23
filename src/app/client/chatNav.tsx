'use client';

import { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { useParams } from "next/navigation";


export default function ChatNav() {
    const params = useParams();
    const receiveruserUid = params.name as string
    const [chatDisplayName, setChatDisplayName] = useState('');
    const [onlineStatus, setOnlineStatus] = useState(false)
    const [lastSeen, setLastSeen] = useState('last seen 5sec ago')

    const collectionRef = collection(db, 'users');
    const userRef = doc(db, 'users', receiveruserUid);

    // const formatLastSeen = (timestamp) => {
    //     // Implement your logic here to format the timestamp
    //     // For example, you could use libraries like `date-fns` or `moment` for formatting

    //     // Return the formatted string
    //     return "Last seen just now";
    // };

    useEffect(() => {
        const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                setChatDisplayName(userData.username);

                if (userData.online) {
                    setOnlineStatus(true);
                    setLastSeen('');
                } else {
                    setOnlineStatus(false)
                    // const formattedLastSeen = formatLastSeen(userData.lastSeen);
                    // setOnlineStatus('');
                    // setLastSeen(formattedLastSeen);
                }
            }
        });

        return () => {
            // Unsubscribe from the real-time updates when the component unmounts
            unsubscribe();
        };
    }, [receiveruserUid]);

    // const getChatDisplayName = async() => {
    //     const querySnapshot = await getDocs(collectionRef);
    //     const collectionData = querySnapshot.docs.map(doc => doc.data());
    //     collectionData.map((data)=> {
    //         if(data.userId == receiveruserUid){
    //             setChatDisplayName(data.username); 
    //         };
    //     });   
    // };
    

    // useEffect(()=> {
    //     getChatDisplayName();
    // },[]);

    

    return (
        <div>
            <div className="mx-2">
                {/* <h1 className="font-semibold text-lg">{chatDisplayName ? chatDisplayName : ''}</h1> */}
                {onlineStatus ? 'online' : lastSeen}
                <p className="text-sm font-medium">Last seen 5mins ago</p>
            </div>
        </div>
    );
};