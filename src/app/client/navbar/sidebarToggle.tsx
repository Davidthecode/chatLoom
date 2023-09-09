'use client';

import {PiSidebarSimple} from 'react-icons/pi';
import {useSidebarContext} from '@/app/state/sidebar/toggleSidebar'

export default function SideBarToggle () {
    const {isOpen, setIsOpen} = useSidebarContext();
    
    const handleSidebarToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <PiSidebarSimple size='1.2rem' className='cursor-pointer' onClick={handleSidebarToggle}/>
        </div>
    )
};