import React from 'react'
import Messages from '@/components/chat/messages'
import SendMessageForm from '@/components/chat/send-message-form'
import { ChannelType } from '@/app/lib/definitions'

export default function Main({ 
  channel, 
  channelId 
}: {  
  channel?: ChannelType,
  channelId?: string
}) {  
  return (
    <main className='w-full h-full'>
      <div className='p-3 h-[65px] flex items-center shadow-[0px_4px_4px_0px_#00000040]'>
        <h1 className='uppercase ml-20 md:ml-2'>{channel?.name}</h1>
      </div>
      <section className='sm:py-10 py-4 sm:px-14 px-4 h-[calc(100%-65px)] flex flex-col'>
        <Messages channel={channel} channelId={channelId}/>
        <SendMessageForm channelId={channelId}/>
      </section>
    </main>
  )
}