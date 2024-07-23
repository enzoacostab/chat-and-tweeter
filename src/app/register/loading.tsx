import React from 'react'
import { LuLoader2 } from 'react-icons/lu'

export default function Loading() {
  return (
    <div className='h-dvh w-full flex justify-center items-center'>
      <LuLoader2 size={40} className='animate-spin'/>
    </div>
  )
}
