'use client'

import React, { useState } from 'react'
import { MdOutlineImage } from 'react-icons/md'
import ReplySelect from './reply-select'
import { useFormState, useFormStatus } from 'react-dom'
import { createTweet } from '@/app/lib/actions/tweet'

export default function CreateForm({ userId }: { userId: string }) {
  const [text, setText] = useState<string>('')
  const [errorMessage, dispatch] = useFormState(createTweet, undefined)
  
  return (
    <form action={dispatch} className='h-full w-[90%] relative'>
      <div 
        onInput={({currentTarget}) => setText(currentTarget?.textContent ?? '')} 
        contentEditable={true} 
        className={`h-auto w-full ${text ? 'static' : 'absolute'} outline-none mb-4`}
      />
      <p className={`text-placeholder ${text ? 'hidden' : 'block'} mb-4`}>
        What’s happening?
      </p>
      <input 
        type='hidden' 
        value={text} 
        name='text'
      />
      <input 
        type='hidden' 
        value={userId} 
        name='user'
      />
      <div className='flex items-center mt-7 -ml-12 md:ml-0'>
        <button className='text-[#2F80ED]'><MdOutlineImage size={20}/></button>
        <ReplySelect/>
        <SubmitButton/>
      </div>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} type='submit' className='ml-auto bg-[#2F80ED] disabled:opacity-80 text-white rounded-md px-5 py-2 font-medium text-xs'>
      Tweet
    </button>
  )
}
