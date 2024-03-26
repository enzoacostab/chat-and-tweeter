import { formatNumber } from '@/app/lib/utils'
import Image from 'next/image'
import React from 'react'
import { MdPersonAdd } from 'react-icons/md'

export default function UserSuggestion({ user }: any) {
  return (
    <li className='font-medium border-t border-secondary py-5'>
      <div className='flex text-xs flex-wrap justify-between gap-3 items-center'>
        <Image src={user?.photo || ''} width={40} height={40} className='h-[40px] w-[40px] rounded-lg bg-background' alt='Suggested user profile photo' />
        <div>
          <span className='text-base block'>{user.name}</span>
          <span className='text-text'>{formatNumber(user.followers)} followers</span>
        </div>
        <button className='flex gap-1 ml-auto items-center text-white bg-[#2F80ED] rounded-md px-3 py-1'>
          <MdPersonAdd size={14}/>
          Follow
        </button>
      </div>
      <p className='text-sm text-text my-4'>{user.bio}</p>
      <Image src={user?.photo || ''} width={0} height={0} className='h-[80px] w-full rounded-lg bg-background' alt='Suggested user profile photo' />
    </li>
  )
}
