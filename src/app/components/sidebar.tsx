'use client'

import { BsChat } from 'react-icons/bs'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { AiOutlineUsergroupDelete } from 'react-icons/ai'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineLogout } from 'react-icons/md'
import { IoAdd } from 'react-icons/io5'
import Link from 'next/link'
import { useState } from 'react'
import { setCookie, getCookie } from 'cookies-next'
import { useEffect } from 'react'

export default function Sidebar() {
    const [activeIcon, setActiveIcon] = useState<boolean | string>(false)

    useEffect(() => {
        const savedActiveTab = getCookie('sidebarActive')
        if (savedActiveTab) {
            setActiveIcon(savedActiveTab)
        } else setActiveIcon('chats')
    }, [])

    const handleTabClick = (tab: string) => {
        setActiveIcon(tab)
        setCookie('sidebarActive', tab)
    }

    return (
        <div className="w-14 bg-black text-white">
            <aside className='flex flex-col justify-between h-full'>
                <ul className='flex flex-col items-center justify-center space-y-6 mt-6'>

                    <li className="relative group mt-8">
                        <Link href='/chats'>
                            <BsChat size='1.3rem' onClick={() => handleTabClick('chats')} className={`${activeIcon == 'chats' ? 'text-white' : 'opacity-50'}`} />
                            <span className={`tooltip absolute bottom-0 left-[4.1rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100`}>
                                chats
                            </span>
                        </Link>
                    </li>

                    <li className="relative group mt-4">
                        <Link href='/groups'>
                            <AiOutlineUsergroupDelete size='1.5rem' onClick={() => handleTabClick('Groups')} className={`${activeIcon == 'Groups' ? 'text-white' : 'opacity-50'}`} />
                            <span className={`tooltip absolute bottom-0 left-[4.5rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100 `}>
                                Groups
                            </span>
                        </Link>
                    </li>

                    <li className="relative group mt-4">
                        <IoMdNotificationsOutline size='1.5rem' onClick={() => setActiveIcon('notifications')} className={`${activeIcon == 'notifications' ? 'text-white' : 'opacity-50'}`} />
                        <span className={`tooltip absolute bottom-0 left-[5.5rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100 `}>
                            Notifications
                        </span>
                    </li>
                </ul>

                <ul className='flex flex-col items-center justify-center mt-12'>
                    <li className="relative group mt-4">
                        <IoAdd size='1.5rem' onClick={() => setActiveIcon('creategroup')} className={`${activeIcon == 'creategroup' ? 'text-white' : 'opacity-50'}`} />
                        <span className={`tooltip absolute bottom-0 left-[5.4rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100`}>
                            Creategroup
                        </span>
                    </li>
                </ul>

                <ul className='flex flex-col items-center justify-center space-y-6 mt-auto mb-20'>
                    <li className="relative group mt-4">
                        <IoSettingsOutline size='1.5rem' onClick={() => handleTabClick('Settings')} className={`${activeIcon == 'Settings' ? 'text-white' : 'opacity-50'}`} />
                        <span className={`tooltip absolute bottom-0 left-[4.7rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100 `}>
                            Settings
                        </span>
                    </li>
                    <li className="relative group mt-4">
                        <MdOutlineLogout size='1.5rem' onClick={() => setActiveIcon('Logout')} className={`${activeIcon == 'Logout' ? 'text-white' : 'opacity-50'}`} />
                        <span className={`tooltip absolute bottom-0 left-[4.5rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100 `}>
                            Logout
                        </span>
                    </li>
                </ul>
            </aside>
        </div>
    )
}