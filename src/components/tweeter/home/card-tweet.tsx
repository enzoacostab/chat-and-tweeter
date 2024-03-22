import React from 'react'
import Image from 'next/image'
import { formatNumber } from '@/app/lib/utils'
import FormUpdateTweet from './form-update-tweet'

export default function CardTweet({ tweet }: any) {
  return (
    <div key={tweet._id} className='w-full bg-primary py-3 px-4 rounded-xl shadow-card'>
      <div className='flex gap-4'>
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
            {formatNumber(tweet.comments.length)} Comments
          </span>
          <span>
            {formatNumber(tweet.retweetsCount)} Retweets
          </span>
          <span>
            {formatNumber(tweet.savedCount)} Saved
          </span>
        </div>
      </div>
      <FormUpdateTweet/>
    </div>
  )
}
