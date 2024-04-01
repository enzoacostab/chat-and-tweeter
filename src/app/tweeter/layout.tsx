import React, { ReactNode } from 'react'
import TweeterHeader from '@/components/tweeter/tweeter-header'
import TweeterNav from '@/components/tweeter/tweeter-nav'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-[100dvh] h-full flex flex-col'>
      <TweeterHeader/>
      <div>
        {children}
      </div>
      <div className='md:hidden mt-auto sticky bottom-0'>
        <TweeterNav/>
      </div>
    </div>
  )
}
