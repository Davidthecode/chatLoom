import Sidebar from "@/app/components/sidebar"
import Navbar from "@/app/components/navbar"
import { Suspense } from "react"
import Loading from './loading'

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<Loading />}>
      <section className="flex">
        <section className="h-screen flex">
          <Sidebar />
        </section>

        <section className="flex flex-col w-full h-screen">
          <section className="flex h-[7%]">
            <Navbar />
          </section>
          <section className="w-full h-[93%]">
            {children}
          </section>
        </section>
      </section>
    </Suspense>
  )
}