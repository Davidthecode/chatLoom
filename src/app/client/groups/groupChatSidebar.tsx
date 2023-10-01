'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../firebase/firebase-config";
import { collection, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import Image from "next/image";
import Loading from "../../components/loading";
import { AiFillGithub } from 'react-icons/ai';
import Link from "next/link";
import { auth } from "../../firebase/firebase-config";
import groupImage from '../../../../public/no-user.png'
import InvitePopup from "./invitePopup";
import { PiSpinnerLight } from 'react-icons/pi'
import { LuSend } from 'react-icons/lu'

type GroupChatsidebar = {
    groupName: string,
    groupDescription: string,
    groupType: string,
    groupId: string,
    groupMembersId: string[]
};
type UsersType = {
    userId: string,
    username: string
}

export default function GroupChatSidebar() {
    const currentUserUid = auth.currentUser?.uid
    const { name } = useParams();
    const [data, setData] = useState<GroupChatsidebar>();
    const [groupMembers, setGroupMembers] = useState<string[]>([])
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isMembersLoading, setIsMembersLoading] = useState(true)
    const collectionRef = collection(db, 'groups');

    useEffect(() => {
        const fetchData = async () => {
            await getInfo();
        };

        fetchData();
    }, [])


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
                        groupId: data.groupId,
                        groupMembersId: data.groupMembersId
                    });
                };
            });
            return collectionData;
        } catch (error) {
            console.log(error);
            return [];
        }
    }


    useEffect(() => {
        const getGroupMembers = async () => {
            if (data) {
                const userCollectionRef = collection(db, "users");
                const querydoc = query(userCollectionRef,
                    where('userId', 'in', data.groupMembersId)
                );
                const unsubscribe = onSnapshot(querydoc, (snapshot) => {
                    const members: any[] = [];

                    snapshot.forEach((doc) => {
                        const user = doc.data() as UsersType;
                        members.push(user.username);
                    });

                    setGroupMembers(members);
                    setIsMembersLoading(false);
                });

                return () => unsubscribe();
            }
        }
        getGroupMembers()
    }, [data])

    const handleInvite = () => {
        setIsPopupVisible(true)
    }

    const closePopup = () => {
        setIsPopupVisible(false)
    }

    return (
        <div>
            {currentUserUid ? (
                <section className="flex flex-col justify-center items-center mt-3 px-4 font-mulish text-sm">
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
                    <div className="border rounded-lg bg-white w-full mt-6 px-2 py-3 h-48 overflow-y-auto dark:bg-[#29292A] dark:border-[#686C76]">
                        <h2 className="font-bold">Group Description:</h2>
                        <div>{data ? data?.groupDescription : <div className="flex items-center h-full justify-center"><Loading /></div>}</div>
                    </div>
                    <div className="mt-4 border rounded-lg bg-white w-full px-2 py-3 dark:bg-[#29292A] dark:border-[#686C76]">
                        <p className="font-bold">Group type: <span className="font-normal">{data?.groupType}</span> </p>
                    </div>
                    <div className="mt-4 border rounded-lg bg-white w-full px-2 py-3 dark:bg-[#29292A] dark:border-[#686C76]">
                        <h1 className="font-bold">GroupMembers</h1>
                        {isMembersLoading ?
                            <div className="flex items-center justify-center h-20">
                                <PiSpinnerLight />
                            </div>
                            :
                            <div className=" h-20 overflow-y-auto">
                                {groupMembers?.map((members, index) => (
                                    <div key={index}>
                                        <ol>
                                            <li>{members}</li>
                                        </ol>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                    {data?.groupType == "private" && <div className="mt-4 border rounded-lg bg-white w-full px-2 py-3 dark:bg-[#29292A] dark:border-[#686C76] flex items-center">
                        <p className="font-bold cursor-pointer mr-1" onClick={handleInvite}>send an invite </p>
                        <div>
                            <LuSend />
                        </div>
                    </div>}
                    <div className="border rounded-lg bg-white w-full h-1 mt-6"></div>
                    <div className=" flex items-center mt-6">
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