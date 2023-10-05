'use client';

import { auth, db } from "@/app/firebase/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from 'react';
import Link from "next/link";
import { AiOutlineClose } from 'react-icons/ai';

export default function ChatSearchBar() {
    const currentUserUid = auth.currentUser?.uid;
    const collectionRef = collection(db, 'users');
    const [users, setUsers] = useState<any>([]);
    const [wordEntered, setWordEntered] = useState('');
    const [filteredData, setFilteredData] = useState<any[]>([]);

    useEffect(() => {
        if (currentUserUid) {
            const q = query(
                collectionRef,
                where('userId', '!=', currentUserUid)
            );

            const getUsers = async () => {
                const querySnapshot = await getDocs(q)
                const userDocs = querySnapshot.docs.map((doc) => doc.data())
                setUsers(userDocs.map((user) => ({ username: user.username, id: user.userId })))
            }
            getUsers()
        }else {
            setUsers([])
        }
    }, []);

    const handleFilter = (e: any) => {
        const enteredWord = e.target.value
        setWordEntered(enteredWord)
        const newFilter = users.filter((user: any) => (
            user.username.toLowerCase().includes(enteredWord.toLowerCase())
        ))

        if (enteredWord === '') {
            setFilteredData([])
        } else {
            setFilteredData(newFilter)
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered('');
    }

    return (
        <div className=" h-full flex flex-col items-start w-full justify-center rounded-r-md relative">
            <div className="flex items-center w-full">
                <input
                    type="text"
                    className="w-full outline-none text-black dark:text-white dark:bg-[#282829]"
                    placeholder='search...'
                    value={wordEntered}
                    onChange={handleFilter}
                />
                {wordEntered !== "" &&
                    <div>
                        <AiOutlineClose className='cursor-pointer mx-1' onClick={clearInput} />
                    </div>
                }
            </div>
            {filteredData.length > 0 &&
                <div className="mt-[7rem] bg-white dark:bg-[#282829] dark:text-white text-black rounded-sm absolute w-full px-1 py-2 z-30">
                    {filteredData.map((user, id) => {
                        return (
                            <Link href={`/chats/${user.id}`} key={id}>
                                <p className="cursor-pointer mt-1 hover:bg-[#F8F9FA] dark:hover:bg-[#1D1D1D] px-1">{user.username}</p>
                            </Link>
                        )
                    })}
                </div>
            }
        </div>
    );
};