import React from 'react'
import Tweets from '@/components/tweeter/home/tweets'
import Trends from '@/components/tweeter/home/trends'
import UserSuggestions from '@/components/tweeter/home/user-suggestions'
import { getUser } from '@/app/lib/data'

export default async function page() {
  const user = await getUser()

  return (
    <main className='flex md:flex-row flex-col py-10 md:px-10 px-5 gap-5 justify-center'>
      <section className='flex flex-col gap-5 w-full max-w-[750px] h-full'>
        <Tweets user={user}/>
      </section>
      <section className='flex flex-col gap-5 w-full md:max-w-[300px] h-full'>
        <Trends/>
        <UserSuggestions userId={user?._id}/>
      </section>
    </main>
  )
}
