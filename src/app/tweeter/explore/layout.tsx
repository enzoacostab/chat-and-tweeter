import Nav from '@/components/tweeter/nav'
import React, { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col gap-5 py-10 md:px-10 px-5 md:flex-row justify-center'>
      <Nav filter1='top' filter2='latest' filter3='people' filter4='media'/>
      {children}
    </div>
  )
}
