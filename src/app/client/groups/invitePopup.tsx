'use client'

import { auth, db } from '@/app/firebase/firebase-config';
import { arrayUnion, collection, doc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-hot-toast'
import { useParams } from 'next/navigation';

type InvitePopupProps = {
    onClose: () => void;
};

export default function InvitePopup({ onClose }: InvitePopupProps) {
    const params = useParams()
    const name = params.name as string
    const currentUserUid = auth.currentUser?.uid
    const usersCollectionRef = collection(db, "users")
    const groupsCollectionRef = collection(db, "groups")
    const [searchValue, setSearchValue] = useState('')
    const [users, setUsers] = useState<any[]>([])
    console.log(users)

    const handleInputChange = (e: any) => {
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        getUsers()
    }, [])

    async function getUsers() {
        const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
            let temPmessages: any[] = [];
            snapshot.forEach((doc) => {
                temPmessages.push({ ...doc.data(), id: doc.id });
            });
            const filteredUser = temPmessages.filter((user) => {
                return user.id !== currentUserUid
            })
            setUsers(filteredUser);
        })
        return () => {
            unsubscribe()
        }
    }

    async function handleInvite(username: string, id: string) {
        const userDocRef = doc(db, "users", id)
        try {
            const response = await getDocs(groupsCollectionRef)
            const collectionData = response.docs.map(doc => doc.data());
            const filteredData = collectionData.filter((data) => {
                return data.groupId == name
            })

            const notificationArray = filteredData.map((data) => ({
                notification: `${data.groupAdminName} invited you to join ${data.groupName}`,
                groupId: data.groupId
            }))

            updateDoc(userDocRef, {
                notifications: arrayUnion(...notificationArray)
            })

            console.log(filteredData);

        } catch (error) {
            console.log(error)
        }
        toast.success(`Invite sent to ${username} successfully`)
        onClose()
    }

    return (
        <div>
            <div className="fixed top-0 z-50 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                <div className="bg-white rounded-lg text-black w-[50%] mediumDesktop:w-[65%] wideTablet:w-[65%] narrowDesktop:w-[65%] smallTablet:w-[75%] mobile:w-[90%] mobile:h-[75%] h-2/5 dark:bg-[#121928] dark:text-white">
                    <section className='flex items-center border-b px-4 py-2 bg-[#313338] text-white dark:bg-[#121928]'>
                        <div className='flex items-center px-4 py-2 bg-[white] text-white dark:bg-black rounded-md'>
                            <div>
                                <input
                                    className='outline-none text-black dark:text-white px-1 dark:bg-black'
                                    placeholder='Search user'
                                    value={searchValue}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='text-black dark:text-white cursor-pointer pl-1'>
                                <AiOutlineSearch size="1rem" />
                            </div>
                        </div>
                        <div className='w-8 ml-auto bg-[#5F6066] text-white hover:text-red-500 rounded-md flex justify-center items-center h-8 '>
                            <AiOutlineClose onClick={onClose} size='1.1rem' />
                        </div>
                    </section>

                    <div className='flex flex-col cursor-pointer justify-center items-center mt-4'>
                        {users.map((user) => (
                            <h2
                                key={user.id}
                                className='text-center bg-gray-300 hover:bg-gray-500 w-[30%] px-2 mt-2'
                                onClick={() => handleInvite(user.username, user.id)}
                            >
                                {user.username}
                            </h2>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};