import React from 'react'
import DropDownMenu from '@/components/drop-down-menu'
import Nav from '@/components/nav'
import TweeterNav from './tweeter-nav'
import { TweeterIcon } from '@/app/icons'
import { getUser } from '@/app/lib/data'

export default async function TweeterHeader() {
  const user = await getUser()

  return (
    <header className='bg-primary h-[60px] sticky top-0 left-0 w-full z-10 flex justify-between px-10 items-center'>
      <div className="bg-[url('/tweeter.svg')] dark:bg-[url('/tweeter-light.svg')] bg-no-repeat h-[30px] w-[126px] hidden md:block"></div>
      <TweeterIcon className='text-[#2F80ED] md:hidden' width={41} height={28}/>
      <div className='hidden md:flex h-full'>
        <TweeterNav/>
      </div>
      <DropDownMenu user={user}>
        <Nav position='bottom' userId={user._id}/>
      </DropDownMenu>
    </header>
  )
}
