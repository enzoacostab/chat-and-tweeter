import { formatNumber } from '@/app/lib/utils'
import Image from 'next/image'
import React from 'react'
import { MdPersonAdd } from 'react-icons/md'

export default function UserCard({ user }: any) {
  return (
    <div className='flex flex-col items-center md:items-start md:flex-row bg-primary rounded-xl max-w-[1070px] lg:w-full mx-10 p-7 gap-5 -mt-10'>
      <div className='rounded-lg w-fit -mt-20 relative bg-primary p-1'>
        <Image src={user.photo} height={160} width={160} className='h-[160px] w-[160px] bg-background rounded-lg' alt='user profile image'/>
      </div>
      <div className='flex gap-y-5 flex-col md:w-[60%] w-full'>
        <div className='text-xs flex flex-wrap md:justify-start justify-center md:flex-nowrap items-center gap-y-3 gap-x-7'>
          <h1 className='font-semibold w-full md:w-fit text-2xl text-center'>{user.name}</h1>
          <p className='font-medium text-text'>
            <span className='font-semibold mr-1 text-foreground'>{formatNumber(user.following)}</span>
            Following 
          </p>
          <p className='font-medium text-text'>
            <span className='font-semibold mr-1 text-foreground'>{formatNumber(user.followers)}</span>
            Followers 
          </p>
        </div>
        <p className='text-text text-center md:text-left text-lg font-medium'>{user.bio}</p>
      </div>
      <button className='text-xs h-fit md:ml-auto font-medium px-5 py-2 flex gap-1 bg-[#2F80ED] items-center text-white rounded-md'>
        <MdPersonAdd size={14}/>
        Follow
      </button>
    </div>
  )
}
