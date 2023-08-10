import AuthClient from '../client/authClient'
import {Dispatch, SetStateAction} from 'react'

export type authProps = {
  setIsAuth:  Dispatch<SetStateAction<boolean>>
}

export default function Auth({ setIsAuth }: authProps) {
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-[#E6E6FA]">
      <h1 className='text-5xl mb-6'>ChatLoom</h1>
      <h1 className="text-3xl font-bold mb-4">SignIn with Google</h1>
      <AuthClient setIsAuth={setIsAuth} />
    </div>
  )
}