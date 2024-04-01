import { UserType } from '@/app/lib/definitions'
import { formatNumber } from '@/app/lib/utils'
import Image from 'next/image'
import React from 'react'
import FollowUnfollowButton from './follow-unfollow-button'

export default function UserCard({ 
  user,
  loggedUserId
}: { 
  user?: UserType 
  loggedUserId: string
}) {
  return (
    <div className='py-3 px-4 rounded-xl shadow-card bg-primary '>
      <div className='flex justify-between gap-4 items-center'>
        <Image src={user?.photo || ''} width={40} height={40} className='h-[40px] w-[40px] rounded-lg bg-background' alt='Suggested user profile photo' />
        <div>
          <span className='text-base block font-medium'>{user?.name}</span>
          <span className='text-placeholder font-medium text-xs'>{formatNumber(user?.followers.length)} followers</span>
        </div>
        <FollowUnfollowButton loggedUserId={loggedUserId} userToFollow={user}/>
      </div>
      <p className='text-text my-4'>{user?.bio}</p>
      <Image src={user?.header || ''} width={1920} height={1080} className='h-[200px] w-full rounded-lg bg-background2 object-cover' alt='user header image' />
    </div>
  )
}
