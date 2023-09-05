'use client';

import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-hot-toast'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid'

type CreateGroupPopupProps = {
    onClose: () => void;
};

export default function CreateGroup({ onClose }: CreateGroupPopupProps) {
    const router = useRouter();
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const collectionRef = collection(db, 'groups');

    const handlePublicChange = () => {
        setIsPublic(!isPublic);
        setIsPrivate(false);
    };

    const handlePrivateChange = () => {
        setIsPrivate(!isPrivate);
        setIsPublic(false);
    };

    const isFormValid = groupName !== '' && groupDescription !== '' && (isPublic || isPrivate);

    const handleCreateGroup = async () => {
        if (isFormValid) {
            const groupId = uuidv4();
            const privateToken = isPrivate ? uuidv4() : null
            const groupInfo = {
                groupName,
                groupDescription,
                groupType: isPublic ? 'public' : 'private',
                groupId,
                privateToken,
                createdAt: serverTimestamp()
            };
            await addDoc(collectionRef, groupInfo);
            toast.success('Group created successfully');
            onClose();
            router.push('/groups');
        } else {
            toast.error('fill up all the fields to create a group');
        }
    };

    return (
        <div>
            <div className="fixed z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                <div className="bg-white rounded-lg text-black w-2/5 h-fit relative dark:bg-[#121928] dark:text-white dark:opacity-95">
                    <section className='flex items-center border-b px-4 py-2 bg-[#313338] text-white dark:bg-[#121928]'>
                        <div>
                            CREATE GROUP
                        </div>
                        <div className='w-8 ml-auto bg-[#5F6066] text-white hover:text-red-500 rounded-md flex justify-center items-center h-8 '>
                            <AiOutlineClose onClick={onClose} size='1.1rem' />
                        </div>
                    </section>

                    <div className='flex flex-col items-center space-y-4 pt-4 pb-6'>
                        <div className='flex flex-col items-center'>
                            <h1 className='mr-2'>Group Name</h1>
                            <input type="text"
                                className='border-2 h-8 px-2 dark:bg-[#29292B] dark:outline-none'
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col items-center'>
                            <h1 className='mr-2'>Group Description</h1>
                            <textarea
                                name=""
                                id=""
                                cols={40}
                                rows={4}
                                className='border-2 p-1 dark:bg-[#29292B] dark:outline-none'
                                value={groupDescription}
                                onChange={(e) => setGroupDescription(e.target.value)}>
                            </textarea>
                        </div>
                        <div className='flex items-center'>
                            <input
                                type="checkbox"
                                name="public"
                                id="publicCheckbox"
                                checked={isPublic}
                                onChange={handlePublicChange}
                            />
                            <label htmlFor="publicCheckbox" className='ml-2'>Public</label>
                        </div>
                        <div className='flex items-center'>
                            <input
                                type="checkbox"
                                name="private"
                                id="privateCheckbox"
                                checked={isPrivate}
                                onChange={handlePrivateChange}
                            />
                            <label htmlFor="privateCheckbox" className='ml-2'>Private</label>
                        </div>
                        <div>
                            <button className='border bg-black text-white px-3 py-1 rounded-md text-sm' onClick={handleCreateGroup}>Create Group</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}