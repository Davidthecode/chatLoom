import dynamic from "next/dynamic";
import Loading from "@/app/components/loading";

const DynamicGroupsMain = dynamic(()=> import('@/app/client/groups/groupsMain'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center h-full justify-center">
            <Loading />
        </div>
    )
})

export default function GroupsExtended({ params }: any) {
    return (
        <div className="h-[100%]">
            <DynamicGroupsMain />
        </div>
    )
}