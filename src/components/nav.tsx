import React from 'react'
import Link from 'next/link'
import { MdAccountCircle, MdPeople, MdSettings } from 'react-icons/md'
import LogoutButton from './home/logout-button'
import { TweeterIcon } from '../app/icons'

export default function Nav({ 
  position,
  userId
}: {
  position: "top" | "bottom" 
  userId: string
}) {
  return (
    <nav 
      className={`flex z-10 shadow-[0px_2px_4px_0px_#0000000D] text-foreground 
      flex-col border border-secondary rounded-lg *:rounded-lg bg-primary 
      *:py-2 *:transition-colors animate-appear *:flex *:items-center *:gap-3 
      *:pl-3 *:pr-10 p-3 *:text-nowrap gap-2 absolute right-0 *:text-xs *:font-medium 
      hover:*:bg-background ${position==='bottom' ? 'top-12' : 'bottom-12'}`}
    >
      <Link href={{
        pathname: `/tweeter/profile/${userId}`,
        query: { filter: 'tweets' }
      }}>
        <MdAccountCircle size={20}/> 
        My Profile
      </Link>
      <Link href='/chat/channels'>
        <MdPeople size={20}/>
        Group Chat
      </Link>
      <Link href='/tweeter/home'>
        <TweeterIcon/>
        Tweeter
      </Link>
      <Link href='/'>
        <MdSettings size={20}/> 
        Settings
      </Link>
      <div id='separator'></div>
      <LogoutButton/>
    </nav>
  )
}
