import dynamic from "next/dynamic";
import { AiOutlineSearch } from "react-icons/ai";
import { headers } from "next/headers";
import { UsersSkeleton } from "@/app/components/skeleton";

const numberOfSkeletons = 8;

const DymanicUsers = dynamic(() => import("@/app/client/chats/users"), {
    ssr: false,
    loading: () => (
        <>
            {Array.from({ length: numberOfSkeletons }, (_: any, index: number) => (
                <UsersSkeleton key={index} />
            ))}
        </>     
    )
});

const DynamicChatSearchBar = dynamic(() => import("@/app/client/chats/searchBar"), {
    ssr: false,
    loading: () => <div className="w-full h-6 opacity-50">search...</div>
})

export default function Chats() {
    const headersList = headers();
    const pathname = headersList.get("x-invoke-path") || "";

    return (
        <div className={`flex flex-col xl:w-1/5 largeDesktop:w-[25%] mediumDesktop:w-[30%] wideTablet:w-[35%] narrowDesktop:w-[35%] ${pathname !== "/chats"&& "smallTablet:hidden mobile:hidden"} h-full border-r pl bg-[#F8F9FA] text-black dark:bg-[#1D1D1D] dark:text-white dark:border-r-[#686C76] dark:border-opacity-20 font-mulish`}>
            <h1 className="my-2 ml-3">All Chats</h1>
            <div className="flex border-none rounded-lg w-[95%] h-10 items-center pl-2 ml-3 bg-white dark:bg-[#282829]">
                <div className="text-black mr-2 dark:text-white">
                    <AiOutlineSearch size="1.3rem" />
                </div>
                <DynamicChatSearchBar />
            </div>
            <div>
                <DymanicUsers />
            </div>
        </div>
    );
};