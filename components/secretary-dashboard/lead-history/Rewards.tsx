'use client'
import DownArrowIcon2 from '@/components/icons/admin/DownArrowIcon2'
import FilterIcon from '@/components/icons/admin/FilterIcon'
import SearchIcon from '@/components/icons/admin/SearchIcon'
import React, { useState } from 'react'
import { RewardStatusColumn } from '@/components/columns/RewardStatusColumn'
import { rewardStatusData } from '@/public/demoData/RewardStatusData'
import DynamicTable from '@/components/reusable/DynamicTable'

export default function Rewards() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = rewardStatusData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = rewardStatusData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className=' border border-[#E9E9EA] p-6 rounded-[12px] mt-6'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-2xl text-[#111827] font-medium'>All Rewards Status</h3>
        <div>
          <div className='flex items-center'>
            <div className='relative'>
              <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />
              <input 
                type="text" 
                className='bg-[#e9e9ea] py-2 pl-12 rounded-[10px] w-[315px] outline-none focus:ring-1 focus:ring-blue-500' 
                placeholder='Search user here' 
              />
            </div>
            <button className='flex items-center gap-2 p-2.5 cursor-pointer mr-2 hover:bg-gray-100 rounded-lg'>
              <FilterIcon />
              Filter
            </button>
            <div className='flex items-center gap-2.5'>
              <button className='flex items-center gap-7 border border-[#D2D2D5] py-2 px-2.5 rounded-[8px] cursor-pointer hover:bg-gray-50'>
                From <DownArrowIcon2 />
              </button>
              <button className='flex items-center gap-7 border border-[#D2D2D5] py-2 px-2.5 rounded-[8px] cursor-pointer hover:bg-gray-50'>
                To <DownArrowIcon2 />
              </button>
            </div>
          </div>
        </div>
      </div>
      <DynamicTable
        columns={RewardStatusColumn()}
        data={currentData}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalpage={totalPages}
        totalItems={totalItems}
        onPageChange={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        noDataMessage="No rewards found"
        loading={false}
      />
    </div>
  )
}
