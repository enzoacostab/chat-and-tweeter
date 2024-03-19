import React from 'react'
import Header from '@/components/home/header'
import PersonalInfo from '@/components/home/personal-info'
import ChangeInfo from '@/components/home/change-info'
import { getUser } from './lib/data'

export default async function page({ searchParams }: { searchParams: { edit: string } }) {
  const { edit } = searchParams
  const user = await getUser()
  
  return (
    <>
      <Header user={user}/>
      <main className='flex justify-center items-center flex-col'>
        {edit ? (
          <ChangeInfo user={user}/>
        ) : (
          <PersonalInfo user={user}/>
        )}
      </main>
      <footer className='text-sm text-[#828282] flex justify-between max-w-[850px] px-5 pb-4 lg:px-0 mt-4 mx-auto'>
        <p>created by <span className='font-semibold'>enzoacostab</span></p>
        <p>devChallenges.io</p>
      </footer>
    </>
  )
}
