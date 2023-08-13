import Chats from '../../page'
import { Suspense } from 'react'
import Loading from '@/app/components/loading'
export default function ServiceExtendedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className='flex h-full w-full'>
            <Chats />
            <Suspense fallback={<Loading />}>
                <section className='w-4/5'>
                    {children}
                </section>
            </Suspense>
        </section>
    )
}