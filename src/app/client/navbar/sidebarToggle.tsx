'use client';

import {useSidebarContext} from '@/app/state/sidebar/toggleSidebar';
import {GoSidebarCollapse} from 'react-icons/go';

export default function SideBarToggle () {
    const {isOpen, setIsOpen} = useSidebarContext();
    
    const handleSidebarToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <GoSidebarCollapse size='1.2rem' className='cursor-pointer' onClick={handleSidebarToggle}/>
        </div>
    )
};