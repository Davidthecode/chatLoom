export default function ChatsExtended({ params }: any) {
    console.log(params);

    return (
        <div className="h-full flex">

            <div className="w-3/4 border">
               my name is {params.name}
            </div>

            <div className="w-1/4 border">
                {params.name}
            </div>
        </div>
    )
}