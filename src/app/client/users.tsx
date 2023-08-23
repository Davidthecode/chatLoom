'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "../firebase/firebase-config";
import { collection, getDocs } from 'firebase/firestore';
import Link from "next/link";
import { useRouter } from "next/navigation";

type UserData = {
    creationTime: string,
    email: string,
    lastSignInTime: string,
    photoUrl: string,
    userId: string,
    username: string
};

async function fetchCollectionData(): Promise<UserData[]> {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const collectionData = querySnapshot.docs.map(doc => doc.data() as UserData);
        return collectionData;
    } catch (error) {
        console.log(error);
        return [];
    };
};

export default function Users() {
    // const router = useRouter();
    const [users, setUsers] = useState<UserData[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            const collectionData = await fetchCollectionData();
            setUsers(collectionData);
        };
        fetchData();
    }, []);

    // const handleLinkClick = (userId: string, e: any) => {
    //     e.preventDefault()
    //     setSelectedUserId(userId);
    //     console.log('clicked');
    // };


    return (
        <div>
            {users?.map((user, index) => {
                // const isSelected = user.userId === selectedUserId;
                return (
                    <Link href={`/chats/${user.userId}`} key={index}>
                        <div className={`flex mt-2 h-20  pt-4 pl-2 cursor-pointer font-sans`}>
                            <div className="">
                                <Image src={user.photoUrl} alt="image" className="w-10 h-10 rounded-full mr-2" width={10} height={10} />
                            </div>
                            <div>
                                <h1 className="font-semibold">{user.username}</h1>
                                <p className="text-sm">Lorem ipsum dolor sit, am</p>
                            </div>
                            <div className="ml-auto mr-2">
                                <p className="text-xs">2m ago</p>
                                <p className="text-xs rounded-full bg-green-500 w-4 h-4 mt-1 text-white text-center ml-auto">2</p>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};