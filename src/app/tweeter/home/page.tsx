import { getTweets, getUser } from '@/app/lib/data'
import { formatNumber } from '@/app/lib/utils'
import CardTweet from '@/components/tweeter/tweet-card'
import React from 'react'
import CreateCard from '@/components/tweeter/home/create-card'
import UserSuggestion from '@/components/tweeter/home/user-suggestion'

export default async function page() {
  const trends = [{
    _id: 'fwefww',
    name: '#Trend1',
    tweetsCount: 0
  }]
  const user = await getUser()
  const tweets = await getTweets(undefined)
  
  const suggestedUsers = [{
    _id: 'trg',
    name: 'John Doe',
    photo: '/vercel.svg',
    followers: 123123,
    bio: 'Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰',
    header: 'header image url'
  }]

  return (
    <main className='flex md:flex-row flex-col py-10 md:px-10 px-5 gap-5 justify-center'>
      <section className='flex flex-col gap-5 w-full max-w-[750px] h-full'>
        <CreateCard user={user}/>
        {tweets?.map(tweet => 
          <CardTweet key={tweet._id} tweet={tweet} user={user}/>
        )}
      </section>
      <section className='flex flex-col gap-5 w-full md:max-w-[300px] h-full'>
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
        <div className='w-full bg-primary py-3 px-4 rounded-xl shadow-card'>
          <h2 className='font-semibold pb-3 text-xs'>
            Who to follow
          </h2>
          <ul>
            {suggestedUsers.map(user => (
              <UserSuggestion key={user._id} user={user} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
