'use client'

import { arrayUnion, collection, doc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import { AiOutlineClose } from 'react-icons/ai';
import { auth, db } from '../firebase/firebase-config';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type NotificationsPopupProps = {
    onClose: () => void;
};

export default function NotificationsPopup({ onClose }: NotificationsPopupProps) {
    const [notifications, setNotifications] = useState<any[]>([])
    const currentUserUid = auth.currentUser?.uid
    const userDocRef = doc(db, "users", currentUserUid as string)

    useEffect(() => {
        getNotifications()
    }, [])

    function getNotifications() {
        const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
            let tempNotifications: any[] = [];
            if (snapshot.exists()) {
                const notificationSnapshot = snapshot.data()
                if (notificationSnapshot && notificationSnapshot.notifications) {
                    tempNotifications = notificationSnapshot.notifications;
                }
            }
            setNotifications(tempNotifications)
        })
        return () => {
            unsubscribe()
        }
    }

    const clearNotifications = async (index: number) => {
        const updatedNotifications = notifications.filter((notification, i) => {
            return i !== index
        })
        setNotifications(updatedNotifications)
        await updateDoc(userDocRef, {
            notifications: updatedNotifications
        })

    }

    const handleAccept = async (index: number) => {
        const groupCollectionRef = collection(db, "groups");
        const querySnapshot = await getDocs(groupCollectionRef);

        for (const notification of notifications) {
            if (notification.groupId == notifications[index].groupId) {
                const matchingDoc = querySnapshot.docs.find((doc) => doc.data().groupId === notification.groupId);
                if (matchingDoc) {
                    const groupDocRef = doc(db, 'groups', matchingDoc.id);
                    try {
                        await updateDoc(groupDocRef, {
                            groupMembersId: arrayUnion(currentUserUid),
                        });
                        clearNotifications(index)
                        toast.success('You have been added')
                    } catch (error) {
                        return
                    }
                } else {
                   return
                }
            }
        }
    }

    const handleDecline = (index: number) => {
        clearNotifications(index)
        toast.success("declined")
    }


    return (
        <div>
            <div className="fixed top-0 z-50 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                <div className="bg-white rounded-lg text-black w-[50%] mediumDesktop:w-[65%] wideTablet:w-[65%] narrowDesktop:w-[65%] smallTablet:w-[75%] mobile:w-[90%] mobile:h-[75%] h-3/5 dark:bg-[#121928] dark:text-white  overflow-y-scroll">
                    <section className='flex items-center border-b px-4 py-2 bg-[#313338] text-white dark:bg-[#121928]'>
                        <div>
                            NOTIFICATIONS
                        </div>
                        <div className='w-8 ml-auto bg-[#5F6066] text-white hover:text-red-500 rounded-md flex justify-center items-center h-8 '>
                            <AiOutlineClose onClick={onClose} size='1.1rem' />
                        </div>
                    </section>

                    <div className='flex flex-col justify-center items-center mt-4 cursor-pointer'>
                        {notifications.map((notification, index) => {
                            return (
                                <div className='w-[95%] rounded-md  flex flex-col justify-center items-center bg-[#313338] text-white dark:bg-gray-700 mt-2 pb-4' key={index}>
                                    <div className='text-center w-[70%] rounded-md p-2 mt-2'>{notification.notification}</div>
                                    <div className='flex'>
                                        <div>
                                            <button className='border px-6 py-1 mr-4 rounded-md hover:bg-black' onClick={() => handleAccept(index)}>Accept</button>
                                        </div>
                                        <div>
                                            <button className='border px-6 py-1 rounded-md hover:bg-black' onClick={() => handleDecline(index)}>Decline</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};