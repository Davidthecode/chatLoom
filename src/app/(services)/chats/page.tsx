import dynamic from 'next/dynamic';
import { AiOutlineSearch } from 'react-icons/ai';
import Loading from '@/app/components/loading';
const DymanicUsers = dynamic(() => import('@/app/client/users'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center h-full justify-center">
            <Loading />
        </div>
    )
});

export default function Chats() {
    return (
        <div className="flex flex-col w-1/5 h-full border-r pl bg-[#F8F9FA] text-black">
            <h1 className='my-2 text-black ml-2'>All Chats</h1>
            <div className='flex border rounded-lg w-11/12 h-10 items-center pl-2 ml-2 bg-white'>
                <div className="text-black mr-2">
                    <AiOutlineSearch size="1.3rem" />
                </div>
                <input type="text" className="w-4/5 outline-none text-black " placeholder='search...' />
            </div>
            <div>
                <DymanicUsers />
            </div>
        </div>
    );
};