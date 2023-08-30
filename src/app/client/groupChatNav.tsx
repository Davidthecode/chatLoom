'use client';

import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase-config";
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useParams } from "next/navigation";

type GroupNav = {
    groupName: string | null,
    groupType: string | null
}

export default function GroupChatNav() {
    const params = useParams();
    const currentUserUid = auth.currentUser?.uid;
    const [groupInfo, setGroupInfo] = useState<GroupNav>({
        groupName: null,
        groupType: null
    })

    const groupId = params.name as string

    useEffect(() => {
        async function getGroupNavData() {
            const q = query(collection(db, "groups"), where("groupId", "==", groupId));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const docSnapshot = querySnapshot.docs[0];
                const data = docSnapshot.data();
                setGroupInfo({
                    groupName: data.groupName,
                    groupType: data.groupType,
                });
            } else {
                console.log("Document not found");
            }
        }
        getGroupNavData()
    }, [groupId])

    return (
        <div>
            {currentUserUid ? (
                <div className="mx-2">
                    <h1 className="font-semibold text-lg">
                        Group Name: {groupInfo.groupName}
                    </h1>
                    <p>Group Type: {groupInfo.groupType}</p>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};