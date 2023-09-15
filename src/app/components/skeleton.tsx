import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const UsersSkeleton = () => {
    return (
        <SkeletonTheme
            baseColor="#616161"
            highlightColor="#444"
        >
            <div className="h-20 group relative bg-dark-100 text-white gap-2 cursor-pointer rounded p-5 transition duration-10 ease-in-out">
                <Skeleton className="h-full w-20 mt-4" count={2} />
            </div>
        </SkeletonTheme>
    );
};

export const ChatsidebarSkeleton = () => {
    return (
        <div>
            <div className="flex justify-center items-center">
                <div className='rounded-full w-20 h-20 mt-6 bg-gray-200 animate-pulse'></div>
            </div>
            <div className='flex justify-center items-center mt-4'>
                <div className="h-4 w-20 rounded-md bg-gray-200 animate-pulse"></div>
            </div>

            <div className='w-full flex justify-center items-center'>
                <div className="border rounded-lg bg-gray-200 w-[85%] mt-6 dark:bg-[#292929] dark:border-[#686C76] dark:border-opacity-50 h-16 animate-pulse"></div>
            </div>
            <div className='w-full flex justify-center items-center'>
                <div className="mt-4 border rounded-lg bg-gray-200 w-[85%] px-2 py-3 dark:bg-[#292929] dark:border-[#686C76] dark:border-opacity-50 h-10 animate-pulse "></div>
            </div>

            <div className='w-full flex justify-center items-center'>
                <div className="mt-4 border rounded-lg bg-gray-200 w-[85%] px-2 py-3 dark:bg-[#292929] dark:border-[#686C76] dark:border-opacity-50 h-28 animate-pulse"></div>
            </div>

            <div className="mt-8 border rounded-lg bg-[#686C76] w-full h-[.1px] dark:border-[#686C76] dark:border-opacity-10"></div>
            <div className="mt-12 flex items-center justify-center">
                <div className='bg-gray-200 animate-pulse w-10 h-2 rounded-md mr-2'></div>
                <div className='rounded-full w-5 h-5 bg-gray-200 animate-pulse'></div>
            </div>
        </div>
    )
}

export const ChatboxSkeleton = () => {
    return (
       
            <div className='h-full flex items-center justify-center w-full bg-white px-1 rounded-lg dark:bg-[#1E1E1F] dark:border-[#686C76] dark:border-[1px]'>
                    <div className='border h-5/6 w-11/12 px-3 shadow-md bg-gray-200 dark:bg-[#1E1E1F] animate-pulse'></div>
                </div>
      
    )
}