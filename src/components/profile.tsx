import Image from 'next/image'
import React, { Dispatch, SetStateAction } from 'react'
import { MdArrowDropDown } from 'react-icons/md'

export default function Profile({ 
  className,
  func, 
  image,
  name,
  menuOpen
}: { 
  className?: string
  func?: Dispatch<SetStateAction<boolean>>, 
  image?: string, 
  name?: string ,
  menuOpen?: boolean
}) {
  return (
    <div onClick={func ? () => func(prev => !prev) : undefined} className='flex items-center cursor-pointer hover:opacity-90 transition-opacity p-2'>
      <Image src={image || ''} width={32} height={32} className='rounded-lg' alt="Profile" />
      <p className={className ? className : 'font-bold text-xs text-nowrap ml-6 hidden sm:block mr-3'}>{name}</p>
      {func ? <MdArrowDropDown className={`${menuOpen ? 'rotate-180' : ''} transition-all ${!className && 'hidden sm:block'}`} size={24} /> : null}
    </div>
  )
}
