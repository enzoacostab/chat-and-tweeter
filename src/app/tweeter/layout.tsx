import React, { ReactNode } from 'react'
import TweeterHeader from '@/components/tweeter/tweeter-header'
import TweeterNavMobile from '@/components/tweeter/tweeter-nav-mobile'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-[100dvh] h-full'>
      <TweeterHeader/>
      <div className='py-10'>
        {children}
      </div>
      <TweeterNavMobile/>
    </div>
  )
}
