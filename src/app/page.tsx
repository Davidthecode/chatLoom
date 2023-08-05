'use client'

import Auth from "./auth/page"
import Chatloom from "./chatloom/page"
import { useState } from "react"

export default function Home () {
  const [isAuth, setIsAuth] = useState(false)
  
  if(!isAuth){
    return(
      <Auth
      setIsAuth={setIsAuth}
      />
    )
  }

  return(
    <div>
      <Chatloom />
    </div>
  )
}