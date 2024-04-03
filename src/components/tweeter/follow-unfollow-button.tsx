'use client'

import { follow, unfollow } from '@/app/lib/actions/user'
import { UserType } from '@/app/lib/definitions'
import React, { useTransition } from 'react'
import { MdPersonAdd, MdPersonRemove } from 'react-icons/md'

export default function FollowUnfollowButton({ 
  userToFollow,
  loggedUserId
}: { 
  userToFollow?: UserType,
  loggedUserId: string
}) {
  const [pending, startTransition] = useTransition()
  const followedByUser = userToFollow?.followers?.find((follower: UserType) => follower._id === loggedUserId)
  const myProfile = loggedUserId === userToFollow?._id

  const handleClick = (action: string) => {
    startTransition(async () => {
      if (action === "unfollow") {
        unfollow(loggedUserId, userToFollow?._id)
      } else {
        follow(loggedUserId, userToFollow?._id)
      }
    })
  }

  if (myProfile) return null

  if (followedByUser) {
    return (
      <button 
        disabled={pending} 
        onClick={() => handleClick('unfollow')} 
        className='text-xs disabled:opacity-80 hover:opacity-90 h-fit md:ml-auto font-medium px-3
        py-1.5 flex gap-1 bg-[#2F80ED] items-center text-white rounded-md'
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
        className='text-xs disabled:opacity-80 hover:opacity-90 h-fit md:ml-auto font-medium px-3 
        py-1.5 flex gap-1 bg-[#2F80ED] items-center text-white rounded-md'
      >
        <MdPersonAdd size={14}/>
        <span className='md:hidden lg:block'>Follow</span>
      </button>
    )
  }
}
