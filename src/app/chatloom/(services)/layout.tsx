import Sidebar from "@/app/components/sidebar"
import Navbar from "@/app/components/navbar"
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col h-screen">
      <section>
        <Navbar />
      </section>

      <section className="flex flex-grow">
        <Sidebar />
        {children}
      </section>
    </section>
  )
}