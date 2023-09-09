import Chats from '../../page';
export default function ServiceExtendedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className='flex h-full w-full'>
            <Chats />
            <section className='xl:w-4/5 largeDesktop:w-[75%] mediumDesktop:w-[70%] wideTablet:w-[65%] narrowDesktop:w-[65%] smallTablet:w-[100%] mobile:w-[100%]'>
                {children}
            </section>
        </section>
    );
};