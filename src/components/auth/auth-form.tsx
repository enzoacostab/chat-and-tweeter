'use client'

import React, { useEffect } from 'react'
import { MdHttps, MdMail, MdPeople } from "react-icons/md";
import { useFormState } from 'react-dom'
import { authenticate, createUser } from '@/app/lib/actions/user'
import SubmitButton from './submit-button';
import { toast } from 'sonner';

export default function AuthForm({ isRegister }: { isRegister: boolean }) {
  const [errorMessage, dispatch] = useFormState(isRegister ? createUser : authenticate, undefined)
  
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
    }
  }, [errorMessage])

  return (
    <form className="w-full" action={dispatch}>
      <label className="flex items-center gap-2 p-3 border border-placeholder rounded-lg">
        <MdMail color="#828282" size={24}/>
        <input 
          autoComplete='off' 
          name="email" 
          className="placeholder:text-[#828282] w-full focus-visible:outline-none bg-transparent" 
          placeholder="Email" 
          required 
          type="email"
        />
      </label>
      {isRegister ? 
      <>
        <label className="flex mt-3 items-center gap-2 p-3 border border-placeholder rounded-lg">
          <MdPeople color="#828282" size={24}/>
          <input 
            autoComplete='off' 
            name="name" 
            className="placeholder:text-[#828282] w-full focus-visible:outline-none bg-transparent" 
            placeholder="Username" 
            required
            type="text"
          />
        </label>
      </> : null}
      <label className="flex mt-3 items-center gap-2 p-3 border border-placeholder rounded-lg">
        <MdHttps color="#828282" size={24}/>
        <input 
          name="password" 
          className="placeholder:text-[#828282] w-full focus-visible:outline-none bg-transparent" 
          placeholder="Password" 
          required 
          type="password"
        />
      </label>
      <SubmitButton isRegister={isRegister}/>
    </form>
  )
}
