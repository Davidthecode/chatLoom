'use client'

import { BsArrowLeftShort } from 'react-icons/bs'
import {useProfileContext} from '@/app/state/chats/profileProvider'

export default function ShowUserprofile() {
    const {isProfile, setIsProfile} = useProfileContext()
    const handleProfileDisplay = () => {
        setIsProfile(true)
    }

    return (
        <div onClick={handleProfileDisplay} className="bg-[#F7F7F8] w-8 h-8 flex items-center justify-center rounded-full mr-3 hover:bg-[#E3E3E6] dark:bg-[#374151]">
            <BsArrowLeftShort size='1.5rem' className='cursor-pointer'/>
        </div>
    )
}