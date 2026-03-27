 'use client'
import { ContactRequestColumn } from '@/components/columns/ContactRequestColumn'
import DynamicTable from '@/components/reusable/DynamicTable'
import { ContactRequestData } from '@/public/demoData/ContactRequestData'
import FilterIcon from '@/components/icons/admin/FilterIcon'
import SearchIcon from '@/components/icons/admin/SearchIcon'
import { title } from 'process'
import React from 'react'


const statsData=[
  {
    title:'Total Support Request',
    value:'3'
  },
  {
    title:'Support Solved',
    value:'2'
  },
  {
    title:'Remaining Support',
    value:'1'
  }
]

export default function SupportHome() {

  const handlePending = ()=>{
    console.log();
    
  }

  const handleViewDetails =()=>{
    console.log()
  }




  return (
    <div>
      <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          statsData.map((item,index)=>(
            <div key={index} className=' border border-[#E9E9EA] rounded-[12px] py-4 px-6'>
              <p className=' text-base text-[#64748B] '>{item.title}</p>
              <h3 className=' text-[32px] text-[#1E293B] font-semibold mt-[26px]'>{item.value}</h3>

            </div>
          ))
        }
      </div>

      <div>
        <div className=' flex items-center justify-between mb-4 mt-8'>
                        <h3 className=' text-2xl text-[#111827] font-medium'>See All Contact Request Summarized by Secretary</h3>
                        <div>
                            <div className=' flex items-center'>
                                <div className=' relative'>
                                    <SearchIcon className=' absolute top-1/2 -translate-y-1/2 left-4 ' />
                                    <input type="text" name="" id="" className=' bg-[#e9e9ea] py-2 pl-12 rounded-[10px] w-[315px]' placeholder='Search user here' />
        
                                </div>
                                <button className=' flex items-center gap-2 p-2.5 cursor-pointer'>
                                <FilterIcon />
                                </button>
                                 Filter
                                 
                            </div>
                        </div>
        
                    </div>

                    <DynamicTable data={ContactRequestData} columns={ContactRequestColumn({onPending:handlePending,onViewDetails:handleViewDetails})} />
      </div>
    </div>
  )
}

