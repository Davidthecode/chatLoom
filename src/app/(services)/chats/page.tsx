import dynamic from 'next/dynamic';
import { AiOutlineSearch } from 'react-icons/ai';
import UserCardSkeleton from '@/app/components/userSkeleton';

const numberOfSkeletons = 2;

const DymanicUsers = dynamic(() => import('@/app/client/chats/users'), {
    ssr: false,
    loading: () => (
        <>
            {Array.from({ length: numberOfSkeletons }, (_: any, index: number) => (
                <UserCardSkeleton key={index} />
            ))}
        </>
    )
});

const DynamicChatSearchBar = dynamic(()=> import('@/app/client/chats/searchBar'),{
    ssr:false,
    loading: ()=> <div className='w-full h-6 opacity-50'>search...</div>
})

export default function Chats() {
    return (
        <div className="flex flex-col xl:w-1/5 alg:w-[25%] blg:hidden h-full border-r pl bg-[#F8F9FA] text-black dark:bg-[#1D1D1D] dark:text-white dark:border-r-[#686C76] dark:border-opacity-30 font-mulish">
            <h1 className='my-2 ml-2'>All Chats</h1>
            <div className='flex border rounded-lg w-11/12 h-10 items-center pl-2 ml-2 bg-white dark:bg-[#374151]'>
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