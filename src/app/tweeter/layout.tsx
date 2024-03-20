import React, { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-[100dvh] h-full'>
      <header>

      </header>
      {children}
    </div>
  )
}
