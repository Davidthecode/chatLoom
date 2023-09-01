'use client';

import { auth, db } from "@/app/firebase/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from 'react';
import Link from "next/link";

export default function ChatSearchBar() {
    const currentUserUid = auth.currentUser?.uid;
    const collectionRef = collection(db, 'users');
    const [users, setUsers] = useState<any>([]);
    const [wordEntered, setWordEntered] = useState('');
    const [filteredData, setFilteredData] = useState<any[]>([]);

    const q = query(
        collectionRef,
        where('userId', '!=', currentUserUid)
    );

    useEffect(() => {
        const getUsers = async () => {
            const querySnapshot = await getDocs(q)
            const userDocs = querySnapshot.docs.map((doc) => doc.data())
            setUsers(userDocs.map((user) => ({ username: user.username, id: user.userId })))
        }
        getUsers()
    }, []);

    const handleFilter = (e: any) => {
        const enteredWord = e.target.value
        setWordEntered(enteredWord)
        const newFilter = users.filter((user: any) => {
            return user.username.toLowerCase().includes(enteredWord.toLowerCase())
        })

        if (enteredWord === '') {
            setFilteredData([])
        } else {
            setFilteredData(newFilter)
        }
    };

    return (
        <div className=" h-full flex flex-col items-center w-full justify-center rounded-r-md relative">
            <input
                type="text"
                className="w-full outline-none text-black dark:text-white dark:bg-[#374151]"
                placeholder='search...'
                value={wordEntered}
                onChange={handleFilter}
            />
            {filteredData.length > 0 &&
                <div className="mt-[6.5rem] bg-yellow-500 absolute w-full px-1">
                    {filteredData.map((user) => {
                        return (
                            <Link href={`/chats/${user.id}`}>
                                <p className="cursor-pointer mt-1">{user.username}</p>
                            </Link>
                        )
                    })}
                </div>
            }
        </div>
    );
};