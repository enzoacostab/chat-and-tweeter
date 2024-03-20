import React from 'react'
import { getChannels } from '@/app/lib/data'
import Channels from '@/components/chat/channels'

export default async function page({ searchParams }: { searchParams?: { menu: string } }) {
  const channels = await getChannels()

  return <Channels params={searchParams && Object.entries(searchParams)} channels={channels}/>
}