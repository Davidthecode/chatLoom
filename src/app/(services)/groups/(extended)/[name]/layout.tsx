import Groups from "../../page"
export default function ServiceExtendedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className='flex h-full'>
            <Groups />
            <section className='xl:w-4/5 largeDesktop:w-[72%] mediumDesktop:w-[65%] wideTablet:w-[60%] narrowDesktop:w-[57%] smallTablet:w-[100%] mobile:w-[100%]'>
                {children}
            </section>

        </section>
    )
}