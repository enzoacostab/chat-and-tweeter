'use client'

import Image from 'next/image'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { LuLoader2 } from 'react-icons/lu'

export default function LoginProviderForm({ provider, func }:{ provider: string, func:  () => void }) {
  const [message, dispatch] = useFormState(func, undefined)

  return (
    <form action={dispatch}>
      <SubmitButton provider={provider}/>
    </form>
  )
}

function SubmitButton({ provider }:{ provider: string }) {
  const { pending } = useFormStatus()
  return (
    <button disabled={pending} className='justify-center items-center flex rounded-full'>
      {pending ? (
        <div className='border-[1.6px] size-[43px] rounded-full flex border-[#828282]'>
          <LuLoader2 size={20} className='m-auto animate-spin '/>
        </div>
      ) : (
        <Image src={`/${provider}.svg`} width={43} height={43} alt={`${provider} icon`}></Image>
      )}
    </button>
  )
}
