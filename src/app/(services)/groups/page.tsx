import { AiOutlineSearch } from 'react-icons/ai'

export default function Groups () {
    return(
        <div className="flex flex-col w-1/4 border-r pl-2">
            <h1 className='my-2'>All Groups</h1>
            <div className='flex border rounded-lg w-11/12 h-10 items-center pl-2 bg-slate-200'>
                <input type="text" className="w-4/5 outline-none bg-slate-200 text-black mr-2" placeholder='search'/>
                <div className="">
                    <AiOutlineSearch size="1.5rem" />
                </div>
            </div>

        </div>
    )
}