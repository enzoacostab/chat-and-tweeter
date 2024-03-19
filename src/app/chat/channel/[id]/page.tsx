import Main from '@/components/chat/main'
import React from 'react'
import { getMessages } from '../../../lib/data'

export default async function page({ params }: { params: { id: string } }) {
  const channelId = params.id
  const channel = await getMessages(channelId)

  return (
    <Main channel={channel} channelId={channelId}/>
  )
}
