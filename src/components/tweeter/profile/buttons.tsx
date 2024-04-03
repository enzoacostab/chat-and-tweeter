'use client'

import { formatNumber } from '@/app/lib/utils'
import React, { useRef, useState } from 'react'
import UsersCard from '../users-card';

export default function Buttons({ user, userId }: any) {
  const [modal, setModal] = useState('')
  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleClick = (string: string) => {
    setModal(string)
    dialogRef.current?.showModal()
  }

  return (
    <>
      <button onClick={() => handleClick('following')} className='font-medium text-text'>
        <span className='font-semibold mr-1 text-foreground'>
          {formatNumber(user?.following.length)}
        </span>
        Following 
      </button>
      <button onClick={() => handleClick('followers')} className='font-medium text-text'>
        <span className='font-semibold mr-1 text-foreground'>
          {formatNumber(user?.followers.length)}
        </span>
        Followers 
      </button>
      <dialog ref={dialogRef}>
        <div className='m-0 fixed justify-center items-center size-full right-0 flex px-5 z-50 top-0 bg-black bg-opacity-30'>
          <div className='sm:w-[70%] lg:w-[50%] min-h-[600px] relative w-full'>
            <UsersCard 
              title={modal}
              users={modal === 'following' ? user?.following : user?.followers} 
              userId={userId} 
              dialogRef={dialogRef}/>
          </div>
        </div>
      </dialog>
    </>
  )
}
