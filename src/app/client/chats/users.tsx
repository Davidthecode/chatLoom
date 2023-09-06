'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config";

type UserData = {
    creationTime: string,
    email: string,
    lastSignInTime: string,
    photoUrl: string,
    userId: string,
    username: string
};

export default function Users() {
    const currentUserUid = auth.currentUser?.uid
    const [users, setUsers] = useState<UserData[]>([]);

    useEffect(() => {
        async function fetchCollectionData(): Promise<UserData[]> {
            try {
                const querySnapshot = await getDocs(collection(db, 'users'));
                const collectionData = querySnapshot.docs.map(doc => doc.data() as UserData);
                const filteredArray = collectionData.filter(users => users.userId !== currentUserUid)
                setUsers(filteredArray);
                return collectionData;
            } catch (error) {
                console.log(error);
                return [];
            };
        };
        fetchCollectionData();
    }, []);

    return (
        <div>
            {users?.map((user: UserData, index: number) => {
                return (
                    <Link href={`/chats/${user.userId}`} key={index}>
                        <div className={`flex mt-2 h-20 pt-4 pl-2 cursor-pointer font-mulish items-center`}>
                            <div className="flex justify-start items-center w-11/12">
                                <div className="">
                                    <Image src={user.photoUrl} alt="image" className="w-10 h-10 rounded-full mr-2" width={10} height={10} />
                                </div>
                                <div>
                                    <h1 className="font-semibold">{user.username}</h1>
                                    <p className="text-sm opacity-80">Lorem ipsum dolor sit, am</p>
                                </div>
                            </div>
                            <div className="ml-auto mr-2 w-1/12">
                                <p className="text-xs ml-auto">2m</p>
                                <p className="text-xs rounded-full bg-[#4F46E5] w-4 h-4 mt-1 text-white text-center">2</p>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};