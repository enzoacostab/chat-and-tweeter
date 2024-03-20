import React from 'react'
import Profile from '@/components/profile'
import { UserType } from '@/app/lib/definitions'
import { getChannel } from '@/app/lib/data';
import Link from 'next/link';
import { MdArrowBackIos } from 'react-icons/md';

export default async function page({ 
  params, 
  searchParams 
}: { 
  params: { id: string } 
  searchParams: { menu: string }
}) {
  const { id } = params
  const channel = await getChannel(id)
  const sParams = Object.entries(searchParams).map((param: string[]) => `${param[0]}=${param[1]}&`)
  
  return (
    <div>
      <Link href={`/chat/channels?${sParams}`} className='flex w-fit hover:opacity-80 transition-opacity items-center gap-2'>
        <MdArrowBackIos/>
        All channels
      </Link>
      <h2 className='uppercase ml-4 mt-10'>{channel?.name}</h2>
      <p className='font-normal ml-4 mt-4'>{channel?.description}</p>
      <h2 className='mt-10 ml-4'>MEMBERS</h2>
      <ul className='ml-4'>
        {channel?.members.map((member: UserType) => ( 
          <li key={member._id} className='mt-5'>
            <Profile className='text-lg font-bold text-[#828282] ml-6 capitalize' name={member.name} image={member.photo}/>
          </li>
        ))}
      </ul>
    </div>
  )
}