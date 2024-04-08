'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { MdSearch } from 'react-icons/md'

export default function Search({ searchValue }: { searchValue?: string }) {
  const [search, setSearch] = useState(searchValue ?? '')
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleClick = () => {
    const params = new URLSearchParams(searchParams)
    params.set('search', search.toLowerCase())
    router.push(`?${params}`)
  }

  return (
    <div className='flex bg-primary md:min-w-[483.33px] rounded-lg p-2 gap-2 has-[:focus]:outline outline-1 outline-secondary transition-colors'>
      <MdSearch size={24} className='text-placeholder'/>
      <input 
        value={search} 
        onChange={({ target }) => setSearch(target.value)} 
        type="text"
        placeholder='Search'
        className='w-full text-font-medium bg-transparent outline-none placeholder:text-placeholder text-tex' 
      />
      <button onClick={handleClick} className='text-white px-3 rounded text-xs font-medium bg-[#2F80ED] hover:opacity-90 transition-opacity'>Search</button>
    </div>
  )
}
