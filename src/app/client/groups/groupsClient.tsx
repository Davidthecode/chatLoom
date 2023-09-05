'use client';

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import groupImage from '../../../../public/no-user.png'

type GroupData = {
    groupName: string,
    groupDescription: string,
    groupType: string,
    groupId: string
};

export default function GroupsClient() {
    const [groups, setGroups] = useState<GroupData[]>([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const q = query(
            collection(db, 'groups'),
            orderBy('createdAt', 'desc')
        )
        const unsubscribe = onSnapshot(q, (snapshot) => {
            let tempGroup: any[] = []
            snapshot.forEach((doc) => {
                tempGroup.push({ ...doc.data() as GroupData, id: doc.id });
            });
            setGroups(tempGroup)
            setIsLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    if (isLoading) {
        return <div className="text-center"></div>
    }

    if (groups.length == 0) {
        <h1>oops..no groups, create a group</h1>
    }

    return (
        <div>
            {groups.map((group, index) => {
                return (
                    <Link href={`/groups/${group.groupId}`} key={index}>
                        <div className={`flex mt-2 h-20 pt-4 cursor-pointer font-sans items-center`}>
                            <div className="flex items-center justify-start w-11/12">
                                <div className="">
                                    <Image src={groupImage} alt="image" className="w-10 h-10 rounded-full mr-2" width={10} height={10} />
                                </div>
                                <div>
                                    <h1 className="">{group.groupName}</h1>
                                    <p className="text-sm opacity-80">Lorem ipsum dolor sit, am</p>
                                </div>
                            </div>
                            <div className="ml-auto mr-2 w-1/12">
                                <p className="text-xs pl-auto">2m</p>
                                <p className="text-xs rounded-full bg-[#4F46E5] w-4 h-4 mt-1 text-white text-center pl-auto">2</p>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}