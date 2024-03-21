import { getUser } from '@/app/lib/data'
import TweeterHomeForm from '@/components/tweeter/home/tweeter-home-form'
import Image from 'next/image'
import React from 'react'

export default async function page() {
  const user = await getUser()
  return (
    <main className='flex p-10'>
      <section className='flex flex-col w-[60%] h-full'>
        <div className='w-full bg-primary p-3 rounded-xl'>
          <h2 className='font-semibold pb-3 text-xs border-b border-secondary'>Tweet something</h2>
          <div className='flex pt-3 gap-2'>
            <Image src={user?.photo!} width={40} height={40} className='max-h-[40px] rounded-lg' alt='User profile picture' />
            <TweeterHomeForm/>
          </div>
        </div>
      </section>

    </main>
  )
}
