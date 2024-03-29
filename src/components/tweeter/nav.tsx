'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export default function Nav({
  filter1,
  filter2,
  filter3,
  filter4
}: {
  filter1: string,
  filter2: string,
  filter3: string,
  filter4: string
}) {
  const f2 = filter2.split(' & ').join('-')
  const pathname = usePathname().split('/').at(-1)
  const path = pathname
  const searchParams = useSearchParams()
  const { push } = useRouter()

  const style = (string: string) => {
    if (searchParams.get('filter') === string) {
      return 'border-l-[#2F80ED] text-[#2F80ED]'
    }
  }

  const handleClick = (filter: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('filter', filter)
    push(`${pathname}?${params.toString()}`)
  }

  return (
    <ul className='bg-primary capitalize text-[#828282] h-fit w-full md:max-w-[300px] py-2 *:transition-colors
     *:border-l-2 *:border-l-transparent *:rounded-sm rounded-lg *:pl-4 *:py-1 *:my-2 text-sm font-semibold'>
      <li className={style(filter1)}>
        <button onClick={() => handleClick(filter1)}>{filter1}</button>
      </li>
      <li className={style(f2)}>
        <button onClick={() => handleClick(f2)}>{filter2}</button>
      </li>
      <li className={style(filter3)}>
        <button onClick={() => handleClick(filter3)}>{filter3}</button>
      </li>
      <li className={style(filter4)}>
        <button onClick={() => handleClick(filter4)}>{filter4}</button>
      </li>
    </ul>
  )
}
