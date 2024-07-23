'use client'

import { ChannelType, MessageType } from '@/app/lib/definitions'
import { pusherClient } from '@/app/lib/pusher'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

export default function Messages({ channel, channelId }: { channel?: ChannelType , channelId?: string }) {
  const [messages, setMessages] = useState<MessageType[] | undefined>(channel?.messages)
  const bottomRef = useRef<HTMLDivElement>(null)
  
  if (channelId && !channel) toast.error('Failed to fetch channel')

  useEffect(() => {
    if (channelId) {
      const channel = pusherClient.subscribe(channelId)
      const handleMessage = async (newMessage: MessageType) => {
        setMessages((prev: MessageType[] | undefined) => prev ? [...prev, newMessage] : [newMessage])
      }

      channel.bind('new-message', handleMessage)

      return () => {
        channel.unbind_all()
        channel.unbind_all()
      }
    }
  }, [channelId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [messages])
  
  
  return (
    <ul className='overflow-y-scroll no-scrollbar mb-4 sm:mb-8'>
      {messages?.map((message: MessageType, i: number) => {
        const date = message?.createdAt
        const prevDate = messages[i-1]?.createdAt
        date.setHours(0,0,0,0)
        prevDate?.setHours(0,0,0,0)
        
        return (
          <li key={message._id}>
            {date.getTime() > prevDate?.getTime() ? (
              <div className='h-[1px] bg-[#828282] my-10 flex items-center justify-center'>
                <span className='bg-[#252329] text-[#828282] text-xs font-semibold px-5'>{date.toDateString()}</span>
              </div> 
            ) : null}
            <div className='flex mt-10'>
              <Image src={message.user?.photo || '/user-icon.png'} className={`bg-secondary rounded-lg max-h-[42px] ${!message.user?.photo ? "p-1" : ""}`} width={42} height={42} alt="profile image" />
              <div className='text-lg font-medium ml-5'>
                <p className='text-[#828282] font-bold capitalize'>
                  {message.user?.name} 
                  <span className='text-sm font-medium ml-3'>{date.toLocaleString()}</span>
                </p>
                <p className='text-foreground'>{message.content}</p>
              </div>
            </div>
          </li>
        )
      })}
      <div ref={bottomRef}></div>
    </ul>
  )
}
