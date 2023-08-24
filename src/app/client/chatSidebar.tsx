'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Loading from "../components/loading";
import { AiFillGithub } from 'react-icons/ai'
import Link from "next/link";
import { auth } from "../firebase/firebase-config";

type Chatsidebar = {
    photoUrl: string,
    username: string,
    userId: string
};

export default function ChatSidebar() {
    const currentUserUid = auth.currentUser?.uid
    const { name } = useParams();
    const [data, setData] = useState<Chatsidebar>();
    const collectionRef = collection(db, 'users');

    useEffect(() => {
        const getInfo = async (): Promise<Chatsidebar[]> => {
            try {
                const res = await getDocs(collectionRef);
                const collectionData = res.docs.map(doc => doc.data() as Chatsidebar);
                collectionData.map((data) => {
                    if (data.userId == name) {
                        setData({
                            photoUrl: data.photoUrl,
                            username: data.username,
                            userId: data.userId
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

    return (
        <div>
            {currentUserUid ? (
                <section className="flex flex-col justify-center items-center mt-6 px-4">
                    <div className="">
                        {data ?
                            <Image src={data.photoUrl} alt="imahge" width={70} height={70} className="rounded-full" /> :
                            <div className="flex items-center h-full justify-center">
                                <Loading />
                            </div>
                        }
                    </div>
                    <div>
                        <h1 className="text-center font-semibold mt-2">{data?.username}</h1>
                    </div>
                    <div className="border rounded-lg bg-white w-full mt-6 px-2 py-3">
                        <h2>Senior software engineer</h2>
                        <p>Full time</p>
                    </div>
                    <div className="mt-4 border rounded-lg bg-white w-full mt-10 px-2 py-3 ">
                        <p>Status: Active</p>
                    </div>
                    <div className="mt-4 border rounded-lg bg-white w-full mt-10 px-2 py-3">
                        <h1>Socials</h1>
                        <ol>
                            <li>Twitter</li>
                            <li>Facebook</li>
                            <li>Instagram</li>
                            <li>Thread</li>
                        </ol>
                    </div>
                    <div className="mt-4 border rounded-lg bg-white w-full mt-10 h-1"></div>
                    <div className="mt-20 flex items-center">
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
        </div>
    );
};