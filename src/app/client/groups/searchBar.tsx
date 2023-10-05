'use client';

import { db } from "@/app/firebase/firebase-config";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from 'react';
import Link from "next/link";
import { AiOutlineClose } from 'react-icons/ai';

export default function GroupSearchBar() {
    const collectionRef = collection(db, 'groups');
    const [groups, setGroups] = useState<any>([]);
    const [wordEntered, setWordEntered] = useState('');
    const [filteredData, setFilteredData] = useState<any[]>([]);

    useEffect(() => {
        const q = query(
            collectionRef
        );

        const getGroups = async () => {
            const querySnapshot = await getDocs(q)
            const userDocs = querySnapshot.docs.map((doc) => doc.data())
            setGroups(userDocs.map((group) => ({ groupName: group.groupName, id: group.groupId })))
        }
        getGroups()
    }, []);

    const handleFilter = (e: any) => {
        const enteredWord = e.target.value
        setWordEntered(enteredWord)
        const newFilter = groups.filter((group: any) => (
            group.groupName.toLowerCase().includes(enteredWord.toLowerCase())
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
                <div className="mt-[7rem] bg-white dark:bg-[#282829] dark:text-white text-black h-fit rounded-sm absolute w-full px-2 py-2 z-30">
                    {filteredData.slice(0, 15).map((group, id) => {
                        return (
                            <Link href={`/chats/${group.groupId}`} key={id}>
                                <p className="cursor-pointer mt-1 hover:bg-[#F8F9FA] dark:hover:bg-[#1D1D1D] px-1">{group.groupName}</p>
                            </Link>
                        )
                    })}
                </div>
            }   
        </div>
    );
};