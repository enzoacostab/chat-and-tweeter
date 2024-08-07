import Image from 'next/image'
import React, { Dispatch, SetStateAction } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import { toast } from 'sonner'

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
      <Image src={image || '/user-icon.png'} width={32} height={32} className={`rounded-lg bg-background ${!image ? "p-1" : ""}`} alt="Profile" />
      <p className={className ? className : 'font-bold text-xs text-nowrap ml-6 hidden md:block mr-3'}>{name}</p>
      {func ? <MdArrowDropDown className={`${menuOpen ? 'rotate-180' : ''} transition-all ${!className && 'hidden md:block'}`} size={24} /> : null}
    </div>
  )
}
