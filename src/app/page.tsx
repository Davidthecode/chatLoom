'use client'

import Auth from "@/app/pages/auth/page"
import Chatloom from "@/app/pages/chatloom/page"
import Navbar from "@/app/components/navbar"
import { useState } from "react"

export default function Home() {
  const [isAuth, setIsAuth] = useState(false)

  if (!isAuth) {
    return (
      <Auth
        setIsAuth={setIsAuth}
      />
    )
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Chatloom />
      </div>
    </div>
  )
}