'use client'

import React, { useState } from 'react'
import { MdImage, MdOutlineImage } from 'react-icons/md'
import WhoReply from './who-reply'

export default function TweeterHomeForm() {
  const [text, setText] = useState<string>('')
  
  return (
    <form className='h-full w-[90%] relative'>
      <div 
        onInput={({currentTarget}) => setText(currentTarget?.textContent ?? '')} 
        contentEditable={true} 
        className={`h-auto w-full ${text ? 'static' : 'absolute'} outline-none mb-4`}
      />
      <p className={`text-[#BDBDBD] ${text ? 'hidden' : 'block'} mb-4`}>
        What’s happening?
      </p>
      <input 
        type='hidden' 
        value={text} 
        name='text'
      />
      <div className='flex items-center'>
        <button className='text-[#2F80ED]'><MdOutlineImage size={20}/></button>
        <WhoReply/>
        <button type='submit' className='ml-auto bg-[#2F80ED] rounded-md px-5 py-2 font-medium text-xs'>
          Tweet
        </button>
      </div>
    </form>
  )
}
