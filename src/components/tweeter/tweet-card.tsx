import React from 'react'
import Image from 'next/image'
import { formatNumber } from '@/app/lib/utils'
import UpdateForm from './update-form'
import { getRetweetsCount, getSavedCount } from '@/app/lib/data'
import { TweetType, UserType } from '@/app/lib/definitions'

export default async function CardTweet({ tweet, user }: { tweet: TweetType, user: UserType }) {
  const retweetsCount = await getRetweetsCount(tweet._id)
  const savedCount = await getSavedCount(tweet._id)
  const  isLikedByUser = tweet.likes?.some((userID) => userID === user?._id) ?? false

  return (
    <div className='w-full transition-all bg-primary py-3 px-4 rounded-xl shadow-card'>
      <div className='flex gap-4 items-center'>
        <Image src={tweet.user?.photo || ''} width={40} height={40} className='h-[40px] w-[40px] rounded-lg bg-background' alt='Tweet user profile photo' />
        <div> 
          <h2 className="font-medium">{tweet.user.name}</h2>
          <span className="text-xs mt-0.5 font-medium text-placeholder">{tweet.createdAt.toDateString()}</span>
        </div>
      </div>
      <div>
        <p className='text-text my-5'>{tweet.text}</p>
        {tweet.media && (
          <Image src={tweet.media} width={100} height={100} alt='tweet media' className='w-full max-h-[400px] rounded-lg' />
        )}
        <div className='flex mt-2 justify-end gap-3 text-placeholder text-xs font-medium'>
          <span>
            {formatNumber(tweet.comments?.length)} Comments
          </span>
          <span>
            {formatNumber(retweetsCount)} Retweets
          </span>
          <span>
            {formatNumber(savedCount)} Saved
          </span>
        </div>
      </div>
      <UpdateForm user={user} tweet={tweet}/>
    </div>
  )
}
