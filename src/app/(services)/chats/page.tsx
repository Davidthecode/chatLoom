import { AiOutlineSearch } from 'react-icons/ai'

export default function Chats() {
    return (
        <div className="flex flex-col w-1/5 h-full border-r pl-2 bg-[#F7F7F8] text-white">
            <h1 className='my-2 text-black'>All Chats</h1>
            <div className='flex border rounded-lg w-11/12 h-10 items-center pl-2 bg-white'>
                <div className="text-black mr-2">
                    <AiOutlineSearch size="1.3rem" />
                </div>
                <input type="text" className="w-4/5 outline-none text-black " placeholder='search...' />
            </div>

        </div>
    )
}