import React from 'react'
import CardTweet from './tweet-card'
import { getUser, getUserTweets, getUserReplies, getUserMedia, getUserLikes } from '@/app/lib/data'
import { TweetType, UserType } from '@/app/lib/definitions'
import UserCard from './user-card'

export default async function FilteredTweets({ 
  userId,
  filter
}: { 
  userId: string,
  filter?: string
}) {
  const loggedUser = await getUser()
  let tweets = null
  let users: any[] = []
  if (filter === "tweets") {
    tweets = await getUserTweets(userId) 
  } else if (filter === "tweets-replies") {
    const tweetsData = await getUserTweets(userId) as TweetType[]
    const repliesData = await getUserReplies(userId) as TweetType[]
    tweets = tweetsData?.concat(repliesData)
  } else if (filter === "media") {
    tweets = await getUserMedia(userId)
  } else if (filter === "likes") {
    tweets = await getUserLikes(userId)
  }

  return (
    <div className='flex flex-col gap-5 w-full max-w-[750px] h-full'>
      {tweets?.map(tweet => 
        <CardTweet key={tweet._id} tweet={tweet} user={loggedUser}/>
      )}
      {users?.map(user => 
        <UserCard key={user._id} user={user}/>
      )}
    </div>
  )
}
