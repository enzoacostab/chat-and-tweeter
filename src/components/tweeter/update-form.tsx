'use client'

import { like, retweet, save, dislike, unretweet, unsave } from '@/app/lib/actions/tweet'
import { CommentType, TweetType, UserType } from '@/app/lib/definitions'
import { formatNumber } from '@/app/lib/utils'
import Image from 'next/image'
import React, { useState, useTransition } from 'react'
import { MdBookmarkBorder, MdFavoriteBorder, MdLoop, MdOutlineModeComment } from 'react-icons/md'
import CommentForm from './comment-form'

export default function UpdateForm({ tweet, user }: { tweet: TweetType, user: UserType }) {
  const [showComments, setShowComments] = useState(true)
  const isLikedByUser = tweet.likes?.includes(user._id)
  const isSavedByUser = tweet.saved?.includes(user._id) 
  const isRetweetedByUser = tweet.retweets?.includes(user._id)
  const [pending, startTransition] = useTransition()

  const handleClick = (action: string) => {
    startTransition(async () => {
      switch (action) {
        case 'like': 
          if (isLikedByUser) {
            await dislike(tweet._id, user._id)
          } else {
            await like(tweet._id, user._id)
          }
          break
        case 'retweet': 
          if (isRetweetedByUser) {
            await unretweet(tweet._id, user._id)
          } else {
            await retweet(tweet._id, user._id)
          }
          break

        case 'save': 
          if (isSavedByUser) {
            await unsave(tweet._id, user._id)
          } else {
            await save(tweet._id, user._id)
          }
          break
      }
    })
  }

  return (
    <>
      <div className='*:flex text-text hover:*:bg-background *:transition-colors *:px-5 *:rounded-lg *:h-full *:gap-2 *:items-center py-1 
        *:py-3 border-y mt-1 border-y-background text-sm font-medium flex justify-around items-center disabled:*:bg-transparent'>
        <button onClick={() => setShowComments(prev => !prev)}>
          <MdOutlineModeComment size={20}/>
          <span className='hidden sm:block'>Comment</span>
        </button>
        <button 
          disabled={pending} 
          className={isRetweetedByUser ? 'text-[#27AE60]' : ''} 
          onClick={() => handleClick('retweet')}
        >
          <MdLoop size={20}/>
          <span className='hidden sm:block'>Retweet</span>
        </button>
        <button 
          disabled={pending} 
          className={isLikedByUser ? 'text-[#EB5757]' : ''} 
          onClick={() => handleClick('like')}
        > 
          <MdFavoriteBorder size={20}/>
          <span className='hidden sm:block'>Like</span>
        </button>
        <button 
          disabled={pending} 
          className={isSavedByUser ? 'text-[#2D9CDB]' : ''}
          onClick={() => handleClick('save')}
        >
          <MdBookmarkBorder size={20}/>
          <span className='hidden sm:block'>Save</span>
        </button>
      </div>
      <Image src={user?.photo || ''} width={40} height={40} className='h-[40px] w-[40px] float-left mr-3 mt-2 rounded-lg bg-background' alt='Tweet user profile photo' />
      <CommentForm userId={user._id} tweetId={tweet._id} pending={pending} startTransition={startTransition}/>
      <ul className={`mt-2 pt-3 border-t border-y-background transition-all ${!showComments ? 'relative h-0 overflow-hidden opacity-0' : ''}`}>
        {tweet.comments?.map((comment: CommentType) => 
          <li key={comment._id} className='flex gap-2 mt-3'>
            <Image src={comment.user?.photo || ''} width={40} height={40} className='h-[40px] w-[40px] rounded-lg bg-background' alt='Tweet user profile photo' />
            <div className='w-full'>
              <div className='bg-background2 rounded-lg p-3'>
                <p className='font-medium text-sm'>
                  {comment.user.name}
                  <span className='text-placeholder ml-3 text-xs'>{comment.createdAt.toDateString()}</span>
                </p>
                <p className='text-text mt-1'>
                  {comment.text}
                </p>
                {comment.media && ( 
                  <Image src={comment.media} width={500} height={100} alt='comment image' className='w-full mt-3 max-h-[200px] h-auto rounded-lg object-cover'/>
                )}
              </div>
              <div className='flex gap-2 mt-1 text-placeholder font-semibold text-xs'>
                <button className='flex hover:text-text items-center gap-1'>
                  <MdFavoriteBorder size={16}/>
                  Like
                </button>
                ·
                <span>
                  {formatNumber(comment.likes.length)} Likes
                </span>
              </div>
            </div>
          </li>  
        )}
      </ul>
    </>
  )
}
