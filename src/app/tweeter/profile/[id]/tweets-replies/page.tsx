import FilteredTweets from '@/components/tweeter/filtered-tweets'
import React from 'react'

export default function page({ params }: { params: { id: string }}) {
  return <FilteredTweets filter='tweets-replies' userId={params.id}/>
}
