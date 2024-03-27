import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { uploadImage } from '@/app/lib/actions/user'
import { MdClose, MdOutlineImage } from 'react-icons/md'
import { useFormState } from 'react-dom'
import { createComment } from '@/app/lib/actions/comment'
import { toast } from 'sonner'

export default function CommentForm({ 
  pending, 
  startTransition,
  userId,
  tweetId
}: { 
  pending: boolean, 
  startTransition: React.TransitionStartFunction
  userId: string,
  tweetId: string
}) {
  const [image, setImage] = useState<string>()
  const [text, setText] = useState<string>('')
  const [errorMessage, dispatch] = useFormState(createComment, undefined)

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
    setText('')
    setImage(undefined)
  }

  if (errorMessage) {
    toast.error(errorMessage)
  }

  return (
    <form onSubmit={handleSubmit} action={dispatch} className='flex gap-2 mt-2'>
      <div className='w-full bg-background border border-secondary rounded-lg flex flex-col justify-between px-3 py-2 gap-4'>
        <div className='flex w-full items-center'>
          <input 
            value={text}
            onChange={({ target }) => setText(target.value)}
            type='text'
            autoComplete='off' 
            name='text' 
            placeholder='Tweet your reply' 
            className='placeholder:text-placeholder outline-none w-full bg-transparent'
          />
          <label className='cursor-pointer ml-2'> 
            <MdOutlineImage className={`${pending ? 'text-placeholder' : 'text-placeholder hover:text-text transition-colors'} `} size={20}/>
            <input 
              disabled={pending} 
              onChange={handleChange} 
              type="file" 
              className='hidden'
              accept='image/*'
            />
          </label> 
        </div>
        {image && (
          <div className='relative'>
            <Image src={image || ''} width={500} height={100} alt='comment image' className='w-full max-h-[200px] h-auto rounded-lg object-cover'/>
            <button type='button' onClick={() => setImage(undefined)} className='rounded-full p-2 bg-primary opacity-70 hover:opacity-90 absolute top-2 right-2 transition-opacity'>
              <MdClose size={20}/>            
            </button>
            <input type='hidden' value={image} name="media" />
          </div>
        )}
      </div>
      <input type='hidden' value={userId} name="user" />
      <input type='hidden' value={tweetId} name="tweetId" />
    </form>
  )
}
