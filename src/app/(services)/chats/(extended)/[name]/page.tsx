import dynamic from "next/dynamic";
import { FiMoreHorizontal } from 'react-icons/fi'
import { AiOutlinePushpin } from 'react-icons/ai'
import { IoCallOutline } from 'react-icons/io5'

const DynamicChatbox = dynamic(() => import('@/app/client/chatbox'), {
    ssr: false,
    loading: () => <h1>loading</h1>
});

const DynamicMessageBox = dynamic(() => import('@/app/client/messageBox'), {
    ssr: false,
    loading: () => <h1>loading...</h1>
})

const DynamicChatNav = dynamic(() => import('@/app/client/chatNav'), {
    ssr: false,
    loading: () => <h1>Loading...</h1>
})

const DymanicChatSidebar = dynamic(()=> import('@/app/client/chatSidebar'), {
    ssr: false,
    loading: ()=> <h1>Loading...</h1>
})

export default function ChatsExtended() {
    return (
        <div className="h-full flex font-sans">
            <div className="w-3/4">
                <section className="h-20 flex justify-between items-center">
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

                <section className=" text-center h-5/6 flex flex-col justify-center items-center">
                    <div className="border-y h-4/5 w-full overflow-y-auto overscroll-contain">
                        <DynamicMessageBox />
                    </div>
                    <DynamicChatbox />
                </section>
            </div>
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
             <div className="w-1/4 border bg-[#F2F2F2]">
                <DymanicChatSidebar />
            </div> 
        </div>
    )
}