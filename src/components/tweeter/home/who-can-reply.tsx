import React, { MouseEvent, useState } from 'react'
import { MdPeople, MdPublic } from 'react-icons/md'

export default function WhoCanReply() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [whoCanReply, setWhoCanReply] = useState<string>('Everyone')

  const handleClick = (e: MouseEvent<HTMLLabelElement>) => {
    setWhoCanReply(e.currentTarget.textContent as string)
    setMenuOpen(false)
  }

  return (
    <div className='relative flex flex-col text-xs items-center justify-center'>
      <button type='button' onClick={() => setMenuOpen(prev => !prev)} className='ml-3 flex gap-2 text-[#2F80ED] items-center'>
        <MdPublic size={20}/>
        {whoCanReply} can reply
      </button>
      <div className={`absolute left-2 py-2 border border-secondary px-3 top-11 min-w-[240px] rounded-xl bg-primary transition-all ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <p className='font-semibold text-foreground'>Who can reply?</p>
        <p className='text-[#828282] mt-1'>Choose who can reply to this Tweet.</p>
        <div className='mt-2 *:text-center *:flex *:items-center *:transition-colors *:gap-3 hover:*:bg-background *:px-3 *:py-2 *:rounded-lg *:mt-1'> 
          <label onClick={handleClick}>
            <MdPublic size={20}/>
            Everyone
            <input 
              defaultChecked 
              type="radio" 
              name="whoCanReply" 
              value='everyone' 
              className='appearance-none'
            /> 
          </label>
          <label onClick={handleClick}>
            <MdPeople size={20}/>
            Only followers
            <input 
              type="radio" 
              name="whoCanReply" 
              value='only followers' 
              className='appearance-none'
            />
          </label>
        </div>
      </div>
    </div>
  )
}
