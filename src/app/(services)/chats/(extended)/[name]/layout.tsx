import Chats from '../../page';
export default function ServiceExtendedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className='flex h-full w-full'>
            <Chats />
            <section className='w-4/5'>
                {children}
            </section>
        </section>
    );
};