import { AiOutlineSearch } from 'react-icons/ai';
import dynamic from 'next/dynamic';
import Loading from '@/app/components/loading';

const DynamicGroupsClient = dynamic(() => import('@/app/client/groups/groupsClient'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center h-full justify-center">
            <Loading />
        </div>
    )
})

export default function Groups() {
    return (
        <div className="flex flex-col w-1/5 bg-[#F7F7F8] h-full border-r pl-2 dark:bg-[#111827] dark:text-white dark:border-[#686C76] dark:border-none dark:opacity-90">
            <h1 className='my-2'>All Groups</h1>
            <div className='flex border rounded-lg w-11/12 h-10 items-center pl-2 bg-white dark:bg-[#374151]'>
                <div className="text-black mr-2 dark:text-white">
                    <AiOutlineSearch size="1.3rem" />
                </div>
                <input type="text" className="w-4/5 outline-none text-black dark:text-white dark:bg-[#374151]" placeholder='search...' />
            </div>
            <div>
                <DynamicGroupsClient />
            </div>

        </div>
    )
}