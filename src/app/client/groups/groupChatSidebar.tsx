'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Loading from "../../components/loading";
import { AiFillGithub } from 'react-icons/ai'
import Link from "next/link";
import { auth } from "../../firebase/firebase-config";
import groupImage from '../../../../public/no-user.png'
import InvitePopup from "./invitePopup";

type GroupChatsidebar = {
    groupName: string,
    groupDescription: string,
    groupType: string,
    groupId: string
};

export default function GroupChatSidebar() {
    const currentUserUid = auth.currentUser?.uid
    const { name } = useParams();
    const [data, setData] = useState<GroupChatsidebar>();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const collectionRef = collection(db, 'groups');
    console.log(data)

    useEffect(() => {
        const getInfo = async (): Promise<GroupChatsidebar[]> => {
            try {
                const res = await getDocs(collectionRef);
                const collectionData = res.docs.map(doc => doc.data() as GroupChatsidebar);
                collectionData.map((data) => {
                    if (data.groupId == name) {
                        setData({
                            groupName: data.groupName,
                            groupDescription: data.groupDescription,
                            groupType: data.groupType,
                            groupId: data.groupId
                        });
                    };
                });
                return collectionData;
            } catch (error) {
                console.log(error);
                return [];
            }
        }
        getInfo();
    }, [])

    if (data == undefined) {
        <div className="flex items-center h-full justify-center">
            <Loading />
        </div>
    };

    const handleInvite = () => {
        setIsPopupVisible(true)
    }

    const closePopup = () => {
        setIsPopupVisible(false)
    }

    return (
        <div>
            {currentUserUid ? (
                <section className="flex flex-col justify-center items-center mt-6 px-4 font-mulish text-sm">
                    <div className="">
                        {data ?
                            <Image src={groupImage} alt="imahge" width={70} height={70} className="rounded-full" /> :
                            <div className="flex items-center h-full justify-center">
                                <Loading />
                            </div>
                        }
                    </div>
                    <div>
                        <h1 className="text-center font-semibold mt-2">{data?.groupName}</h1>
                    </div>
                    <div className="border rounded-lg bg-white w-full mt-6 px-2 py-3 h-48 overflow-y-scroll dark:bg-[#29292A] dark:border-[#686C76]">
                        <h2 className="font-bold">Group Description:</h2>
                        <div>{data ? data?.groupDescription : <div className="flex items-center h-full justify-center"><Loading /></div>}</div>
                    </div>
                    <div className="mt-4 border rounded-lg bg-white w-full px-2 py-3 dark:bg-[#29292A] dark:border-[#686C76]">
                        <p className="font-bold">Group type: <span className="font-normal">{data?.groupType}</span> </p>
                    </div>
                    <div className="mt-4 border rounded-lg bg-white w-full px-2 py-3 dark:bg-[#29292A] dark:border-[#686C76]">
                        <h1 className="font-bold">Socials</h1>
                        <ol>
                            <li>Twitter</li>
                            <li>Facebook</li>
                            <li>Instagram</li>
                            <li>Thread</li>
                        </ol>
                    </div>
                    {data?.groupType == "private" && <div className="mt-4 border rounded-lg bg-white w-full px-2 py-3 dark:bg-[#29292A] dark:border-[#686C76]">
                        <p className="font-bold cursor-pointer" onClick={handleInvite}>send an invite </p>
                    </div>}
                    <div className="border rounded-lg bg-white w-full h-1 mt-6"></div>
                    <div className=" flex items-center mt-8">
                        <p className="mr-2">Star on github</p>
                        <div className="cursor-pointer">
                            <Link href='https://github.com/Davidthecode/chatLoom' target="_blank">
                                <AiFillGithub size='1.2rem' />
                            </Link>
                        </div>
                    </div>

                </section>
            ) : (
                <div></div>
            )}
             {isPopupVisible && <InvitePopup onClose={closePopup} />}
        </div>
    );
};