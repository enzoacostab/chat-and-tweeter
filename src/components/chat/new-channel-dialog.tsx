import React, { Dispatch, SetStateAction, useState } from 'react'
import { createChannel } from '@/app/lib/actions/channel'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'

export default function NewChannelDialog({
  open,
  setOpen
}: {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [errorMessage, dispatch] = useFormState(createChannel, undefined)

  if (errorMessage) toast.error(errorMessage)

  return (
    <dialog open={open} className='bg-black justify-center items-center absolute w-screen h-screen z-10 bg-opacity-20 top-0 left-0'>
      <div onClick={() => setOpen(false)} className='size-full'></div>
      <form action={dispatch} className='md:h-fit h-full p-10 md:rounded-3xl text-[#F2F2F2] font-medium absolute md:w-[40%] w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 bg-[#120F13]'>
        <h2 className='uppercase text-lg font-bold'>New Channel</h2>
        <input required className='bg-[#3C393F] p-3 focus-visible:ring-1 focus-visible:outline-none ring-white rounded-lg w-full placeholder:text-[#828282] mt-5' placeholder='Channel name' type="text" name='name'/>
        <textarea rows={3} className='bg-[#3C393F] focus-visible:ring-1 focus-visible:outline-none ring-white p-3 rounded-lg w-full resize-none placeholder:text-[#828282] mt-5' placeholder='Channel Description' name='description'/>
        <div className='ml-auto block w-fit'>
          <button type='reset' onClick={() => setOpen(false)} className='px-5 py-2 hover:text-red-700 mt-5 inline transition-colors text-lg text-[#828282] rounded-lg'>cancel</button>
          <button type='submit' onClick={() => setOpen(false)} className='px-5 py-2 bg-[#2F80ED] opacity-90 hover:opacity-100 mt-5 ml-5 inline transition-opacity text-lg rounded-lg'>save</button>
        </div>
      </form>
    </dialog>
  )
}
