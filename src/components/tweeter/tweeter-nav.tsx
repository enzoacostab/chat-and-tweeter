'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function TweeterNav() {
  const pathname = usePathname()
  const style = 'border-b-[#2F80ED] text-[#2F80ED] font-semibold'

  return (
    <nav className='mt-auto text-sm pt-4 font-medium hidden sm:block'>
      <ul className='flex gap-5 h-full *:pb-4 *:rounded-sm *:px-3 *:transition-colors *:border-b-2'>
        <li className={`${pathname.includes('/home') ? style : 'border-b-transparent'}`}>
          <Link href={'/tweeter/home'}>
            Home
          </Link>
        </li>
        <li className={`${pathname.includes('/explore') ? style : 'border-b-transparent'}`}>
          <Link href={'/tweeter/explore'}>
          Explore
          </Link>
        </li>
        <li className={`${pathname.includes('/bookmarks') ? style : 'border-b-transparent'}`}>
          <Link href={'/tweeter/bookmarks'}>
          Bookmarks
          </Link>
        </li>
      </ul>
    </nav>
  )
}
