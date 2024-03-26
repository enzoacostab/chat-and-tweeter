'use client'

import { likeTweet } from '@/app/lib/actions/tweet'
import { TweetType, UserType } from '@/app/lib/definitions'
import { formatNumber } from '@/app/lib/utils'
import Image from 'next/image'
import React, { useState } from 'react'
import { MdBookmarkBorder, MdFavoriteBorder, MdLoop, MdModeComment, MdOutlineImage } from 'react-icons/md'

export default function UpdateForm({ tweet, user }: { tweet: TweetType, user: UserType }) {
  const [showComments, setShowComments] = useState(false)
  
  return (
    <>
      <div className='*:flex hover:*:bg-background *:transition-colors *:px-5 *:rounded-lg *:h-full *:gap-2 *:items-center py-1 
      *:py-3 border-y mt-1 border-y-background text-sm font-medium flex justify-around items-center'>
        <button onClick={() => setShowComments(prev => !prev)}>
          <MdModeComment size={20}/>
          <span className='hidden sm:block'>Comment</span>
        </button>
        <button>
          <MdLoop size={20}/>
          <span className='hidden sm:block'>Retweet</span>
        </button>
        <button onClick={async () => await likeTweet(user._id, tweet._id)}>
          <MdFavoriteBorder size={20}/>
          <span className='hidden sm:block'>Like</span>
        </button>
        <button>
          <MdBookmarkBorder size={20}/>
          <span className='hidden sm:block'>Save</span>
        </button>
      </div>
      <div className='flex gap-2 mt-2'>
        <Image src={user?.photo || ''} width={40} height={40} className='h-[40px] w-[40px] rounded-lg bg-background' alt='Tweet user profile photo' />
        <label className='w-full bg-background border border-secondary rounded-lg flex px-3 gap-3 items-center'>
          <input type='text' placeholder='Tweet your reply' className='placeholder:text-placeholder outline-none w-full bg-transparent'/>
          <MdOutlineImage className='text-placeholder' size={20}/>
        </label>
      </div>
      <ul className={`mt-2 pt-3 border-t border-y-background transition-all ${!showComments ? 'relative h-0 overflow-hidden opacity-0' : ''}`}>
        {tweet.comments?.map((comment: any) => 
          <li key={comment._id} className='flex gap-2 mt-3'>
            <Image src={comment.user?.photo || ''} width={40} height={40} className='h-[40px] w-[40px] rounded-lg bg-background' alt='Tweet user profile photo' />
            <div className='w-full'>
              <div className='bg-background rounded-lg p-3'>
                <p className='font-medium text-sm'>
                  {comment.user.name}
                  <span className='text-placeholder ml-3 text-xs'>{comment.createdAt.toDateString()}</span>
                </p>
                <p className='text-text mt-1'>
                  {comment.text}
                </p>
              </div>
              <div className='flex gap-2 mt-1 text-placeholder font-semibold text-xs'>
                <button className='flex items-center gap-1'>
                  <MdFavoriteBorder size={16}/>
                  Like
                </button>
                ·
                <span>
                  {formatNumber(comment.likesCount)} Likes
                </span>
              </div>
            </div>
          </li>  
        )}
      </ul>
    </>
  )
}
