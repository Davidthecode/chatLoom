import dynamic from "next/dynamic";

const DynamicChatbox = dynamic(()=> import('@/app/client/chatbox'), {
    ssr: false,
    loading: ()=> <h1>loading</h1>
});

export default function ChatsExtended({ params }: any) {
    return (
        <div className="h-full flex">
            <div className="w-3/4 border">
                <section className="h-1/6 border-b text-center">
                    <h1>Header</h1>
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