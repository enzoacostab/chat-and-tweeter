import { getUser } from '@/app/lib/data'
import { UserType } from '@/app/lib/definitions'
import { formatNumber } from '@/app/lib/utils'
import Image from 'next/image'
import React from 'react'
import FollowUnfollowButton from '../follow-unfollow-button'
import Buttons from './buttons'

export default async function UserProfileCard({ user }: { user?: UserType }) {
  const loggedUser = await getUser()

  return (
    <div className='flex flex-col items-center md:items-start md:flex-row bg-primary rounded-xl max-w-[1070px] lg:w-full mx-10 p-7 gap-5 -mt-24 md:-mt-12'>
      <div className='rounded-lg w-fit -mt-20 relative bg-primary p-1'>
        <Image src={user?.photo || ''} height={300} width={300} className='h-[160px] w-[160px] bg-background rounded-lg' alt='user profile image'/>
      </div>
      <div className='flex gap-y-5 flex-col md:w-[60%] w-full'>
        <div className='text-xs flex flex-wrap md:justify-start justify-center md:flex-nowrap items-center gap-y-3 gap-x-7'>
          <h1 className='font-semibold w-full md:w-fit text-2xl text-center'>{user?.name}</h1>
          <Buttons user={user} userId={loggedUser._id}/>
        </div>
        <p className='text-text text-center md:text-left text-lg font-medium'>{user?.bio}</p>
      </div>
      <FollowUnfollowButton loggedUserId={loggedUser._id} userToFollow={user}/>
    </div>
  )
}
