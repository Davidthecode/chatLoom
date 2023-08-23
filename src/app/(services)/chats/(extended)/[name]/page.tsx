import dynamic from "next/dynamic";
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiOutlinePushpin } from 'react-icons/ai';
import { IoCallOutline } from 'react-icons/io5';
import Loading from "@/app/components/loading";

const DynamicChatbox = dynamic(() => import('@/app/client/chatbox'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center h-full justify-center">
            <Loading />
        </div>
    )
});

const DynamicMessageBox = dynamic(() => import('@/app/client/messageBox'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center h-full justify-center">
            <Loading />
        </div>
    )
});

const DynamicChatNav = dynamic(() => import('@/app/client/chatNav'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center h-full justify-center">
            <Loading />
        </div>
    )
});

const DymanicChatSidebar = dynamic(() => import('@/app/client/chatSidebar'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center h-full justify-center">
            <Loading />
        </div>
    )
});

export default function ChatsExtended() {
    return (
        <div className="h-full flex font-sans">
            <div className="w-3/4">
                <section className="h-[10%] flex justify-between items-center">
                    <DynamicChatNav />
                    <div className="flex items-center">
                        <div className="bg-[#F7F7F8] w-8 h-8 flex items-center justify-center rounded-full mr-3 hover:bg-[#E3E3E6]">
                            <AiOutlinePushpin size='1.1rem' />
                        </div>
                        <div className="bg-[#F7F7F8] w-8 h-8 flex items-center justify-center rounded-full mr-3 hover:bg-[#E3E3E6]">
                            <IoCallOutline size='1.1rem' />
                        </div>
                        <div className="bg-[#F7F7F8] w-8 h-8 flex items-center justify-center rounded-full mr-3 hover:bg-[#E3E3E6]">
                            <FiMoreHorizontal size='1.1rem' />
                        </div>
                    </div>
                </section>

                <section className=" text-center h-[90%] flex flex-col justify-center items-center">
                    <div className="border-y h-5/6 w-full overflow-y-auto overscroll-contain">
                        <DynamicMessageBox />
                    </div>
                    <div className="h-1/6 w-full bg-[#F8F8F8] flex items-center justify-center">
                        <DynamicChatbox />
                    </div>
                </section>
            </div>
            <div className="w-1/4 border bg-[#F8F9FA]">
                <DymanicChatSidebar />
            </div>
        </div>
    );
};



{/* bg-[#F8FAFC]
                bg-[#F7FAFC]
                bg-[#F9FAFC]
                bg-[#F1F5F9]
                bg-[#F9FAFB]
                bg-[#FAFAFA]
                bg-[#FAFAF9]
                bg-[#F6F6F8]
                bg-[#F5F5F4]
                bg-[#F7F7F9]
                bg-[#F8F8F8]
                bg-[#F2F2F2] */}