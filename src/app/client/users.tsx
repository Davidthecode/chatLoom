'use client'

import Image from "next/image";
import { db } from "../firebase/firebase-config"
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from "react";
import Link from "next/link";

type UserData = {
    creationTime: string,
    email: string,
    lastSignInTime: string,
    photoUrl: string,
    userId: string,
    username: string
}

async function fetchCollectionData(): Promise<UserData[]> {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const collectionData = querySnapshot.docs.map(doc => doc.data() as UserData);
    console.log(collectionData);
    return collectionData;
}

export default function Users() {
    const [users, setUsers] = useState<UserData[]>([])

    useEffect(() => {
        async function fetchData() {
            const collectionData = await fetchCollectionData()
            setUsers(collectionData)
        }
        fetchData()
    }, [])

    return (
        <div>
            {users?.map((user, index) => {
                return (
                    <Link href={`/chats/${user.userId}`}>
                        <div key={index} className="flex mt-4 h-20 hover:bg-white pt-4 pl-2 cursor-pointer">
                            <div className="">
                                <Image src={user.photoUrl} alt="image" className="w-6 h-6 rounded-full mr-2" width={10} height={10} />
                            </div>
                            <div>
                                {user.username}
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}