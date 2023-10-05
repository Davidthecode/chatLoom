'use client'

import { useEffect, useState } from 'react'
import GroupChatNav from "./groupChatNav"
import GroupChatbox from "./groupChatbox"
import GroupMessagebox from "./groupMessagebox"
import GroupChatSidebar from "./groupChatSidebar"
import ShowSidebar from "./showSidebar"
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiOutlinePushpin } from 'react-icons/ai';
import { useGroupSidebarContext } from "@/app/state/groups/showSidebar";
import { auth, db } from '@/app/firebase/firebase-config'
import { collection, getDocs } from 'firebase/firestore'
import { useParams } from 'next/navigation'

export default function GroupsMain() {
    const params = useParams()
    const {name} = params

    const currentUserUid = auth.currentUser?.uid;
    const { isOpen, setIsOpen } = useGroupSidebarContext();

    const [groups, setGroups] = useState<any[]>([])

    useEffect(()=> {

    },[])

    useEffect(()=> {
        getGroups()
    },[])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1129 || window.innerWidth >= 669 && window.innerWidth <= 789) {
                setIsOpen(false)
            }
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    const collectionRef = collection(db, "groups");

    const getGroups = async()=> {
        const res = await getDocs(collectionRef);
        const data = res.docs.map((doc)=> doc.data())
        setGroups(data)
    }

    const validateGroup = async() => {
        groups.map((group)=>{
            if(group.groupType === "public"){
                return
            }else {
                
            }
        })
    }

    return (
        <div className="h-full flex font-mulish dark:bg-[#1D1D1D] dark:opacity-90">
            <div className="xl:w-3/4 largeDesktop:w-[68%] mediumDesktop:w-[100%] wideTablet:w-[100%] narrowDesktop:w-[100%] smallTablet:w-[65%] mobile:w-[100%]">
                <section className="h-[10%] flex justify-between items-center dark:bg-[#1D1D1D]">
                    <GroupChatNav />
                    <div className="flex items-center">
                        <div className="bg-[#F7F7F8] w-8 h-8 flex items-center justify-center rounded-full mr-3 hover:bg-[#E3E3E6] dark:bg-[#374151]">
                            <AiOutlinePushpin size='1.1rem' />
                        </div>
                        <div className="bg-[#F7F7F8] w-8 h-8 flex items-center justify-center rounded-full mr-3 hover:bg-[#E3E3E6] dark:bg-[#374151]">
                            <FiMoreHorizontal size='1.1rem' />
                        </div>
                        <div className="largeDesktop:hidden smallTablet:hidden xl:hidden ">
                            <ShowSidebar />
                        </div>
                    </div>
                </section>

                <section className=" text-center h-[90%] flex flex-col justify-center items-center">
                    <div className="border-y h-5/6 w-full overflow-y-auto overscroll-contain dark:border-y-[#686C76] dark:border-opacity-30">
                        <GroupMessagebox />
                    </div>
                    <div className="h-1/6 w-full bg-[#F8F8F8] flex items-center justify-center dark:bg-[#1D1D1D]">
                        <GroupChatbox />
                    </div>
                </section>
            </div>
            <div className={` bg-[#F8F9FA] dark:bg-[#1D1D1D] dark:border-l-[#686C76] dark:border-opacity-30 border-l ${isOpen ? 'block z-40 h-[93%] w-1/3 right-0 absolute bg-[#EDEDEE] mobile:w-[100%]' : 'xl:w-1/4 largeDesktop:w-[32%] wideTablet:hidden mediumDesktop:hidden smallTablet:block smallTablet:w-[35%] narrowDesktop:hidden mobile:hidden'}`}>
                <GroupChatSidebar />
            </div>
        </div>
    )
}