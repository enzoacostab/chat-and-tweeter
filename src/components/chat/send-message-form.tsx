'use client'

import { createMessage } from '@/app/lib/actions/message-actions'
import React, { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { MdSend } from 'react-icons/md'
import { toast } from 'sonner'

export default function SendMessageForm({ channelId }: { channelId?: string }) {
  const [errorMessage, dispatch] = useFormState(createMessage, undefined)
  
  useEffect(() => {
    if  (errorMessage) {
      toast.error(errorMessage)
    }
  }, [errorMessage])
  
  return (
    <form action={dispatch} className='mt-auto'>
      <label className='bg-[#3C393F] p-1 pl-4 gap-4 flex items-center justify-between rounded-xl'>
        <input 
          name='content' 
          className='bg-transparent placeholder:text-[#828282] w-full focus-visible:outline-none text-sm font-medium' 
          placeholder='Type a message here' 
          type="text" 
          autoComplete='off'
        />
        <input name='channelId' value={channelId as string || ''} type="hidden"/>
        <button className='bg-[#2D9CDB] p-3 rounded-lg hover:opacity-90'>
          <MdSend />
        </button>
      </label>
    </form>
  )
}
