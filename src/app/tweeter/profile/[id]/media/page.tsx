import FilteredTweets from '@/components/tweeter/filtered-tweets'
import React from 'react'

export default async function page({ params }: { params: { id: string }}) {
  return <FilteredTweets filter='media' userId={params.id}/>
}
