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

const DynamicGroupSearchBar = dynamic(()=> import('@/app/client/groups/searchBar'),{
    ssr:false,
    loading: ()=> <div className='w-full h-6 opacity-50'>search...</div>
})

export default function Groups() {
    return (
        <div className="flex flex-col w-1/5 bg-[#F7F7F8] h-full border-r pl-2 dark:bg-[#1D1D1D] dark:text-white dark:border-[#686C76] dark:border-r-[#686C76] dark:border-opacity-30 font-mulish">
            <h1 className='my-2'>All Groups</h1>
            <div className='flex border-none rounded-lg w-11/12 h-10 items-center pl-2 bg-white dark:bg-[#282829]'>
                <div className="text-black mr-2 dark:text-white">
                    <AiOutlineSearch size="1.3rem" />
                </div>
                <DynamicGroupSearchBar />
            </div>
            <div>
                <DynamicGroupsClient />
            </div>

        </div>
    )
}