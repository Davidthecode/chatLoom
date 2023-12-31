'use client';

import { useEffect, useState } from 'react';
import { BsChat } from 'react-icons/bs';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineLogout } from 'react-icons/md';
import { AiFillGithub } from 'react-icons/ai';
import Link from 'next/link';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase/firebase-config';
import { useAuthContext } from '../../state/auth/authContext';
import { updateDoc, doc } from 'firebase/firestore';
import CreateGroup from './createGroup';
import { useSidebarContext } from '@/app/state/sidebar/toggleSidebar'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { GoSidebarExpand } from 'react-icons/go'
import { onAuthStateChanged } from 'firebase/auth';

export default function Sidebar() {
    const { setIsAuth } = useAuthContext();
    const { isOpen, setIsOpen } = useSidebarContext()
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState(auth.currentUser)
    const [activeIcon, setActiveIcon] = useState<string | null>(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (user)=> {
            setCurrentUser(user)
        })

        return()=> unsubscribe()
    },[])

    //Handle active sidebar
    useEffect(() => {
        const savedActiveTab = getCookie('sidebarActive');
        if (savedActiveTab) {
            setActiveIcon(savedActiveTab as string);
        } else setActiveIcon('chats');
        setLoading(false)
    }, []);

    //Handle sidebar tab click
    const handleTabClick = (tab: string) => {
        setActiveIcon(tab);
        setCookie('sidebarActive', tab);
    };

    //Handle logout
    const handleLogout = async () => {
        if (currentUser?.uid) {
            const userRef = doc(db, 'users', currentUser?.uid);
            await updateDoc(userRef, { online: false })
        } else return
        await signOut(auth);
        deleteCookie('auth-token');
        deleteCookie('sidebarActive');
        setIsAuth(false);
        router.replace('/');
    }

    //Function to update online status
    function OnlineStatusUpdater() {
        useEffect(() => {
            if (!currentUser?.uid) return;
            const userRef = doc(db, 'users', currentUser?.uid);

            const setOnline = async () => {
                await updateDoc(userRef, { online: true });
            }

            const setOffline = async () => {
                await updateDoc(userRef, { online: false })
            }

            const handleVisibilityChange = async () => {
                if (document.visibilityState === 'hidden') {
                    setOffline()
                } else if (document.visibilityState === 'visible') {
                    setOnline()
                }
            };

            const handleBeforeUnload = () => {
                setOffline()
            }

            document.addEventListener('visibilitychange', handleVisibilityChange);
            document.addEventListener('beforeunload', handleBeforeUnload);

            setOnline()

            // const heartbeatInterval = setInterval(setOnline, 5000);

            return () => {
                document.removeEventListener('visibilitychange', handleVisibilityChange);
                document.removeEventListener('beforeunload', handleBeforeUnload);
                // clearInterval(heartbeatInterval)
            };
        }, [currentUser?.uid]);
        return null;
    }

    //Function to handle create group
    const handleCreateGroup = () => {
        setIsPopupVisible(true)
    }

    //Function to close popup
    const closePopup = () => {
        setIsPopupVisible(false);
    };

    //function to handle sidebar toggle
    const handleSidebarToggle = () => {
        setIsOpen(false)
    }

    return (
        <div className='h-screen'>
            {loading ? <div className='w-14 bg-[#1D1D1D] animate-pulse'></div> :(
                <section className={`h-full w-14 bg-[#1D1D1D] dark:bg-[#1D1D1D] dark:border-r dark:border-[#686C76] dark:border-opacity-20 text-white ${isOpen ? 'narrowDesktop:block smallTablet:block mobile:block narrowDesktop:absolute narrowDesktop:z-50 narrowDesktop:h-full smallTablet:absolute smallTablet:z-50 smallTablet:h-full mobile:absolute mobile:z-50 mobile:h-full' : 'narrowDesktop:hidden smallTablet:hidden mobile:hidden'}`}>
                {currentUser?.uid && <OnlineStatusUpdater />}
                <aside className='flex flex-col justify-between h-full'>
                    <ul className='flex flex-col items-center justify-center space-y-6 mt-6'>
                        {isOpen && <li className={`relative group mt-0 w-full flex justify-center items-center`}>
                            <GoSidebarExpand size='1.3rem' onClick={handleSidebarToggle} className='group-hover:text-white text-slate-300 opacity-80 cursor-pointer' />
                        </li>}
    
                        <li className={`${activeIcon == 'chats' ? 'border-l-2 border-white' : ''} relative group mt-8  w-full flex justify-center items-center`}>
                            <Link href='/chats'>
                                <BsChat size='1.25rem' onClick={() => handleTabClick('chats')} className={`${activeIcon == 'chats' ? 'text-white' : 'opacity-80'} group-hover:text-white text-slate-300`} />
                                <span className={`tooltip absolute bottom-0 left-[5.1rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100 z-50`}>
                                    chats
                                </span>
                            </Link>
                        </li>
    
                        <li className={`${activeIcon == 'Groups' ? 'border-l-2 border-white' : ''} relative group mt-4 w-full flex justify-center items-center `}>
                            <Link href='/groups'>
                                <AiOutlineUsergroupDelete size='1.4rem' onClick={() => handleTabClick('Groups')} className={`${activeIcon == 'Groups' ? 'text-white' : 'opacity-80'} group-hover:text-white text-slate-400`} />
                                <span className={`tooltip absolute bottom-0 left-[5.4rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100 z-50`}>
                                    Groups
                                </span>
                            </Link>
                        </li>
                    </ul>
    
                    <ul className='flex flex-col items-center justify-center mt-12'>
                        <li className="relative group mt-4 w-full flex justify-center items-center" onClick={handleCreateGroup}>
                            <AiOutlineUsergroupAdd size='1.4rem' onClick={() => setActiveIcon('creategroup')} className='opacity-80 group-hover:text-white text-slate-300 cursor-pointer' />
                            <span className={`tooltip absolute bottom-0 left-[6.4rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100 z-50`}>
                                Creategroup
                            </span>
                        </li>
                    </ul>
    
                    <ul className='flex flex-col items-center justify-center space-y-6 mt-auto mb-20'>
                        <li className="relative group mt-4 w-full flex justify-center items-center">
                            <IoSettingsOutline size='1.4rem' onClick={() => handleTabClick('Settings')} className='opacity-80 group-hover:text-white stroke-[0.5px] text-slate-300 cursor-pointer' />
                            <span className={`tooltip absolute bottom-0 left-[5.7rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100 z-50`}>
                                Settings
                            </span>
                        </li>
                        <li className="relative group mt-4 w-full flex justify-center items-center" onClick={handleLogout}>
                            <MdOutlineLogout size='1.4rem' className='opacity-80 group-hover:text-white text-slate-300 cursor-pointer' />
                            <span className={`tooltip absolute bottom-0 left-[5.4rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100 z-50`}>
                                Logout
                            </span>
                        </li>
                        <li className="relative group mt-4 w-full flex justify-center items-center">
                            <Link href='https://github.com/Davidthecode/chatLoom' target='_blank'>
                                <AiFillGithub size='1.4rem' className='opacity-80 group-hover:text-white text-slate-300' />
                                <span className={`tooltip absolute bottom-0 left-[5.4rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100 z-50`}>
                                    Github
                                </span>
                            </Link>
                        </li>
                    </ul>
                </aside>
                {isPopupVisible && <CreateGroup onClose={closePopup} />}
            </section>
            )}
        </div>
    );
};