import React from 'react'
import CardTweet from './tweet-card'
import { getUser, getUserTweets, getUserReplies, getUserMedia, getUserLikes, getTopTweets, getTweets, getUserSuggestions } from '@/app/lib/data'
import { TweetType, UserType } from '@/app/lib/definitions'
import UserCard from './user-card'

export default async function FilteredTweets({ 
  userId,
  filter,
  search
}: { 
  userId?: string,
  filter?: string,
  search?: string
}) {
  const loggedUser = await getUser()
  let tweets: TweetType[] | undefined = []
  let users: UserType[] | undefined = []
  if (filter === "tweets") {
    tweets = await getUserTweets(userId ?? loggedUser._id) 
  } else if (filter === "tweets-replies") {
    const tweetsData = await getUserTweets(userId ?? loggedUser._id) as TweetType[]
    const repliesData = await getUserReplies(userId ?? loggedUser._id) as TweetType[]
    tweets = tweetsData?.concat(repliesData)
  } else if (filter === "media") {
    tweets = await getUserMedia(userId ?? loggedUser._id)
  } else if (filter === "likes") {
    tweets = await getUserLikes(userId ?? loggedUser._id)
  } else if (filter === "top") {
    tweets = await getTopTweets()
  } else if (filter === "latest") {
    tweets = await getTweets(undefined)
  } else if (filter === "people") {
    users = await getUserSuggestions(loggedUser?._id, 10)
  }

  if (search) {
    if (users) {
      users = users.filter(user => user.name?.toLowerCase().includes(search))
    } else if (tweets) {
      tweets = tweets.filter(tweet => tweet.text.toLowerCase().includes(search))
    }
  }

  return (
    <div className='flex flex-col gap-5 w-full max-w-[750px] h-full'>
      {tweets?.map(tweet => 
        <CardTweet key={tweet._id} tweet={tweet} user={loggedUser}/>
      )}
      {users?.map(user => 
        <UserCard key={user._id} user={user} loggedUserId={loggedUser._id}/>
      )}
      {users?.length == 0 && tweets?.length == 0 && (
        <p className='text-center text-placeholder'>No content</p>
      )}
    </div>
  )
}
