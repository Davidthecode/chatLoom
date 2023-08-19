import { AiOutlineClose } from 'react-icons/ai';

type NotificationsPopupProps = {
    onClose: () => void;
};

export default function NotificationsPopup({ onClose }: NotificationsPopupProps) {
    return (
        <div>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                <div className="bg-white rounded-lg text-black w-2/5 h-2/5">
                    <section className='flex items-center border-b px-4 py-2 bg-[#313338] text-white'>
                        <div>
                            NOTIFICATIONS
                        </div>
                        <div className='w-8 ml-auto bg-[#5F6066] text-white hover:text-red-500 rounded-md flex justify-center items-center h-8 '>
                            <AiOutlineClose onClick={onClose} size='1.1rem' />
                        </div>
                    </section>

                    <div className='flex justify-center items-center'>
                        <h2 className='text-center'>You have no notifications yet</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};