import React from 'react'
import Tweets from '@/components/tweeter/home/tweets'
import Trends from '@/components/tweeter/home/trends'
import { getUser, getUserSuggestions } from '@/app/lib/data'
import UsersCard from '@/components/tweeter/users-card'

export default async function page() {
  const user = await getUser()
  const suggestedUsers = await getUserSuggestions(user?._id, 3)

  return (
    <main className='flex md:flex-row flex-col py-10 md:px-10 px-5 gap-5 justify-center'>
      <section className='flex flex-col gap-5 w-full max-w-[750px] h-full'>
        <Tweets user={user}/>
      </section>
      <section className='flex flex-col gap-5 w-full md:max-w-[300px] min-w-[250px] h-full'>
        <Trends/>
        <UsersCard userId={user?._id} users={suggestedUsers} title="Who to follow"/>
      </section>
    </main>
  )
}
