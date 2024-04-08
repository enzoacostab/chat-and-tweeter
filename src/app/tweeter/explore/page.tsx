import Search from '@/components/tweeter/explore/search'
import FilteredTweets from '@/components/tweeter/filtered-tweets'
import React from 'react'

export default function page({ 
  params,
  searchParams 
}: { 
  params: { id: string } 
  searchParams?: { 
    filter?: string 
    search?: string
  }
}) {
  return (
    <div className='flex flex-col gap-4'>
      <Search searchValue={searchParams?.search}/>
      <FilteredTweets search={searchParams?.search} filter={searchParams?.filter} userId={params.id}/>
    </div>
  )
}
