'use client'

import Image from "next/image";
import { db } from "../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "../components/loading";

type Chatsidebar = {
    photoUrl: string,
    username: string,
    userId: string
};

export default function ChatSidebar() {
    const params = useParams();
    const collectionRef = collection(db, 'users');
    const [data, setData] = useState<Chatsidebar>();

    const getInfo = async (): Promise<Chatsidebar[]> => {
        try {
            const res = await getDocs(collectionRef);
            const collectionData = res.docs.map(doc => doc.data() as Chatsidebar);
            collectionData.map((data) => {
                if (data.userId == params.name) {
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

    useEffect(() => {
        getInfo();
    }, []);

    if (data == undefined) {
        <div className="flex items-center h-full justify-center">
            <Loading />
        </div>
    };

    return (
        <div>
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
                <div>
                    <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor odit quas, cumque a voluptatem molestias tenetur earum totam consequatur expedita tempore facere libero repellendus quos rerum id corrupti perspiciatis consequuntur.</p>
                </div>
                <div className="mt-4">
                    <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor odit quas, cumque a voluptatem molestias tenetur earum totam consequatur expedita tempore facere libero repellendus quos rerum id corrupti perspiciatis consequuntur.</p>
                </div>
            </section>
        </div>
    )
};