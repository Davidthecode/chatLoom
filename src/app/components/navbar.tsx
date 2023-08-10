'use client'

import { useContext } from "react"
import { AuthContext } from "../state/authContext"
import { setCookie, getCookie } from "cookies-next"
import { useEffect } from "react"
import { PiUserCircleLight } from 'react-icons/pi'
import { MdDarkMode } from 'react-icons/md'
import { IoMdNotificationsOutline } from 'react-icons/io'

export default function Navbar() {

  useEffect(() => {
    getCookie('username')
  }, [])

  const name = useContext(AuthContext)
  const username = name?.authData?.username || 'Isioma George'
  if (username) {
    setCookie('username', username)
  }
  return (
    <div className="flex justify-between h-12 items-center px-4 w-full border-b">
      <aside>
        <h1>CHATLOOM</h1>
      </aside>

      <aside className="flex items-center">
        <div className="flex items-center">
          <div className="bg-[#F7F7F8] w-8 h-8 flex items-center justify-center rounded-full mr-3 hover:bg-[#E3E3E6]">
            <IoMdNotificationsOutline size='1.4rem' className='' />
          </div>
          <div className="bg-[#F7F7F8] w-8 h-8 flex items-center justify-center rounded-full mr-3 hover:bg-[#E3E3E6]">
            <MdDarkMode size='1.4rem' />
          </div>
        </div>
        <div className="flex items-center">
          <div className="">
            <hr className="mx-3 w-0 border h-8" />
          </div>
          <div className="bg-[#F7F7F8] w-8 h-8 flex items-center justify-center rounded-full mr-3 hover:bg-[#E3E3E6] mr-2">
            <PiUserCircleLight size='1.4rem' className='' />
          </div>
          <h1 className="font-semibold text-sm">{username}</h1>
        </div>
      </aside>
    </div>
  )
}