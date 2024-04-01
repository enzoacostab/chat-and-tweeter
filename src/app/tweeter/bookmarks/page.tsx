import FilteredTweets from '@/components/tweeter/filtered-tweets'
import React from 'react'

export default async function page({ 
  searchParams 
}: { 
  searchParams?: { filter: string }
}) {
  return <FilteredTweets filter={searchParams?.filter}/>
}
