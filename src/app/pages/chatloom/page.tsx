import Sidebar from "@/app/components/sidebar"
import SideBarExtension from "@/app/components/sidebarExtension"

export default function ChatLoom() {
  return (
    <div className="flex">
      <Sidebar />
      <SideBarExtension />
    </div>
  )
}