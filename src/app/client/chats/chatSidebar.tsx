'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../firebase/firebase-config";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { AiFillGithub } from 'react-icons/ai'
import Link from "next/link";
import { auth } from "../../firebase/firebase-config";
import { useProfileContext } from '@/app/state/chats/profileProvider'
import { SidebarTopdivSkeleton } from '@/app/components/skeleton'

type Chatsidebar = {
    photoUrl: string,
    username: string,
    userId: string,
    online: boolean
};

export default function ChatSidebar() {
    const { isProfile } = useProfileContext()
    const currentUserUid = auth.currentUser?.uid
    const params = useParams();
    const receiverUserId = params.name as string
    const [data, setData] = useState<Chatsidebar>();
    const [online, setOnline] = useState(false)
    const collectionRef = collection(db, 'users');
    const userRef = doc(db, "users", receiverUserId)

    if (currentUserUid) {
        useEffect(() => {
            const getInfo = async (): Promise<Chatsidebar[]> => {
                try {
                    const res = await getDocs(collectionRef);
                    const collectionData = res.docs.map(doc => doc.data() as Chatsidebar);
                    collectionData.map((data) => {
                        if (data.userId == receiverUserId) {
                            setData({
                                photoUrl: data.photoUrl,
                                username: data.username,
                                userId: data.userId,
                                online: data.online
                            });
                        };
                    });
                    return collectionData;
                } catch (error) {
                    console.log(error);
                    return [];
                }
            }

            async function getOnlineStatus() {
                const unsubscribe = onSnapshot(userRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setOnline(data.online)
                    } else return
                })
                return () => {
                    unsubscribe()
                }
            }

            getInfo();
            getOnlineStatus()

        }, [])
    }

    return (
        <div>
            {currentUserUid ? (
                <div>
                    <section className={`flex flex-col justify-center items-center mt-6 px-4 text-sm font-mulish`}>
                        <div className="">
                            {data ?
                                <Image src={data.photoUrl} alt="imahge" width={70} height={70} className="rounded-full" /> :
                                <SidebarTopdivSkeleton />
                            }
                        </div>
                        <div>
                            <h1 className="text-center font-semibold mt-2">{data?.username}</h1>
                        </div>
                        <div className="border rounded-lg bg-white w-full mt-6 px-2 py-3 dark:bg-[#292929] dark:border-[#686C76] dark:border-opacity-50">
                            <h2 className="">Senior software engineer @Amazon</h2>
                            <p>Full time</p>
                        </div>
                        <div className="mt-4 border rounded-lg bg-white w-full px-2 py-3 dark:bg-[#292929] dark:border-[#686C76] dark:border-opacity-50 flex">
                            <p className="font-bold mr-1">Status:</p>  <span> {online ? "Online" : "Offline"}</span>
                        </div>
                        <div className="mt-4 border rounded-lg bg-white w-full px-2 py-3 dark:bg-[#292929] dark:border-[#686C76] dark:border-opacity-50">
                            <h1 className="font-bold">Socials</h1>
                            <ol>
                                <li>Twitter</li>
                                <li>Facebook</li>
                                <li>Instagram</li>
                                <li>LinkedIn</li>
                            </ol>
                        </div>
                        <div className="mt-8 border rounded-lg bg-[#686C76] w-full h-[.1px] dark:border-[#686C76] dark:border-opacity-10"></div>
                        <div className="mt-12">
                            <Link href='https://github.com/Davidthecode/chatLoom' target="_blank">
                                <div className="flex items-center cursor-pointer">
                                    <p className="mr-2">Star on github</p>
                                    <div>
                                        <AiFillGithub size='1.2rem' />
                                    </div>
                                </div>
                            </Link>
                        </div>


                    </section>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};