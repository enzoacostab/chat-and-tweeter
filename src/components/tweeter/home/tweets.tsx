import React from 'react'
import CreateCard from './create-card'
import CardTweet from '../tweet-card'
import { getTweets } from '@/app/lib/data'
import { AuthUser } from '@/app/lib/definitions'

export default async function Tweets({ user }: { user: AuthUser }) {
  const tweets = await getTweets(undefined)

  return (
    <>
      <CreateCard user={user}/>
      {tweets?.map(tweet => 
        <CardTweet key={tweet._id} tweet={tweet} user={user}/>
      )}
    </>
  )
}
