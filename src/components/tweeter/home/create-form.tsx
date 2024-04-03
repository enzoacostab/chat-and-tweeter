'use client'

import React, { useRef, useState, useTransition } from 'react'
import { MdClose, MdOutlineImage } from 'react-icons/md'
import ReplySelect from './reply-select'
import { useFormState, useFormStatus } from 'react-dom'
import { createTweet } from '@/app/lib/actions/tweet'
import { uploadImage } from '@/app/lib/actions/user'
import Image from 'next/image'

export default function CreateForm({ userId }: { userId: string }) {
  const [text, setText] = useState<string>('')
  const [image, setImage] = useState<string>()
  const [pending, startTransition] = useTransition()
  const divRef = useRef<HTMLDivElement>(null)
  const [errorMessage, dispatch] = useFormState(createTweet, undefined)
  
  const handleChange = ({ target }: {target: HTMLInputElement}) => {
    const file = target?.files?.[0]
    if (!file) return;

    let form = new FormData();
    form.append("fileUpload", file);
    
    startTransition(async () => {
      const newImage = await uploadImage(form)
      setImage(newImage)
    })
  };

  const handleSubmit = () => {
    if (divRef.current) {
      divRef.current.textContent = ''
    }
    setText('')
    setImage(undefined)
  }

  return (
    <form onSubmit={handleSubmit} action={dispatch} className='h-full w-[90%] relative'>
      <div 
        ref={divRef}
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
      {image && (
        <div className='relative'>
          <Image 
            src={image || ''} 
            width={500} 
            height={200} 
            alt='comment image' 
            className='w-full max-h-[200px] h-auto rounded-lg object-cover'
          />
          <button 
            type='button' 
            onClick={() => setImage(undefined)} 
            className='rounded-full p-2 bg-primary opacity-70 hover:opacity-90 absolute top-2 right-2 transition-opacity'
          >
            <MdClose size={20}/>            
          </button>
          <input type='hidden' value={image} name="media" />
        </div>
        )}
      <div className='flex items-center mt-7 -ml-12 md:ml-0'>
        <label className='cursor-pointer ml-2'> 
          <MdOutlineImage 
            className={`${pending ? 'opacity-80' : 'text-[#2F80ED] hover:opacity-95 transition-opacity'}`} 
            size={20}
          />
          <input 
            disabled={pending} 
            onChange={handleChange} 
            type="file" 
            className='hidden'
            accept='image/*'
          />
        </label> 
        <ReplySelect/>
        <SubmitButton/>
      </div>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} type='submit' className='ml-auto bg-[#2F80ED] disabled:opacity-80 hover:opacity-90 text-white rounded-md px-5 py-2 font-medium text-xs'>
      Tweet
    </button>
  )
}
