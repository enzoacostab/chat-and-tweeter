'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Nav({
  page1,
  page2,
  page3,
  page4
}: {
  page1: string,
  page2: string,
  page3: string,
  page4: string
}) {
  const p2 = page2.split(' & ').join('-')
  const pathname = usePathname()
  const style = (string: string) => {
    if (pathname.endsWith(string)) {
      return 'border-l-2 border-[#2F80ED] text-[#2F80ED]'
    }
  }

  return (
    <ul className='bg-primary capitalize text-[#828282] h-fit w-full md:max-w-[300px] py-2 *:rounded-sm rounded-lg *:pl-4 *:py-1 *:my-2 text-sm font-semibold'>
      <li className={style(page1)}>
        <Link href={page1}>{page1}</Link>
      </li>
      <li className={style(p2)}>
        <Link href={p2}>{page2}</Link>
      </li>
      <li className={style(page3)}>
        <Link href={page3}>{page3}</Link>
      </li>
      <li className={style(page4)}>
        <Link href={page4}>{page4}</Link>
      </li>
    </ul>
  )
}
