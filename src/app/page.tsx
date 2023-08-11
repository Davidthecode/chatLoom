'use client'

import Auth from "./components/auth"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [isAuth, setIsAuth] = useState(false)
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