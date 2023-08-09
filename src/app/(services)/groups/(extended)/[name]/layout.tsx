import Groups from "../../page"
export default function ServiceExtendedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className='flex h-full'>
            <Groups />
            <section className='w-4/5'>
                {children}
            </section>

        </section>
    )
}