import CardTweet from '@/components/tweeter/tweet-card'
import React from 'react'

export default function page() {
  const topTweets = [{
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
  }, {
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
    <div className='flex flex-col gap-5 w-full max-w-[750px] h-full'>
      {topTweets.map(tweet => 
        <CardTweet key={tweet._id} tweet={tweet}/>
      )}
    </div>
  )
}
