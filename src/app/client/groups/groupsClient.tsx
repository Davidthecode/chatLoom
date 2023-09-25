"use client";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import groupImage from "../../../../public/no-user.png"
import { GroupsSkeleton } from "@/app/components/skeleton";
import { CiLock } from 'react-icons/ci'
import { CiUnlock } from 'react-icons/ci'

type GroupData = {
    groupName: string,
    groupDescription: string,
    groupType: string,
    groupId: string
};

export default function GroupsClient() {
    const currentuserUid = auth.currentUser?.uid
    const [groups, setGroups] = useState<GroupData[]>([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const q = query(
            collection(db, "groups"),
            orderBy("createdAt", "desc")
        )
        const unsubscribe = onSnapshot(q, (snapshot) => {
            let tempGroup: any[] = []
            snapshot.forEach((doc) => {
                const groupData = { ...doc.data() as GroupData, id: doc.id }
                tempGroup.push(groupData);
            });

            const filteredGroups = tempGroup.filter((group) => {
                if (group.groupType === "public") {
                    return true;
                }
                // Check if the user is a member of the private group
                return Array.isArray(group.groupMembersId) && group.groupMembersId.includes(currentuserUid);
            });
    
            setGroups(filteredGroups)
            setIsLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const numberOfSkeletons = 8;

    return (
        <div>
            {isLoading ? (
                <>
                    {Array.from({ length: numberOfSkeletons }, (_: any, index: number) => (
                        <GroupsSkeleton key={index} />
                    ))}
                </>
            ) : (
                <div>
                    {groups.map((group, index) => {
                        return (
                            <Link href={`/groups/${group.groupId}`} key={index}>
                                <div className={`flex mt-2 h-20 pt-4 pl-2 cursor-pointer font-mulish items-center`}>
                                    <div className="flex items-center justify-start w-11/12">
                                        <div className="">
                                            <Image src={groupImage} alt="image" className="w-10 h-10 rounded-full mr-2" width={10} height={10} />
                                        </div>
                                        <div>
                                            <h1 className="font-semibold">{group.groupName}</h1>
                                            <p className="text-sm opacity-80 dark:text-[#CEC9A9]">Lorem ipsum dolor sit, am</p>
                                        </div>
                                    </div>
                                    <div className="ml-auto mr-2 w-1/12">
                                        {group.groupType == 'private' && <CiLock size="1rem" />}
                                        <p className="text-xs pl-auto">2m</p>
                                        <p className="text-xs rounded-full bg-[#4F46E5] w-4 h-4 mt-1 text-white text-center pl-auto">2</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            )}

        </div>
    )
}