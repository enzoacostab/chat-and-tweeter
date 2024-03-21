import React from 'react'
import DropDownMenu from '@/components/drop-down-menu'
import Nav from '@/components/nav'
import TweeterNav from './tweeter-nav'
import { TweeterIcon } from '@/app/icons'
import { getUser } from '@/app/lib/data'

export default async function TweeterHeader() {
  const user = await getUser()

  return (
    <header className='bg-primary flex justify-between px-10 items-center'>
      <div className="bg-[url('/tweeter.svg')] dark:bg-[url('/tweeter-light.svg')] bg-no-repeat h-[30px] w-[126px] hidden sm:block"></div>
      <TweeterIcon className='text-[#2F80ED] sm:hidden' width={41} height={28}/>
      <TweeterNav/>
      <DropDownMenu user={user}>
        <Nav position='bottom'/>
      </DropDownMenu>
    </header>
  )
}
