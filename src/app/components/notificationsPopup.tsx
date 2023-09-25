'use client'

import { doc, onSnapshot } from 'firebase/firestore';
import { AiOutlineClose } from 'react-icons/ai';
import { auth, db } from '../firebase/firebase-config';
import { useEffect, useState } from 'react';

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
    return (
        <div>
            <div className="fixed top-0 z-50 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                <div className="bg-white rounded-lg text-black w-[50%] mediumDesktop:w-[65%] wideTablet:w-[65%] narrowDesktop:w-[65%] smallTablet:w-[75%] mobile:w-[90%] mobile:h-[75%] h-2/5 dark:bg-[#121928] dark:text-white">
                    <section className='flex items-center border-b px-4 py-2 bg-[#313338] text-white dark:bg-[#121928]'>
                        <div>
                            NOTIFICATIONS
                        </div>
                        <div className='w-8 ml-auto bg-[#5F6066] text-white hover:text-red-500 rounded-md flex justify-center items-center h-8 '>
                            <AiOutlineClose onClick={onClose} size='1.1rem' />
                        </div>
                    </section>

                    <div className='flex flex-col justify-center items-center mt-4 cursor-pointer'>
                        {notifications.map((notification) => {
                            return (
                              <div className='w-[95%] rounded-md flex flex-col justify-center items-center bg-gray-700 text-white dark:bg-gray-700 mt-2 pb-4'>
                                  <div className='text-center w-[70%] rounded-md p-2 mt-2'>{notification}</div>
                                  <div className='flex'>
                                    <div>
                                        <button className='border px-6 py-1 mr-4 rounded-md'>Accept</button>
                                    </div>
                                    <div>
                                        <button className='border px-6 py-1 rounded-md'>Decline</button>
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