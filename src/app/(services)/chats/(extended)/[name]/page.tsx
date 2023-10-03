import dynamic from "next/dynamic";
import Loading from "@/app/components/loading";

const DynamicChatsMain = dynamic(() => import('@/app/client/chats/chatsMain'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center h-full justify-center">
            <Loading />
        </div>
    )
})

export default function ChatsExtended() {
    return (
        <div className="h-full">
            <DynamicChatsMain />
        </div>
    );
};