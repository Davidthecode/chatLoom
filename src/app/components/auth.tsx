'use client'

import { auth, provider } from '../../../firebase'
import { signInWithPopup } from 'firebase/auth'
import { setCookie } from 'cookies-next'
import { useContext } from 'react'
import { AuthContext } from '../state/authContext'


export default function Auth({ setIsAuth }: any) {
  const checkContext = useContext(AuthContext)
  
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      setCookie('auth-token', result.user.refreshToken)
      
      checkContext?.setAuthData({
        username: result.user.email,
        photo: result.user.photoURL,
        email: result.user.email
      })
      
      setIsAuth(true)

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-[#E6E6FA]">
      <h1 className='text-5xl mb-6'>ChatLoom</h1>
      <h1 className="text-3xl font-bold mb-4">SignIn with Google</h1>
      <button
        className="border px-8 py-2 text-lg rounded rounded-xl bg-black text-white transform transition-all duration-300 hover:scale-105"
        onClick={handleSignIn}
      >
        Sign In
      </button>
    </div>
  )
}