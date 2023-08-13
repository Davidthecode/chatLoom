'use client'

import Auth from "./components/auth"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCookie } from "cookies-next"

export default function Home() {
  const router = useRouter()
  const [isAuth, setIsAuth] = useState(getCookie('auth-token'))
  const {push} = router
  console.log(isAuth);
  

  useEffect(() => {
    // Redirect to Chatloom if user is already authenticated
    if (isAuth) {
      push("/chats");
    }
  }, [isAuth]);

  return (
    <div>
    {!isAuth && (
      <Auth
        setIsAuth={setIsAuth}
      />
    )}
    
  </div>
  )
}