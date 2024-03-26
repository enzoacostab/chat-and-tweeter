import UserCard from '@/components/tweeter/explore/user-card'
import React from 'react'

export default function page() {
  const suggestedUsers = [{
    _id: 'trg',
    name: 'John Doe',
    photo: '/vercel.svg',
    followers: 123123,
    bio: 'Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰',
    header: 'header image url'
  }]

  return (
    <div className='flex flex-col gap-5 w-full max-w-[750px] h-full'>
      {suggestedUsers.map(user => 
        <UserCard key={user._id} user={user}/>
      )}
    </div>
  )
}
