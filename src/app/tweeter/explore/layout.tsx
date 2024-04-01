import FilterSelect from '@/components/tweeter/filter-select'
import React, { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col h-full gap-5 py-10 md:px-10 px-5 md:flex-row justify-center'>
      <FilterSelect filter1='top' filter2='latest' filter3='people' filter4='media'/>
      {children}
    </div>
  )
}
