'use client';

import { useEffect, useState } from 'react';
import { BsChat } from 'react-icons/bs';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineLogout } from 'react-icons/md';
import { IoAdd } from 'react-icons/io5';
import { AiFillGithub } from 'react-icons/ai';
import Link from 'next/link';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { AuthContext } from '../state/authContext';
import { useContext } from 'react';

export default function Sidebar() {
    const checkContext = useContext(AuthContext)
    const router = useRouter();
    const [activeIcon, setActiveIcon] = useState<string | null>(null);

    useEffect(() => {
        const savedActiveTab = getCookie('sidebarActive');
        if (savedActiveTab) {
            setActiveIcon(savedActiveTab as string);
        } else setActiveIcon('chats');
    }, []);

    const handleTabClick = (tab: string) => {
        setActiveIcon(tab);
        setCookie('sidebarActive', tab);
    };

    const handleLogout = async() => {
        await signOut(auth);
        deleteCookie('auth-token');
        checkContext?.setIsAuth(false)
        router.push('/')
    }

    return (
        <div className="w-14 bg-black text-white">
            <aside className='flex flex-col justify-between h-full'>
                <ul className='flex flex-col items-center justify-center space-y-6 mt-6'>
                    <li className={`${activeIcon == 'chats' ? 'border-l-2 border-white' : ''} relative group mt-8  w-full flex justify-center items-center`}>
                        <Link href='/chats'>
                            <BsChat size='1.3rem' onClick={() => handleTabClick('chats')} className={`${activeIcon == 'chats' ? 'opacity-100' : 'opacity-80'}`} />
                            <span className={`tooltip absolute bottom-0 left-[5.1rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100`}>
                                chats
                            </span>
                        </Link>
                    </li>

                    <li className={`${activeIcon == 'Groups' ? 'border-l-2 border-white' : ''} relative group mt-4 w-full flex justify-center items-center `}>
                        <Link href='/groups'>
                            <AiOutlineUsergroupDelete size='1.5rem' onClick={() => handleTabClick('Groups')} className={`${activeIcon == 'Groups' ? 'opacity-100' : 'opacity-80'}`} />
                            <span className={`tooltip absolute bottom-0 left-[5.4rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100 `}>
                                Groups
                            </span>
                        </Link>
                    </li>

                    <li className={`${activeIcon == 'notifications' ? 'border-l-2 border-white' : ''} relative group mt-4 w-full flex justify-center items-center`}>
                        <IoMdNotificationsOutline size='1.5rem' onClick={() => setActiveIcon('notifications')} className={`${activeIcon == 'notifications' ? 'opacity-100' : 'opacity-80'}`} />
                        <span className={`tooltip absolute bottom-0 left-[6.4rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100 `}>
                            Notifications
                        </span>
                    </li>
                </ul>

                <ul className='flex flex-col items-center justify-center mt-12'>
                    <li className="relative group mt-4 w-full flex justify-center items-center">
                        <IoAdd size='1.5rem' onClick={() => setActiveIcon('creategroup')} className='opacity-80' />
                        <span className={`tooltip absolute bottom-0 left-[6.4rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100`}>
                            Creategroup
                        </span>
                    </li>
                </ul>

                <ul className='flex flex-col items-center justify-center space-y-6 mt-auto mb-20'>
                    <li className="relative group mt-4 w-full flex justify-center items-center">
                        <IoSettingsOutline size='1.5rem' onClick={() => handleTabClick('Settings')} className='opacity-80'/>
                        <span className={`tooltip absolute bottom-0 left-[5.7rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100 `}>
                            Settings
                        </span>
                    </li>
                    <li className="relative group mt-4 w-full flex justify-center items-center">
                        <MdOutlineLogout size='1.5rem' onClick={handleLogout} className='opacity-80' />
                        <span className={`tooltip absolute bottom-0 left-[5.4rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100 `}>
                            Logout
                        </span>
                    </li>
                    <li className="relative group mt-4 w-full flex justify-center items-center">
                        <Link href='https://github.com/Davidthecode/chatLoom' target='_blank'>
                            <AiFillGithub size='1.5rem' className='opacity-80'/>
                            <span className={`tooltip absolute bottom-0 left-[5.4rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100 `}>
                                Github
                            </span>
                        </Link>
                    </li>
                </ul>
            </aside>
        </div>
    );
};