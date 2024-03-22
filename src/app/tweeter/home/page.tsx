import { getUser } from '@/app/lib/data'
import { formatNumber } from '@/app/lib/utils'
import CardFormTweet from '@/components/tweeter/home/card-form-tweet'
import CardTweet from '@/components/tweeter/home/card-tweet'
import React from 'react'

export default function page() {
  const trends = [{
    _id: 'fwefww',
    name: '#Trend1',
    tweetsCount: 0
  }]

  const tweets = [{
    user: {
      name: 'John Doe',
      photo: '/vercel.svg'
    },
    comments: [{
      _id: 'wkcmk',
      user: {
        _id: 'sdw',
        name: 'John Doe',
        photo: '/Google.svg'
      },
      createdAt: new Date(),
      text: 'Wow, this is amazing!',
      media: undefined,
      savedCount:  123,
      retweetsCount: 21312,
      likesCount: 2131,
      whoCanReply: 'everyone', // everyone | only followers

    }],
    createdAt: new Date(),
    text: 'Hello World! This is my first Tweet.',
    media: '/next.svg',
    savedCount:  123,
    retweetsCount: 21312,
    likesCount: 2131,
    whoCanReply: 'everyone', // everyone | only followers
    _id: 'fewF',
  }]

  return (
    <main className='flex p-10 gap-5'>
      <section className='flex flex-col gap-5 w-[60%] h-full'>
        <CardFormTweet/>
        {tweets.map(tweet => 
          <CardTweet key={tweet._id} tweet={tweet}/>
        )}
      </section>
      <section className='flex flex-col w-[40%] h-full'>
        <div className='w-full bg-primary py-3 px-4 rounded-xl shadow-card'>
          <h2 className='font-semibold pb-3 text-xs border-b border-secondary'>
            Trends for you
          </h2>
          <ul>
            {trends.map(trend => (
              <li className='font-semibold mt-3' key={trend.name}>
                {trend.name}
                <span className='text-xs font-medium block text-[#828282]'>{formatNumber(trend.tweetsCount)} Tweets</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
