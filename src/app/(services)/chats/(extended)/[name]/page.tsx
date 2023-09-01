import dynamic from "next/dynamic";
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiOutlinePushpin } from 'react-icons/ai';
import { IoCallOutline } from 'react-icons/io5';
import Loading from "@/app/components/loading";

const DynamicChatbox = dynamic(() => import('@/app/client/chats/chatbox'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center h-full justify-center">
            <Loading />
        </div>
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
        <div className="flex items-center h-full justify-center">
            <Loading />
        </div>
    )
});

const DymanicChatSidebar = dynamic(() => import('@/app/client/chats/chatSidebar'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center h-full justify-center">
            <Loading />
        </div>
    )
});

export default function ChatsExtended() {
    return (
        <div className="h-full flex font-sans dark:bg-[#242633] dark:opacity-90">
            <div className="w-3/4">
                <section className="h-[10%] flex justify-between items-center dark:bg-[#111827]">
                    <DynamicChatNav />
                    <div className="flex items-center">
                        <div className="bg-[#F7F7F8] w-8 h-8 flex items-center justify-center rounded-full mr-3 hover:bg-[#E3E3E6] dark:bg-[#374151]">
                            <AiOutlinePushpin size='1.1rem' />
                        </div>
                        <div className="bg-[#F7F7F8] w-8 h-8 flex items-center justify-center rounded-full mr-3 hover:bg-[#E3E3E6] dark:bg-[#374151]">
                            <IoCallOutline size='1.1rem' />
                        </div>
                        <div className="bg-[#F7F7F8] w-8 h-8 flex items-center justify-center rounded-full mr-3 hover:bg-[#E3E3E6] dark:bg-[#374151]">
                            <FiMoreHorizontal size='1.1rem' />
                        </div>
                    </div>
                </section>

                <section className=" text-center h-[90%] flex flex-col justify-center items-center">
                    <div className="border-y h-5/6 w-full overflow-y-auto overscroll-contain dark:border-none">
                        <DynamicMessageBox />
                    </div>
                    <div className="h-1/6 w-full bg-[#F8F8F8] flex items-center justify-center dark:bg-[#111827]">
                        <DynamicChatbox />
                    </div>
                </section>
            </div>
            <div className="w-1/4 border-x bg-[#F8F9FA] dark:bg-[#111827] dark:border-none">
                <DymanicChatSidebar />
            </div>
        </div>
    );
};