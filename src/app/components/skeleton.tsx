export const UsersSkeleton = () => {
    return (
        <div className="flex mt-2 h-16 animate-pulse pt-4 pl-3 items-center">
            <div className="flex justify-start items-center w-11/12 h-full dark:bg-[#292929] bg-[#E3E3E6]"></div>
        </div>
    )
}

export const GroupsSkeleton = () => {
    return (
        <div className="flex mt-2 h-16 animate-pulse pt-4 pl-3 items-center">
            <div className="flex justify-start items-center w-11/12 h-full dark:bg-[#292929] bg-[#E3E3E6]"></div>
        </div>
    )
}

export const ChatsidebarSkeleton = () => {
    return (
        <div>
            <div className="flex justify-center items-center">
                <div className="rounded-full w-20 h-20 mt-6 bg-gray-200 dark:bg-[#292929] animate-pulse"></div>
            </div>
            <div className="flex justify-center items-center mt-4">
                <div className="h-4 w-20 rounded-md bg-gray-200 dark:bg-[#292929] animate-pulse"></div>
            </div>

            <div className="w-full flex justify-center items-center">
                <div className="border rounded-lg bg-gray-200 w-[85%] mt-6 dark:bg-[#292929] dark:border-[#686C76] dark:border-opacity-50 h-16 animate-pulse"></div>
            </div>
            <div className="w-full flex justify-center items-center">
                <div className="mt-4 border rounded-lg bg-gray-200 w-[85%] px-2 py-3 dark:bg-[#292929] dark:border-[#686C76] dark:border-opacity-50 h-10 animate-pulse "></div>
            </div>

            <div className="w-full flex justify-center items-center">
                <div className="mt-4 border rounded-lg bg-gray-200 w-[85%] px-2 py-3 dark:bg-[#292929] dark:border-[#686C76] dark:border-opacity-50 h-28 animate-pulse"></div>
            </div>

            <div className="w-full flex justify-center items-center">
                <div className="mt-8 border rounded-lg w-[85%] bg-[#686C76] h-[.1px] dark:border-[#686C76] dark:border-opacity-10"></div>
            </div>
            <div className="mt-12 flex items-center justify-center">
                <div className="bg-gray-200 animate-pulse w-10 h-2 rounded-md mr-2"></div>
                <div className="rounded-full w-5 h-5 bg-gray-200 animate-pulse"></div>
            </div>
        </div>
    )
}

export const SidebarTopdivSkeleton = () => {
    return (
        <div className="flex flex-col items-center h-full justify-center">
            <div className="flex justify-center items-center">
                <div className="rounded-full w-20 h-20 bg-gray-200 dark:bg-[#292929] animate-pulse"></div>
            </div>
            <div className="flex justify-center items-center mt-4">
                <div className="h-4 w-20 rounded-md bg-gray-200 dark:bg-[#292929] animate-pulse"></div>
            </div>
        </div>
    )
}

export const ChatNavSkeleton = () => {
    return (
        <div className="flex flex-col w-32 h-full">
            <div className="bg-gray-200 dark:bg-[#292929] w-full h-6 mt-4 ml-2 animate-pulse rounded-md">

            </div>
            <div className="bg-gray-200 dark:bg-[#292929] w-full h-4 mt-2 ml-2 animate-pulse rounded-md">

            </div>
        </div>
    )
}

export const ChatboxSkeleton = () => {
    return (
        <div className="h-full flex items-center justify-center w-full bg-white px-1 rounded-lg dark:bg-[#1E1E1F] ">
            <div className="border h-5/6 w-11/12 px-3 shadow-md bg-gray-200 dark:bg-[#1E1E1F] animate-pulse rounded-md"></div>
        </div>
    )
}