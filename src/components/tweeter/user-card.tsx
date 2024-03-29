import { UserType } from '@/app/lib/definitions'
import { formatNumber } from '@/app/lib/utils'
import Image from 'next/image'
import React from 'react'
import { MdPersonAdd } from 'react-icons/md'

export default function UserCard({ user }: { user: UserType }) {
  return (
    <div className='py-3 px-4 rounded-xl shadow-card bg-primary '>
      <div className='flex justify-between gap-4 items-center'>
        <Image src={user?.photo || ''} width={40} height={40} className='h-[40px] w-[40px] rounded-lg bg-background' alt='Suggested user profile photo' />
        <div>
          <span className='text-base block font-medium'>{user.name}</span>
          <span className='text-placeholder font-medium text-xs'>{formatNumber(user.followers.length)} followers</span>
        </div>
        <button className='flex gap-2 text-sm ml-auto items-center text-white bg-[#2F80ED] rounded-md px-3 py-1'>
          <MdPersonAdd size={17}/>
          Follow
        </button>
      </div>
      <p className='text-text my-4'>{user.bio}</p>
      <Image src={user?.photo || ''} width={0} height={0} className='h-[100px] w-full rounded-lg bg-background' alt='Suggested user profile photo' />
    </div>
  )
}
