import AuthClient from '../client/auth/authClient';
import Image from 'next/image';
import loom from '../../../public/loom.png';

export default function Auth() {
  return (
    <div className='xxs:flex md:flex md:flex-row dark:text-white'>
      <div className='lg:w-[40%] md:w-[50%] xxs:hidden sm:hidden md:block'>
        <Image src={loom} alt='image' className='w-full h-screen' />
      </div>

      <div className='lg:w-[60%] md:w-[50%] flex justify-center h-screen items-center'>
        <div className='flex flex-col w-3/4 justify-center text-center'>
          <h1 className='text-3xl font-semibold'>Sign in to ChatLoom</h1>
          <AuthClient />
          <div className='w-full'>
            <p className='text-xs mt-10 text-center'>By creating an account you agree with our
              <span className='underline'>Terms of Service,</span>
              <span className='underline'>Privacy Policy,</span>
              and our default
              <span className='underline'>Notification Settings.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};