import Nav from '@/components/tweeter/nav'
import UserCard from '@/components/tweeter/profile/user-card'
import Image from 'next/image'
import React, { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  const user = {
    _id: 'trg',
    name: 'Daniel Jensen',
    photo: '/vercel.svg',
    followers: 123123,
    following: 123214124,
    bio: 'Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰',
    header: '/green-bg.png'
  }

  return (
    <div className='flex items-center flex-col'>
      <Image src={user.header} width={1920} height={300} alt='header image' className='w-full max-h-[300px] object-cover'/>
      <UserCard user={user}/>
      <div className='flex w-full flex-col py-10 md:px-10 px-5 gap-5 md:flex-row justify-center'>
        <Nav page1='tweets' page2='tweets & replies' page3='media' page4='likes' />
        {children}
      </div>
    </div>
  )
}
