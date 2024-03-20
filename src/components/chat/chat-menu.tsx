'use client'

import React, { ReactNode } from 'react'
import { MdClose, MdMenu } from 'react-icons/md'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function ChatMenu({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams)
  const menuOpen = params.has('menu')

  const handleClick = () => {
    if (params.has('menu')) {
      params.delete('menu')
    } else {
      params.set('menu', 'open')
    }

    router.push(`${pathname}?${params.toString()}`)
  }
  
  return (
    <section className={`bg-[#120F13] p-4 md:w-[30%] w-full h-full md:max-w-[324px] 
    absolute transition-all ${!menuOpen ? '-left-[85%]' : 'left-0'} max-w-[85%] md:static`}>
      <div className='h-full flex flex-col'>
        {children}
        <button 
          onClick={handleClick} 
          className={`md:hidden w-fit text-[rgb(var(--foreground-rgb))] absolute transition-opacity hover:opacity-80 -top-1 p-2 rounded-xl 
          mt-3 left-full ${!menuOpen ? 'ml-3' : 'bg-[#120F13] ml-1.5 shadow-[0px_4px_4px_0px_#00000040]'}`}
        >
          {!menuOpen ? (
            <MdMenu size={30}/>
          ) : (
            <MdClose size={30}/>
          )}
        </button>
      </div>
    </section>
  )
}
