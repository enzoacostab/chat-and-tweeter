'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { MdBookmark, MdExplore, MdHome } from 'react-icons/md'

export default function TweeterNavMobile() {
  const pathname = usePathname()
  const style = 'border-b-[#2F80ED] text-[#2F80ED] font-semibold'

  return (
    <nav className='fixed bottom-0 bg-primary w-full text-sm font-medium sm:hidden'>
      <ul className='flex gap-5 h-full justify-evenly *:py-5 *:rounded-sm *:px-5 *:transition-colors *:border-b-2'>
        <li className={`${pathname.includes('/home') ? style : 'border-b-transparent'}`}>
          <Link href={'/tweeter/home'}>
            <MdHome size={24}/>
          </Link>
        </li>
        <li className={`${pathname.includes('/explore') ? style : 'border-b-transparent'}`}>
          <Link href={'/tweeter/explore'}>
            <MdExplore size={24}/>
          </Link>
        </li>
        <li className={`${pathname.includes('/bookmarks') ? style : 'border-b-transparent'}`}>
          <Link href={'/tweeter/bookmarks'}>
            <MdBookmark size={24}/>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
