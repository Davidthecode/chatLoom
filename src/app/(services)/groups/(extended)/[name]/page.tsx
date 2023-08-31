import dynamic from "next/dynamic";
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiOutlinePushpin } from 'react-icons/ai';
import { IoCallOutline } from 'react-icons/io5';
import Loading from "@/app/components/loading";

const DynamicGroupChatNav = dynamic(() => import('@/app/client/groupChatNav'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center h-full justify-center">
            <Loading />
        </div>
    )
});

const DynamicGroupChatbox = dynamic(() => import('@/app/client/groupChatbox'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center h-full justify-center">
            <Loading />
        </div>
    )
});

const DynamicGroupMessagebox = dynamic(() => import('@/app/client/groupMessagebox'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center h-full justify-center">
            <Loading />
        </div>
    )
});

const DymanicGroupChatSidebar = dynamic(() => import('@/app/client/groupChatSidebar'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center h-full justify-center">
            <Loading />
        </div>
    )
});

export default function GroupsExtended({ params }: any) {
    console.log(params);

    return (
        <div className="h-full flex font-sans">
            <div className="w-3/4">
                <section className="h-[10%] flex justify-between items-center">
                    <DynamicGroupChatNav />
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
                        <DynamicGroupMessagebox />
                    </div>
                    <div className="h-1/6 w-full bg-[#F8F8F8] flex items-center justify-center">
                        <DynamicGroupChatbox />
                    </div>
                </section>
            </div>
            <div className="w-1/4 border bg-[#F8F9FA]">
                <DymanicGroupChatSidebar />
            </div>
        </div>
    )
}