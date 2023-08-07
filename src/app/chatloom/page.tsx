import Sidebar from "@/app/components/sidebar"
import Navbar from "../components/navbar"
import Chats from "./chats/page"

export default function ChatLoom() {
  return (
    <div className="flex flex-col h-screen" >
      <div>
        <Navbar />
      </div>

      <div className="flex flex-grow">
        <Sidebar />
      </div>
    </div>
  )
}