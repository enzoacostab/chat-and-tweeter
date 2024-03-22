import React from 'react'
import FormTweet from './form-tweet'
import Image from 'next/image'
import { getUser } from '@/app/lib/data'

export default async function CardFormTweet() {
  const user = 1//await getUser()

  return (
    <div className='w-full bg-primary py-3 px-4 rounded-xl shadow-card'>
      <h2 className='font-semibold pb-3 text-xs border-b border-secondary'>
        Tweet something
      </h2>
      <div className='flex pt-3 gap-2'>
        <Image src={user?.photo || ''} width={40} height={40} className='max-h-[40px] rounded-lg' alt='User profile picture' />
        <FormTweet/>
      </div>
    </div>
  )
}
