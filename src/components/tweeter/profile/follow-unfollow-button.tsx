'use client'

import { follow, unfollow } from '@/app/lib/actions/user'
import React, { useTransition } from 'react'
import { MdPersonAdd, MdPersonRemove } from 'react-icons/md'

export default function FollowUnfollowButton({ 
  followedByUser,
  userIdToFollow,
  userId
}: { 
  followedByUser: boolean, 
  userIdToFollow: string,
  userId: string
}) {
  const [pending, startTransition] = useTransition()

  const handleClick = (action: string) => {
    startTransition(async () => {
      if (action === "unfollow") {
        unfollow(userId, userIdToFollow)
      } else {
        follow(userId, userIdToFollow)
      }
    })
  }

  if (followedByUser) {
    return (
      <button 
        disabled={pending} 
        onClick={() => handleClick('unfollow')} 
        className='text-xs disabled:opacity-80 hover:opacity-90 h-fit md:ml-auto font-medium px-5 py-2 flex gap-1 bg-[#2F80ED] items-center text-white rounded-md'
      >
        <MdPersonRemove size={14}/>
        Unfollow
      </button>
    )
  } else {
    return (
      <button 
        disabled={pending} 
        onClick={() => handleClick('follow')} 
        className='text-xs disabled:opacity-80 hover:opacity-90 h-fit md:ml-auto font-medium px-5 py-2 flex gap-1 bg-[#2F80ED] items-center text-white rounded-md'
      >
        <MdPersonAdd size={14}/>
        Follow
      </button>
    )
  }
}
