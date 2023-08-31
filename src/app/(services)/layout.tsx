import Navbar from "@/app/components/navbar";
import { Suspense } from "react";
import Loading from './loading';
import dynamic from "next/dynamic";
import {Toaster} from 'react-hot-toast'

const DynamicSidebar = dynamic(()=> import('@/app/client/sidebar/sidebar'), {
  ssr: false,
  loading: ()=> <h1 className="h-full w-14 bg-black animate-pulse">.</h1>
})

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<Loading />}>
      <section className="flex">
        <section className="h-screen flex">
          <DynamicSidebar />
        </section>

        <section className="flex flex-col w-full h-screen">
          <section className="flex h-[7%]">
            <Navbar />
          </section>
          <section className="w-full h-[93%]">
            {children}
          </section>
        </section>
        <Toaster position='top-center' />
      </section>
    </Suspense>
  );
};