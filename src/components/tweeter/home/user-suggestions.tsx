import { getUserSuggestions } from '@/app/lib/data'
import { AuthUser } from '@/app/lib/definitions'
import { formatNumber } from '@/app/lib/utils'
import Image from 'next/image'
import React from 'react'
import FollowUnfollowButton from '../follow-unfollow-button'

export default async function UserSuggestions({ userId }: { userId: string }) {
  const suggestedUsers = await getUserSuggestions(userId, 3)

  return (
    <div className='w-full bg-primary py-3 px-4 rounded-xl shadow-card'>
      <h2 className='font-semibold pb-3 text-xs'>
        Who to follow
      </h2>
      <ul>
        {suggestedUsers?.map(user => (
          <li key={user._id} className='font-medium border-t border-secondary py-5'>
            <div className='flex text-xs flex-wrap justify-between gap-3 items-center'>
              <Image src={user?.photo || ''} width={40} height={40} className='h-[40px] w-[40px] rounded-lg bg-background' alt='Suggested user profile photo' />
              <div>
                <span className='text-base block'>{user.name}</span>
                <span className='text-text'>{formatNumber(user.followers.length)} followers</span>
              </div>
              <FollowUnfollowButton loggedUserId={userId} userToFollow={user}/>
            </div>
            <p className='text-sm text-text my-4'>{user.bio}</p>
            <Image src={user?.header ?? ''} width={1920} height={300} className='h-[100px] w-full rounded-lg bg-background2' alt='user header image' />
          </li>
        ))}
      </ul>
    </div>
  )
}
