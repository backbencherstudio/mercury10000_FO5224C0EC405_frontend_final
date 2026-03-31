'use client'
import React from 'react'
import DynamicTable from '@/components/reusable/DynamicTable'
import FilterIcon from '@/components/icons/admin/FilterIcon'
import SearchIcon from '@/components/icons/admin/SearchIcon'
import SuccessTik from '@/components/icons/admin/SuccessTik'
import {TreadData} from '@/public/demoData/TreadData'
import { TradeColumn } from '@/components/columns/TradeColumn'

export default function CreateTrade() {


const handleView=()=>{
  console.log('done')

}
const handleEdit=()=>{
  console.log('done')

}

const handleDelete=()=>{
   console.log('done')
}

  return (
    <div className='mt-8'>
      <div className='p-4 sm:p-6 border border-[#11B0C1] bg-[#E6F6F4] rounded-[12px]'>
        <div className=' flex items-center gap-1.5'>
          <SuccessTik />
          <h3 className=' text-lg text-[#1D1F2C] font-semibold'>Trade Created</h3>
        </div>
        <p className=' text-sm text-[#06030C] mt-4'>A trade named plumbing has been created successfully! </p>
      </div>
      <div className='p-4 sm:p-6 border border-[#D2D2D5] rounded-[8px] mt-8'>
        <h3 className='text-xl sm:text-2xl text-[#111827] font-medium'>Create a Trade</h3>
        <div className='flex flex-col gap-1.5 py-6'>
          <label htmlFor="trade">Trade</label>
          <input type="text" id="trade" value='Plumbing' className='px-2.5 py-2 border border-[#D2D2D5] rounded-[8px]' readOnly />
        </div>
        <button className='bg-[#0b7680] text-white py-4 w-full rounded-[8px] cursor-pointer'>Create Trade</button>
      </div>

      <div className='p-4 sm:p-6 border border-[#D2D2D5] rounded-[8px] mt-14'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
          <h3 className='text-xl sm:text-2xl text-[#111827] font-medium'>See All Created Trades</h3>
          <div className='w-full sm:w-auto'>
            <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2'>
              <div className='relative w-full sm:w-auto'>
                <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />
                <input type="text" className='bg-[#e9e9ea] py-2 pl-12 pr-4 rounded-[10px] w-full sm:w-[315px] outline-none focus:ring-1 focus:ring-blue-500' placeholder='Search user here' />
              </div>
              <button className='flex items-center gap-2 p-2.5 cursor-pointer hover:bg-gray-100 rounded-lg w-full sm:w-auto justify-center'>
                <FilterIcon />
                <span className='hidden sm:inline'>Filter</span>
              </button>
            </div>
          </div>
        </div>
        <div className='mt-4 overflow-x-auto'>
          <DynamicTable data={TreadData} columns={TradeColumn({ onView: handleView, onEdit: handleEdit, onDelete: handleDelete })} showPagination={false} />
        </div>
      </div>

    </div>
  )
}
