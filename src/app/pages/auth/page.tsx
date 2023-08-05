'use client'

import {auth, provider} from '../../../../firebase'
import {signInWithPopup} from 'firebase/auth'
import {setCookie} from 'cookies-next'

export default function Auth ({setIsAuth}: any) {

  const handleSignIn = async()=> {
    try {
      const result = await signInWithPopup(auth, provider)
      setCookie('auth-token', result.user.refreshToken )
      setIsAuth(true)
      
    } catch (error) {
      console.log(error);  
    }
  }

    return(
      <div>
        <h1>SignIn with Google</h1>
        <button className='border' onClick={handleSignIn}>sign in</button>
      </div>
    )
  }