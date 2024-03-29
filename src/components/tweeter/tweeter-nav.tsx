'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function TweeterNav() {
  const pathname = usePathname()

  const style = (string: string) => {
    if (pathname.includes(string)) {
      return 'border-b-2 border-b-[#2F80ED] text-[#2F80ED] font-semibold'
    } else {
      return 'hover:text-foreground'
    }
  }

  return (
    <nav className='mt-auto text-sm text-[#828282] pt-4 font-medium hidden md:block'>
      <ul className='flex gap-5 h-full *:pb-4 *:rounded-sm *:px-3 *:transition-colors'>
        <li className={style('home')}>
          <Link href={'/tweeter/home'}>
            Home
          </Link>
        </li>
        <li className={style('explore')}>
          <Link href={'/tweeter/explore'}>
          Explore
          </Link>
        </li>
        <li className={style('bookmarks')}>
          <Link href={'/tweeter/bookmarks'}>
          Bookmarks
          </Link>
        </li>
      </ul>
    </nav>
  )
}
