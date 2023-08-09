export default function GroupsExtended({ params }: any) {
    console.log(params);

    return (
        <div className="flex h-full">
            <div className="w-3/4 border">
                my group name is {params.name}
            </div>
            <div className="w-1/4 border">
                {params.name}
            </div>
        </div>
    )
}