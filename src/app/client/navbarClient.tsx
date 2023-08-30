'use client';

import { useState, useEffect } from 'react';
import { db, auth } from "../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { PiUserCircleLight } from 'react-icons/pi';
import { MdDarkMode } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io';
import NotificationsPopup from "../components/notificationsPopup";
import Image from 'next/image';
import loom from '../../../public/loom.png';
import { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';

type NavData = {
    photoUrl: string | StaticImageData,
    username: string,
    userId: string
};

export default function NavbarClient() {
    const router = useRouter();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [userData, setUserData] = useState<NavData | null>(null);
    const [notificationCount, setNotificationCount] = useState(5);
    const currentUserUid = auth.currentUser?.uid;

    const handleNotificationClick = () => {
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    useEffect(() => {
        async function fetchNavData(): Promise<NavData[]> {
            try {
                const queryNavData = await getDocs(collection(db, 'users'));
                const userData = queryNavData.docs.map(doc => doc.data() as NavData);
                const currentUserData = userData.find(user => user.userId === currentUserUid);
                if (currentUserData) {
                    setUserData(currentUserData);
                } else {
                    setUserData({
                        photoUrl: loom,
                        username: 'Guest User',
                        userId: ''
                    });
                };
                return userData;
            } catch (error) {
                console.log(error);
                return [];
            };
        };
        fetchNavData();
    }, []);

    const handleSignIn = () => {
        router.push('/')
    }

    return (
        <div>
            {currentUserUid ? (
                <div className="flex items-center">
                    <div className="flex items-center">
                        <div className="bg-[#F7F7F8] z-10 w-8 h-8 flex items-center justify-center rounded-full mr-3 hover:bg-[#E3E3E6] relative">
                            <IoMdNotificationsOutline size='1.4rem' className='' onClick={handleNotificationClick} />
                            {notificationCount > 0 && (
                                <div className="bg-[#4F46E5] text-white rounded-full w-4 h-4 text-xs flex items-center justify-center absolute -top-[5px] -right-[.5rem]">
                                    {notificationCount}
                                </div>
                            )}
                        </div>
                        <div className="bg-[#F7F7F8] w-8 h-8 flex items-center justify-center rounded-full mr-1 hover:bg-[#E3E3E6]">
                            <MdDarkMode size='1.4rem' />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="">
                            <hr className="mx-3 w-0 border h-8" />
                        </div>
                        <div className="bg-[#F7F7F8] w-8 h-8 flex items-center justify-center rounded-full mr-2 hover:bg-[#E3E3E6]">
                            {userData?.photoUrl ? <Image src={userData?.photoUrl} alt='image' width={24} height={24} className='rounded-full' /> : <PiUserCircleLight size='1.4rem' className='' />}
                        </div>
                        <h1 className="font-semibold text-sm">{userData?.username}</h1>
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