import Chats from '../../page';
export default function ServiceExtendedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className='flex h-full w-full'>
            <Chats />
            <section className='xl:w-4/5 alg:w-[75%] blg:w-[100%]'>
                {children}
            </section>
        </section>
    );
};