import { BsChat } from 'react-icons/bs'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { AiOutlineUsergroupDelete } from 'react-icons/ai'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineLogout } from 'react-icons/md'

export default function Sidebar() {
    return (
        <div className="w-14 bg-[#1E202E] text-white">
            <aside className='flex flex-col justify-between h-full'>
                <ul className='flex flex-col items-center justify-center space-y-6'>
                    
                    <li className="relative group mt-8">
                        <BsChat size='1.3rem' />
                        <span className="tooltip absolute bottom-0 left-[4.1rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100">
                            Chats
                        </span>
                    </li>
                    <li className="relative group mt-4">
                        <AiOutlineUsergroupDelete size='1.5rem' />
                        <span className="tooltip absolute bottom-0 left-[4.5rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100">
                            Groups
                        </span>
                    </li>
                    <li className="relative group mt-4">
                        <IoMdNotificationsOutline size='1.5rem' />
                        <span className="tooltip absolute bottom-0 left-[5.5rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100">
                            Notifications
                        </span>
                    </li>
                </ul>

                <ul className='flex flex-col items-center justify-center space-y-6 mt-auto mb-20'>
                    <li className="relative group mt-4">
                        <IoSettingsOutline size='1.5rem' />
                        <span className="tooltip absolute bottom-0 left-[4.7rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100">
                            Settings
                        </span>
                    </li>
                    <li className="relative group mt-4">
                        <MdOutlineLogout size='1.5rem' />
                        <span className="tooltip absolute bottom-0 left-[4.5rem] transform -translate-x-1/2 opacity-0 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none group-hover:opacity-100">
                            Logout
                        </span>
                    </li>
                </ul>
            </aside>
        </div>
    )
}