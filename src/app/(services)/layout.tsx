import Sidebar from "@/app/components/sidebar"
import Navbar from "@/app/components/navbar"
export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex">
      <section className="h-screen flex">
        <Sidebar />
      </section>

      <section className="flex flex-col w-full">
        <section className="flex">
          <Navbar />
        </section>
        <section className="w-full h-full">
          {children}
        </section>
      </section>
    </section>
  )
}