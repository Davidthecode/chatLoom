import AuthClient from '../client/authClient';
import Image from 'next/image';
import loom from '../../../public/loom.png';

export default function Auth() {
  return (
    <div className='flex'>
      <div>
        <Image src={loom} alt='image' className='w-2/3 h-screen' />
      </div>

      <div className='flex flex-col mt-[15rem] ml-[-8rem] w-1/4 ml-2'>
        <h1 className='text-3xl font-semibold'>Sign in to ChatLoom</h1>
        <AuthClient />
        <p className='text-xs mt-10 text-center'>By creating an account you agree with our
          <span className='underline'>Terms of Service,</span>
          <span className='underline'>Privacy Policy,</span>
          and our default
          <span className='underline'>Notification Settings.</span>
        </p>
      </div>
    </div>
  )
};