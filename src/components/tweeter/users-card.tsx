import { UserType } from '@/app/lib/definitions'
import { formatNumber } from '@/app/lib/utils'
import Image from 'next/image'
import React, { RefObject } from 'react'
import FollowUnfollowButton from './follow-unfollow-button'
import { MdClose } from 'react-icons/md'
import Link from 'next/link'

export default function UsersCard({ 
  userId, 
  users, 
  dialogRef,
  title
}: { 
  userId: string, 
  users?: UserType[],
  dialogRef?: RefObject<HTMLDialogElement>,
  title: string
}) {
  return (
    <div className='w-full h-full bg-primary py-3 text-text px-4 rounded-xl shadow-card'>
      <div className='flex pb-3 items-center justify-between'>
        <h2 className='font-semibold text-xs capitalize'>
          {title}
        </h2>
        {dialogRef ? (
          <button onClick={() => dialogRef.current?.close()}>
            <MdClose className='hover:opacity-80' size={24}/>
          </button>
        ) : null}
      </div>
      <ul>
        {users && users?.map(user => (
          <li key={user._id} className='font-medium border-t border-secondary py-5'>
            <div className='flex text-xs justify-between gap-3 items-center'>
              <div className='flex gap-3'>
                <Link href={{
                  pathname: `/tweeter/profile/${user._id}`,
                  query: { filter: "tweets" }
                }}>
                  <Image src={user?.photo || ''} width={40} height={40} className='h-[40px] w-[40px] rounded-lg bg-background' alt='Suggested user profile photo' />
                </Link>
                <div>
                  <Link href={{
                    pathname: `/tweeter/profile/${user._id}`,
                    query: { filter: "tweets" }
                  }}>
                    <span className='text-base block text-foreground'>{user.name}</span>
                  </Link>
                  <span className='text-text'>{formatNumber(user.followers?.length)} followers</span>
                </div>
              </div>
              <FollowUnfollowButton loggedUserId={userId} userToFollow={user}/>
            </div>
            <p className='text-sm text-text my-4'>{user.bio}</p>
            {user?.header ? (
              <Image src={user.header} width={1920} height={100} className='h-[100px] w-full rounded-lg bg-background2 object-cover' alt='user header image' />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
