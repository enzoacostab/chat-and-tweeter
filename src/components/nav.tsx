import React from 'react'
import Link from 'next/link'
import { MdAccountCircle, MdPeople } from 'react-icons/md'
import LogoutButton from './home/logout-button'
import Image from 'next/image'
import { TweeterIcon } from '../app/icons'

export default function Nav({ position }: { position: "top" | "bottom" }) {
  return (
    <nav 
      className={`flex shadow-[0px_2px_4px_0px_#0000000D] text-foreground 
      flex-col border dark:border-zinc-600 rounded-lg *:rounded-lg bg-primary 
      *:py-2 *:transition-colors animate-appear *:flex *:items-center *:gap-3 
      *:pl-3 *:pr-10 p-3 *:text-nowrap gap-2 absolute right-0 *:text-xs *:font-medium 
      dark:hover:*:bg-[#2c2a32] hover:*:bg-[#E0E0E0] ${position==='bottom' ? 'top-12' : 'bottom-12'}`}
    >
      <Link href='/'>
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
      <div id='separator' className='dark:bg-zinc-600 bg-[#E0E0E0]'></div>
      <LogoutButton/>
    </nav>
  )
}
