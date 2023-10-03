'use client';

import { BsArrowLeft } from "react-icons/bs"
import { useGroupSidebarContext } from "@/app/state/groups/showSidebar";

export default function ShowSidebar() {
    const { isOpen, setIsOpen } = useGroupSidebarContext()

    const handleShowSidebar = () => {
        setIsOpen(true)
    }

    return (
        <div>
            <div onClick={handleShowSidebar} className="bg-[#F7F7F8] w-8 h-8 flex items-center justify-center rounded-full mr-3 hover:bg-[#E3E3E6] dark:bg-[#374151] cursor-pointer">
                <BsArrowLeft />
            </div>
        </div>
    )
}