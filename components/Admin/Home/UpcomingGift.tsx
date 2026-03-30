import RightArrowIcon from '@/components/icons/admin/RightArrowIcon'
import React from 'react'


const names=[
    'kristin Watson',
    'cameron williamson',
    'dianne russell',
    'courtney henry',
    'marie curtis',
]


export default function UpcomingGift() {
  return (
    <div className=' border py-4 px-4.5 rounded-[12px] ' >
        <h2 className=' text-base text-[#161721] font-medium'>Upcoming Gifts</h2>

        <ul className=' space-y-8 mt-12'>
          {
            names.map((name, index) => (
              <li key={index} className=' flex items-center justify-between' >
                <div className=' flex items-center gap-2.5'>
                <div className=' w-8 h-8 rounded-full bg-[#f6f8fa]'></div>
                <p>{name}</p>

                </div>
                <button className=' cursor-pointer'>
                    <RightArrowIcon/>
                </button>
              </li>
            ))
          }
        </ul>

        <button className=' text-sm text-[#1E293B] font-semibold rounded-[8px] border w-full p-3 mt-18 cursor-pointer'>Manage Reward Rules</button>
    </div>
  )
}
