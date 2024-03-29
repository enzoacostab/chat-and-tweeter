'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { MdBookmark, MdExplore, MdHome } from 'react-icons/md'

export default function TweeterNavMobile() {
  const pathname = usePathname()

  const style = (string: string) => {
    if (pathname.includes(string)) {
      return 'border-b-2 border-b-[#2F80ED] text-[#2F80ED] font-semibold'
    }
  }

  return (
    <nav className='fixed bottom-0 bg-primary w-full text-sm font-medium md:hidden'>
      <ul className='flex gap-5 h-full justify-evenly *:py-5 *:rounded-sm *:px-5 *:transition-colors'>
        <li className={style('home')}>
          <Link href={'/tweeter/home'}>
            <MdHome size={24}/>
          </Link>
        </li>
        <li className={style('explore')}>
          <Link href={'/tweeter/explore'}>
            <MdExplore size={24}/>
          </Link>
        </li>
        <li className={style('bookmarks')}>
          <Link href={'/tweeter/bookmarks'}>
            <MdBookmark size={24}/>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
