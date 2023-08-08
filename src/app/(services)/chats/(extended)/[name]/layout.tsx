import Chats from '../../page'
export default function ServiceExtendedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className='flex'>
            <section  className='bg-red-500'>
                <Chats />
            </section>
            <section className='bg-blue-500 w-full'>
                {children}
            </section>

        </section>
    )
}