import { AiOutlineSearch } from "react-icons/ai";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { GroupsSkeleton } from "@/app/components/skeleton";

const numberOfSkeletons = 8;

const DynamicGroupsClient = dynamic(() => import("@/app/client/groups/groupsClient"), {
    ssr: false,
    loading: () => (
        <>
            {Array.from({ length: numberOfSkeletons }, (_: any, index: number) => (
                <GroupsSkeleton key={index} />
            ))}
        </>
    )
})

const DynamicGroupSearchBar = dynamic(() => import("@/app/client/groups/searchBar"), {
    ssr: false,
    loading: () => <div className="w-full h-6 opacity-50">search...</div>
})

export default function Groups() {
    const headersList = headers();
    const pathname = headersList.get("x-invoke-path") || "";

    return (
        <div className={`flex flex-col xl:w-1/5 largeDesktop:w-[28%] mediumDesktop:w-[35%] wideTablet:w-[40%] narrowDesktop:w-[43%] ${pathname !== "/groups" && "smallTablet:hidden mobile:hidden"} bg-[#F7F7F8] h-full border-r pl-2 dark:bg-[#1D1D1D] dark:text-white dark:border-[#686C76] dark:border-r-[#686C76] dark:border-opacity-20 font-mulish`}>
            <h1 className="my-2 ml-2">All Groups</h1>
            <div className="flex border-none rounded-lg w-[95%] h-10 items-center pl-2 ml-1 bg-white dark:bg-[#282829]">
                <div className="text-black mr-2 dark:text-white">
                    <AiOutlineSearch size="1.3rem" />
                </div>
                <DynamicGroupSearchBar />
            </div>
            <div className="overflow-y-auto h-full">
                <DynamicGroupsClient />
            </div>
        </div>
    )
}