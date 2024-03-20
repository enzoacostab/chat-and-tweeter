import React from 'react'
import ChatMenu from '@/components/chat/chat-menu';
import DropDownMenu from '@/components/drop-down-menu';
import { getUser } from '../lib/data';
import Nav from '@/components/nav';

export default async function Layout({ 
  children,
  section
}: {
  children: React.ReactNode,
  section: React.ReactNode,
}) {
  const user = await getUser()

  return (
    <div className='flex h-[100dvh] text-[#E0E0E0] text-lg font-bold'>
      <ChatMenu>
        {section}
        <div className='mt-auto self-center'>
          <DropDownMenu user={user} className='text-lg font-bold ml-6 min-w-[80px] mr-3 capitalize'>
            <Nav position='top'/>
          </DropDownMenu>
        </div>
      </ChatMenu>
      {children}
    </div>
  )
}
