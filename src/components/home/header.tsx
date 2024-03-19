import { UserType } from '@/app/lib/definitions'
import React from 'react'
import DropDownMenu from '../drop-down-menux'
import Nav from '../nav'

export default function Header({ user }: { user: UserType }) {

  return (
    <header className='flex justify-between p-7'>
      <div className="bg-[url('/devchallenges.svg')] dark:bg-[url('/devchallenges-light.svg')] bg-no-repeat min-h-[20px] w-[140px]"></div>
      <div  className='w-fit relative'>
        <DropDownMenu user={user}>
          <Nav position='bottom'/>
        </DropDownMenu>
      </div>
    </header>
  )
}
