'use client'

import { useContext } from "react"
import { AuthContext } from "../state/authContext"
import { setCookie, getCookie } from "cookies-next"
import { useEffect } from "react"

export default function Navbar() {
  
  useEffect(() => {
    getCookie('username')
  }, [])

  const name = useContext(AuthContext)
  const username = name?.authData?.username || 'no name'
  if (username) {
    setCookie('username', username)
  }
  return (
    <div className="flex justify-around h-12 items-center px-4 w-full border-b">
      <aside>
        <h1>CHATLOOM</h1>
      </aside>

      <aside>
        <h1>notifications</h1>
      </aside>

      <aside>
        <h1>{username}</h1>
      </aside>
    </div>
  )
}