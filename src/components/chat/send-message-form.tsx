'use client'

import { createMessage } from '@/app/lib/actions/message'
import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { MdSend } from 'react-icons/md'
import { toast } from 'sonner'

export default function SendMessageForm({ channelId }: { channelId?: string }) {
  const [errorMessage, dispatch] = useFormState(createMessage, undefined)
  const [content, setContent] = useState('')

  useEffect(() => {
    if  (errorMessage) {
      toast.error(errorMessage)
    }
  }, [errorMessage])
  
  const handleSubmit = () => {
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} action={dispatch} className='mt-auto'>
      <label className='bg-secondary p-1 pl-4 gap-4 flex items-center justify-between rounded-xl'>
        <input 
          value={content}
          onChange={({ target }) => setContent(target.value)}
          name='content' 
          className='bg-transparent text-text placeholder:text-placeholder w-full focus-visible:outline-none text-sm font-medium' 
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
