export default function ChatsExtended({ params }: any) {
    console.log(params);

    return (
        <div className="h-full flex">

            <div className="w-3/4 border">
                <section className="h-24 border-b text-center">
                    <h1>Header</h1>
                </section>
                <section className="border-t text-center">
                    my name is {params.name}
                </section>
            </div>

            <div className="w-1/4 border bg-[#F7F7F8]">
                {params.name}
            </div>
        </div>
    )
}