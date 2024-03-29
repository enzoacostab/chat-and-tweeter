import FilteredTweets from '@/components/tweeter/filtered-tweets'
import React from 'react'

export default async function page({ 
  params,
  searchParams 
}: { 
  params: { id: string } 
  searchParams?: { filter: string }
}) {
  return <FilteredTweets filter={searchParams?.filter} userId={params.id}/>
}
