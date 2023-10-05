'use client';

import { useState, useEffect } from 'react';
import { db, auth } from "../../firebase/firebase-config";
import { doc, onSnapshot } from 'firebase/firestore';
import { collection, getDocs } from "firebase/firestore";
import { PiUserCircleLight } from 'react-icons/pi';
import { MdDarkMode } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io';
import NotificationsPopup from "../../components/notificationsPopup";
import Image from 'next/image';
import loom from '../../../../public/loom.png';
import { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { MdOutlineLightMode } from 'react-icons/md'
import { MdOutlineDarkMode } from 'react-icons/md';
import { useMobileNavContext } from '@/app/state/navbar/mobileNavProvider';
import { AiOutlineClose } from 'react-icons/ai'

type NavData = {
    photoUrl: string | StaticImageData,
    username: string,
    userId: string
};

export default function NavbarClient() {
    const router = useRouter();
    const { isMobile, setIsMobile } = useMobileNavContext()
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [userData, setUserData] = useState<NavData | null>(null);
    const [notificationCount, setNotificationCount] = useState(0);
    const currentUserUid = auth.currentUser?.uid;
    const userDocRef = currentUserUid ? doc(db, "users", currentUserUid as string) : null

    const { theme, setTheme } = useTheme();

    const handleNotificationClick = () => {
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    useEffect(() => {
        getNotifications()
    }, [])

    useEffect(() => {
        async function fetchNavData(): Promise<NavData[]> {
            try {
                const queryNavData = await getDocs(collection(db, 'users'));
                const userData = queryNavData.docs.map(doc => doc.data() as NavData);
                const currentUserData = userData.find(user => user.userId === currentUserUid);
                if (currentUserData) {
                    setUserData(currentUserData)
                } else {
                    setUserData({
                        photoUrl: loom,
                        username: 'Guest User',
                        userId: ''
                    });
                }
                return userData;
            } catch (error) {
                // console.log(error);
                return [];
            };
        };
        fetchNavData();
    }, []);

    function getNotifications() {
        if (userDocRef) {
            const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
                let tempNotifications: any[] = [];
                if (snapshot.exists()) {
                    const notificationSnapshot = snapshot.data()
                    if (notificationSnapshot && notificationSnapshot.notifications) {
                        tempNotifications = notificationSnapshot.notifications;
                    }
                }
                setNotificationCount(tempNotifications.length)
            })
            return () => {
                unsubscribe()
            }
        }

    }

    const handleSignIn = () => {
        router.push('/')
    }

    const handleThemeSwitch = () => {
        setTheme(theme == "dark" ? "light" : "dark");
    }

    const closeMobile = () => {
        setIsMobile(false)
    }

    return (
        <div>
            {currentUserUid ? (
                <div className={`flex ${isMobile ? 'fixed inset-0 justify-center items-center z-50 bg-[#F8F9FA] dark:bg-[#1D1D1D]' : 'flex items-center xxs:hidden sm:hidden md:flex'}`}>
                    <div className='absolute top-4 right-0 md:hidden'>
                        <AiOutlineClose size='1.5rem' className='cursor-pointer mr-4' onClick={closeMobile} />
                    </div>
                    <div className="flex items-center">
                        <div className="bg-[#F7F7F8] w-8 h-8 flex items-center justify-center rounded-full mr-3 hover:bg-[#E3E3E6] relative dark:bg-[#374151]">
                            <IoMdNotificationsOutline size='1.4rem' className='cursor-pointer' onClick={handleNotificationClick} />
                            {notificationCount > 0 && (
                                <div className="bg-[#4F46E5] text-white rounded-full w-4 h-4 text-xs flex items-center justify-center absolute -top-[5px] -right-[.5rem]">
                                    {notificationCount}
                                </div>
                            )}
                        </div>
                        <div className="bg-[#F7F7F8] w-8 h-8 flex items-center justify-center rounded-full mr-1 hover:bg-[#E3E3E6] dark:bg-[#374151]">
                            {theme == 'light' ? <MdOutlineDarkMode size='1.4rem' onClick={handleThemeSwitch} className='cursor-pointer' /> : <MdOutlineLightMode size='1.4rem' onClick={handleThemeSwitch} className='cursor-pointer' />}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="">
                            <hr className="mx-3 w-0 border h-8" />
                        </div>
                        <div className="bg-[#F7F7F8] w-8 h-8 flex items-center justify-center rounded-full mr-2 hover:bg-[#E3E3E6] dark:bg-[#374151]">
                            {userData?.photoUrl ? <Image src={userData?.photoUrl} alt='image' width={24} height={24} className='rounded-full' /> : <PiUserCircleLight size='1.4rem' className='' />}
                        </div>
                        <h1 className="font-semibold text-sm dark:opacity-95">{userData?.username}</h1>
                    </div>
                </div>
            ) : (
                <div>
                    <button className='px-3 py-2 hover:opacity-80 border rounded-md bg-black text-white font-sans text-xs' onClick={handleSignIn}>
                        SIGN IN
                    </button>
                </div>
            )}
            {isPopupVisible && <NotificationsPopup onClose={closePopup} />}
        </div>
    );
};