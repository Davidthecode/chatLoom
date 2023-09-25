import dynamic from "next/dynamic";
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiOutlinePushpin } from 'react-icons/ai';
import Loading from "@/app/components/loading";
import {ChatsidebarSkeleton} from '@/app/components/skeleton'
import {ChatboxSkeleton} from '@/app/components/skeleton'
import {ChatNavSkeleton} from '@/app/components/skeleton'

const DynamicChatbox = dynamic(() => import('@/app/client/chats/chatbox'), {
    ssr: false,
    loading: () => (
        <ChatboxSkeleton />
    )
});

const DynamicMessageBox = dynamic(() => import('@/app/client/chats/messageBox'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center h-full justify-center">
            <Loading />
        </div>
    )
});

const DynamicChatNav = dynamic(() => import('@/app/client/chats/chatNav'), {
    ssr: false,
    loading: () => (
        <ChatNavSkeleton />
    )
});

const DymanicChatSidebar = dynamic(() => import('@/app/client/chats/chatSidebar'), {
    ssr: false,
    loading: () => (
       <ChatsidebarSkeleton />
    )
});

const DynamicShowUserprofile = dynamic(() => import('@/app/client/chats/showUserprofile'), {
    ssr: false
})

export default function ChatsExtended() {
    return (
        <div className="h-full flex font-mulish dark:bg-[#1D1D1D] dark:opacity-90">
            <div className="xl:w-3/4 largeDesktop:w-[68%] mediumDesktop:w-[100%] wideTablet:w-[100%] narrowDesktop:w-[100%] smallTablet:w-[65%] mobile:w-[100%]">
                <section className="h-[10%] flex justify-between items-center dark:bg-[#1D1D1D]">
                    <DynamicChatNav />
                    <div className="flex items-center">
                        <div className="bg-[#F7F7F8] w-8 h-8 flex items-center justify-center rounded-full mr-3 hover:bg-[#E3E3E6] dark:bg-[#374151]">
                            <AiOutlinePushpin size='1.1rem' />
                        </div>
                        <div className="bg-[#F7F7F8] w-8 h-8 flex items-center justify-center rounded-full mr-3 hover:bg-[#E3E3E6] dark:bg-[#374151]">
                            <FiMoreHorizontal size='1.1rem' />
                        </div>
                        <div className="hidden mediumDesktop:block wideTablet:block narrowDesktop:block mobile:block">
                            <DynamicShowUserprofile />
                        </div>
                    </div>
                </section>

                <section className=" text-center h-[90%] flex flex-col justify-center items-center">
                    <div className="border-y h-5/6 w-full overflow-y-auto overscroll-contain dark:border-y-[#686C76] dark:border-opacity-30">
                        <DynamicMessageBox />
                    </div>
                    <div className="h-1/6 w-full bg-[#F8F8F8] flex items-center justify-center dark:bg-[#1D1D1D]">
                        <DynamicChatbox />
                    </div>
                </section>
            </div>

            <div className="xl:w-1/4 largeDesktop:w-[32%] wideTablet:hidden mediumDesktop:hidden smallTablet:block smallTablet:w-[35%] narrowDesktop:hidden mobile:hidden border-l bg-[#F8F9FA] dark:bg-[#1D1D1D] dark:border-l-[#686C76] dark:border-opacity-30">
                <DymanicChatSidebar />
            </div>
        </div>
    );
};