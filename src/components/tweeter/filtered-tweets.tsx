import React from 'react'
import CardTweet from './tweet-card'
import { getUser, getUserTweets, getUserReplies } from '@/app/lib/data'
import { TweetType } from '@/app/lib/definitions'

export default async function FilteredTweets({ 
  userId,
  filter
}: { 
  userId: string,
  filter: string
}) {
  const user = await getUser()
  let tweets
  if (filter === "tweets") {
    tweets = await getUserTweets(userId) 
  } else if (filter === "tweets-replies") {
    const tweetsData = await getUserTweets(userId) as TweetType[]
    const repliesData = await getUserReplies(userId) as TweetType[]
    tweets = tweetsData?.concat(repliesData)
  }

  return (
    <div className='flex flex-col gap-5 w-full max-w-[750px] h-full'>
      {tweets?.map(tweet => 
        <CardTweet key={tweet._id} tweet={tweet} user={user}/>
      )}
    </div>
  )
}