import React from 'react'
import Image from 'next/image'
import CreateForm from './create-form'
import { AuthUser } from '@/app/lib/definitions'

export default function CreateCard({ user }: { user: AuthUser }) {
  return (
    <div className='w-full bg-primary py-3 px-4 rounded-xl shadow-card'>
      <h2 className='font-semibold pb-3 text-xs border-b border-secondary'>
        Tweet something
      </h2>
      <div className='flex pt-3 gap-3'>
        <Image src={user?.photo || '/user-icon.png'} width={40} height={40} className={`bg-background max-h-[40px] rounded-lg ${!user?.photo ? "p-1" : ""}`} alt='User profile picture' />
        <CreateForm userId={user._id}/>
      </div>
    </div>
  )
}
