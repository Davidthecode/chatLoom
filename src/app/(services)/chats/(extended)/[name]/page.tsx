import dynamic from "next/dynamic";
import { FiMoreHorizontal } from 'react-icons/fi'
import { AiOutlinePushpin } from 'react-icons/ai'
import { IoCallOutline } from 'react-icons/io5'

const DynamicChatbox = dynamic(() => import('@/app/client/chatbox'), {
    ssr: false,
    loading: () => <h1>loading</h1>
});

export default function ChatsExtended({ params }: any) {
    return (
        <div className="h-full flex font-sans">
            <div className="w-3/4 border">
                <section className="h-20 border-b flex justify-between items-center">
                    <div className="mx-2">
                        <h1 className="font-semibold text-lg">Ajibola David</h1>
                        <p className="text-sm font-medium">Last seen 5mins ago</p>
                    </div>

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

                <section className="border-t text-center h-5/6 flex flex-col justify-center items-center">
                    <div className="border h-4/5 w-full">
                        main
                    </div>
                    <DynamicChatbox />
                </section>
            </div>

            <div className="w-1/4 border bg-[#F7F7F8]">
                {params.name}
            </div>
        </div>
    )
}