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
    <div className='border border-[#E9E9EA] p-4 sm:p-6 rounded-[12px] mt-6 w-full'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4'>
        <h3 className='text-xl sm:text-2xl text-[#111827] font-medium'>All Rewards Status</h3>
        <div className='w-full sm:w-auto'>
          <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2'>
            <div className='relative w-full sm:w-auto'>
              <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />
              <input 
                type="text" 
                className='bg-[#e9e9ea] py-2 pl-12 pr-4 rounded-[10px] w-full sm:w-[315px] outline-none focus:ring-1 focus:ring-blue-500' 
                placeholder='Search user here' 
              />
            </div>
            <button className='flex items-center gap-2 p-2.5 cursor-pointer hover:bg-gray-100 rounded-lg w-full sm:w-auto justify-center'>
              <FilterIcon />
              <span className='hidden sm:inline'>Filter</span>
            </button>
            <div className='flex gap-2.5 w-full sm:w-auto'>
              <button className='flex items-center justify-between gap-2 border border-[#D2D2D5] py-2 px-2.5 rounded-[8px] cursor-pointer hover:bg-gray-50 w-full sm:w-auto'>
                <span className='hidden sm:inline'>From</span> <DownArrowIcon2 />
              </button>
              <button className='flex items-center justify-between gap-2 border border-[#D2D2D5] py-2 px-2.5 rounded-[8px] cursor-pointer hover:bg-gray-50 w-full sm:w-auto'>
                <span className='hidden sm:inline'>To</span> <DownArrowIcon2 />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='overflow-x-auto'>
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
    </div>
  )
}
