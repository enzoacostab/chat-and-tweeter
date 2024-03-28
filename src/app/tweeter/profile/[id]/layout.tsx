import { getUserById } from '@/app/lib/data'
import Nav from '@/components/tweeter/nav'
import UserCard from '@/components/tweeter/profile/user-card'
import Image from 'next/image'
import React, { ReactNode } from 'react'

export default async function Layout({ 
  children, 
  params 
}: { 
  children: ReactNode ,
  params: { id: string }
}) {
  const userId = params.id;
  const user = await getUserById(userId)

  return (
    <div className='flex items-center flex-col'>
      <Image src={user.header} width={1920} height={300} alt='header image' className='w-full h-[300px] bg-placeholder object-cover'/>
      <UserCard user={user}/>
      <div className='flex w-full flex-col py-10 md:px-10 px-5 gap-5 md:flex-row justify-center'>
        <Nav page1='tweets' page2='tweets & replies' page3='media' page4='likes' />
        {children}
      </div>
    </div>
  )
}
