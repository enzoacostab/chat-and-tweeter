'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import NewChannelDialog from './new-channel-dialog'
import { ChannelType } from '@/app/lib/definitions'
import { addMember } from '@/app/lib/actions/channel'
import { toast } from 'sonner'

export default function Channels({ 
  channels, 
  params 
}: { 
  channels?: ChannelType[], 
  params?: string[][]
}) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  
  if (!channels) toast.error('Failed to fetch channels')

  const handleClick = async (channelId: string) => {
    const formData = new FormData()
    formData.append('channelId', channelId)
    const errorMessage: undefined | string = await addMember(undefined,  formData)

    if (errorMessage) {
      toast.error(errorMessage)
    } else {
      router.push(`/chat/channel/${channelId}?${params?.map((param: string[]) => `${param[0]}=${param[1]}&`).join('')}`)
    }
  }

  return (
    <div className='px-4'>
      <div className='flex justify-between items-center'>
        <h2 className='w-fit text-[#E0E0E0]'>Channels</h2>
        <button onClick={() => setOpen(true)} className='flex w-fit items-center rounded-lg bg-[#252329] p-2 hover:brightness-125'><MdAdd size={24}/></button>
      </div>
      <ul>
        {channels?.map((channel: ChannelType) => ( 
          <li onClick={async () => await handleClick(channel._id)} key={channel._id} className='mt-5 flex items-center rounded-lg hover:brightness-125 transition-all p-1.5 cursor-pointer'>
            <div className='bg-[#252329] p-2 w-fit font-semibold rounded-lg text-[#FFFFFF]'>{channel.name.split(' ').map((e: string) => e[0].toUpperCase()).join('')}</div>
            <p className=' text-[#BDBDBD] ml-3 uppercase'>{channel.name}</p>
          </li>
        ))}
      </ul>
      <NewChannelDialog setOpen={setOpen} open={open}/>
    </div>
  )
}
