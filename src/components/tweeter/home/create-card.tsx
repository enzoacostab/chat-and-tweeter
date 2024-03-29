import React from 'react'
import Image from 'next/image'
import CreateForm from './create-form'
import { UserType } from '@/app/lib/definitions'

export default function CreateCard({ user }: { user: UserType }) {
  return (
    <div className='w-full bg-primary py-3 px-4 rounded-xl shadow-card'>
      <h2 className='font-semibold pb-3 text-xs border-b border-secondary'>
        Tweet something
      </h2>
      <div className='flex pt-3 gap-3'>
        <Image src={user?.photo || ''} width={40} height={40} className='max-h-[40px] rounded-lg' alt='User profile picture' />
        <CreateForm userId={user._id}/>
      </div>
    </div>
  )
}
