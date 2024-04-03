import { getTrends } from '@/app/lib/data'
import { formatNumber } from '@/app/lib/utils'
import React from 'react'

export default async function Trends() {
  const trends = await getTrends()

  return (
    <div className='w-full bg-primary py-3 px-4 rounded-xl shadow-card'>
      <h2 className='font-semibold pb-3 text-xs border-b border-secondary'>
        Trends for you
      </h2>
      {trends && trends.length > 0 ? (
        <ul>
          {trends.map(trend => (
            <li className='font-semibold mt-3' key={trend.name}>
              {trend.name}
              <span className='text-xs font-medium block text-[#828282]'>
                {formatNumber(trend.tweets.length)} Tweets
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-center text-xs text-placeholder mt-2'>No trends yet</p>
      )}
    </div>
  )
}
