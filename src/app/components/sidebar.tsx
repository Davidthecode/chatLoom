'use client'

import { BsChat } from 'react-icons/bs'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { AiOutlineUsergroupDelete } from 'react-icons/ai'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineLogout } from 'react-icons/md'
import Link from 'next/link'
import { useState } from 'react'
import NotificationsPopup from './notificationsPopup'
import { useRouter } from 'next/navigation'

export default function Sidebar() {
    const router = useRouter()
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [activeIcon, setActiveIcon] = useState<null | string>(null)

    const handleNotificationClick = () => {
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    return (
        <div className="w-14 bg-black text-white">
            <aside className='flex flex-col justify-between h-full'>
                <ul className='flex flex-col items-center justify-center space-y-6 mt-6'>

                    <li className="relative group mt-8">
                        <Link href='/chats'>
                            <BsChat size='1.3rem' onClick={() => setActiveIcon('chats')} className={`${activeIcon == 'chats' ? 'text-white' : 'opacity-50'}`} />
                            <span className={`tooltip absolute bottom-0 left-[4.1rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100`}>
                                chats
                            </span>
                        </Link>
                    </li>

                    <li className="relative group mt-4">
                        <Link href='/groups'>
                            <AiOutlineUsergroupDelete size='1.5rem' onClick={() => setActiveIcon('Groups')} className={`${activeIcon == 'Groups' ? 'text-white' : 'opacity-50'}`} />
                            <span className={`tooltip absolute bottom-0 left-[4.5rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100 `}>
                                Groups
                            </span>
                        </Link>
                    </li>

                    <li className="relative group mt-4">
                        <IoMdNotificationsOutline size='1.5rem' onClick={handleNotificationClick} className='opacity-50' />
                        <span className={`tooltip absolute bottom-0 left-[5.5rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100 `}>
                            Notifications
                        </span>
                    </li>
                </ul>

                <ul className='flex flex-col items-center justify-center space-y-6 mt-auto mb-20'>
                    <li className="relative group mt-4">
                        <IoSettingsOutline size='1.5rem' onClick={() => setActiveIcon('Settings')} className={`${activeIcon == 'Settings' ? 'text-white' : 'opacity-50'}`} />
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
            {isPopupVisible && <NotificationsPopup onClose={closePopup} />}
        </div>
    )
}