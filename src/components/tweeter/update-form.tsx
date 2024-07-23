'use client'

import { like, retweet, save, dislike, unretweet, unsave } from '@/app/lib/actions/tweet'
import { AuthUser, CommentType, TweetType } from '@/app/lib/definitions'
import { formatNumber } from '@/app/lib/utils'
import Image from 'next/image'
import React, { useState, useTransition } from 'react'
import { MdBookmarkBorder, MdFavoriteBorder, MdLoop, MdModeComment, MdOutlineModeComment } from 'react-icons/md'
import CommentForm from './comment-form'
import { dislikeComment, likeComment } from '@/app/lib/actions/comment'
import Link from 'next/link'

export default function UpdateForm({ tweet, user }: { tweet: TweetType, user: AuthUser }) {
  const [showComments, setShowComments] = useState(false)
  const isSavedByUser = tweet.saved?.includes(user._id) 
  const isLikedByUser = tweet.likes?.includes(user._id)
  const isRetweetedByUser = tweet.retweets?.includes(user._id)
  const withoutComments = tweet.comments?.length === 0 
  const [pending, startTransition] = useTransition()

  const handleUpdateTweet = (action: string) => {
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

  const handleUpdateComment = (isLiked: boolean, commentId: string) => {
    startTransition(async () => {
      if (isLiked) {
        await dislikeComment(commentId, user._id)
      } else {
        await likeComment(commentId, user._id)
      }
    })
  }

  return (
    <>
      <div className='*:flex text-text hover:*:bg-background *:transition-colors *:px-5 *:rounded-lg *:h-full *:gap-2 *:items-center py-1 
        *:py-3 border-y mt-1 border-y-background text-sm font-medium flex justify-around items-center disabled:*:bg-transparent'>
        <button className={withoutComments ? 'opacity-40' : ''} onClick={() => setShowComments(prev => !prev)}>
          {showComments 
            ? <MdModeComment size={20}/>
            : <MdOutlineModeComment size={20}/>}
          <span className='hidden sm:block'>Comment</span>
        </button>
        <button 
          disabled={pending} 
          className={isRetweetedByUser ? 'text-[#27AE60]' : ''} 
          onClick={() => handleUpdateTweet('retweet')}
        >
          <MdLoop size={20}/>
          <span className='hidden sm:block'>Retweet</span>
        </button>
        <button 
          disabled={pending} 
          className={isLikedByUser ? 'text-[#EB5757]' : ''} 
          onClick={() => handleUpdateTweet('like')}
        > 
          <MdFavoriteBorder size={20}/>
          <span className='hidden sm:block'>Like</span>
        </button>
        <button 
          disabled={pending} 
          className={isSavedByUser ? 'text-[#2D9CDB]' : ''}
          onClick={() => handleUpdateTweet('save')}
        >
          <MdBookmarkBorder size={20}/>
          <span className='hidden sm:block'>Save</span>
        </button>
      </div>
      <Image 
        src={user?.photo || '/user-icon.png'} 
        width={40} 
        height={40} 
        className={`h-[40px] w-[40px] float-left mr-3 mt-2 rounded-lg bg-background ${!user?.photo ? "p-1" : ""}`}
        alt='Tweet user profile photo' 
      />
      <CommentForm userId={user?._id} tweetId={tweet._id} pending={pending} startTransition={startTransition}/>
      {withoutComments ? (
        <p className={`transition-all text-center text-placeholder text-xs ${!showComments ? 'relative h-0 overflow-hidden opacity-0' : 'mt-5 mb-3'}`}>
          Without comments
        </p>
      ) : (
        <ul className={`transition-all ${!showComments ? 'relative h-0 overflow-hidden opacity-0' : 'mt-2 pt-3 border-t border-y-background'}`}>
          {tweet.comments?.map((comment: CommentType) => {
            const commentIsLiked = comment.likes?.includes(user._id)

            return (
              <li key={comment._id} className='flex gap-2 mt-3'>
                <Link href={{
                  pathname: `/tweeter/profile/${tweet.user._id}`,
                  query: { filter: "tweets" }
                }}>
                  <Image 
                    src={comment.user?.photo || ''} 
                    width={40} 
                    height={40} 
                    className='h-[40px] w-[40px] rounded-lg cursor-pointer bg-background' 
                    alt='Tweet user profile photo' 
                  />
                </Link>
                <div className='w-full'>
                  <div className='bg-background2 rounded-lg p-3'>
                    <p className='font-medium text-sm'>
                      <Link href={{
                        pathname: `/tweeter/profile/${tweet.user._id}`,
                        query: { filter: "tweets" }
                      }}>
                        <span className='cursor-pointer'>{comment.user?.name}</span>
                      </Link>
                      <span className='text-placeholder ml-3 text-xs'>{comment.createdAt?.toDateString()}</span>
                    </p>
                    <p className='text-text mt-1'>
                      {comment.text}
                    </p>
                    {comment.media && ( 
                      <Image src={comment.media} width={500} height={100} alt='comment image' className='w-full mt-3 max-h-[200px] h-auto rounded-lg object-cover'/>
                    )}
                  </div>
                  <div className='flex gap-2 mt-1 text-placeholder font-semibold text-xs'>
                    <button disabled={pending} onClick={() => handleUpdateComment(commentIsLiked, comment._id)} className={`flex ${commentIsLiked ? 'text-[#EB5757]' : 'hover:text-text'} transition-colors items-center gap-1`}>
                      <MdFavoriteBorder size={16}/>
                      Like
                    </button>
                    ·
                    <span>
                      {formatNumber(comment.likes?.length)} Likes
                    </span>
                  </div>
                </div>
              </li> 
            )}
          )}
        </ul>
      )}
    </>
  )
}
