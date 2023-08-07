import { AiOutlineSearch } from 'react-icons/ai'

export default function Chats() {
    return (
        <div className="flex flex-col">
            <h1>Chats</h1>
            <div className='flex border rounded-lg'>
                <input type="text" className="" placeholder='search'/>
                <div className="">
                    <AiOutlineSearch size="1.5rem" />
                </div>
            </div>

        </div>
    )
}