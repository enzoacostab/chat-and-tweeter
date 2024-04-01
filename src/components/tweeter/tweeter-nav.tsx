'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { MdBookmark, MdExplore, MdHome } from 'react-icons/md'

export default function TweeterNav() {
  const pathname = usePathname()

  const style = (string: string) => {
    if (pathname.includes(string)) {
      return 'border-b-[#2F80ED] text-[#2F80ED] font-semibold'
    } else {
      return 'hover:text-foreground border-b-transparent'
    }
  }

  return (
    <nav className='bg-primary pt-3 text-sm text-text mt-auto font-medium'>
      <ul className='flex gap-5 h-full justify-evenly *:border-b-2 *:pb-4 *:rounded-sm *:px-3 *:transition-colors'>
        <li className={style('home')}>
          <Link href={'/tweeter/home'}>
            <span className='hidden md:block'>Home</span>
            <MdHome size={24} className='md:hidden'/>
          </Link>
        </li>
        <li className={style('explore')}>
          <Link href={{
            pathname: '/tweeter/explore',
            query: { filter: 'top' }
          }}>
            <span className='hidden md:block'>Explore</span>
            <MdExplore size={24} className='md:hidden'/>
          </Link>
        </li>
        <li className={style('bookmarks')}>
          <Link href={{
            pathname: '/tweeter/bookmarks',
            query: { filter: 'tweets' }
          }}>
            <span className='hidden md:block'>Bookmarks</span>
            <MdBookmark size={24} className='md:hidden'/>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
