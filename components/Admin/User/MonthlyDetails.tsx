'use client'
import { SpecificFinancialActivityColumn } from '@/components/columns/SpecificFinancialActivityColumn'
import DynamicTable from '@/components/reusable/DynamicTable'
import { SpecificFinancialActivityData } from '@/public/demoData/SpecificFinancialActivityData'
import FilterIcon from '@/components/icons/admin/FilterIcon'
import SearchIcon from '@/components/icons/admin/SearchIcon'
import React, { useState } from 'react'

const statsData = [
    {
        title: 'Total Lead Submitted',
        value: 6
    },
    {
        title: 'Qualified Leads',
        value: 4
    },
    {
        title: 'Conversion',
        value: 2
    }
]

export default function MonthlyDetails() {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

     const totalItems = SpecificFinancialActivityData.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const currentData = SpecificFinancialActivityData.slice(startIndex, startIndex + itemsPerPage);


    const handleView = () => {
        console.log('done')
    }
    const handleDownload = () => {
        console.log('done')
    }
    const handlePrint = () => {
        console.log('done')
    }
    
    return (
        <div className='mt-8'>
            <div className='grid grid-cols-3 gap-3'>
                {statsData.map((item, index) => (
                    <div key={index} className='p-4 bg-[#f6f8fa] rounded-[12px] border border-[#E9E9EA]'>
                        <p className='text-base text-[#64748B]'>{item.title}</p>
                        <h2 className='text-[32px] mt-[26px]'>{item.value}</h2>
                    </div>
                ))}
            </div>
            
            <div className='mt-[27px]'>
                <h2 className='text-2xl text-[#111827] font-medium'>See Specific Financial Activity Here</h2>
                <div className='flex items-center justify-between my-4'>
                    <div className='px-4 py-2.5 border rounded-[10px]'>
                        <p>March</p>
                    </div>
                    <div className='flex items-center'>
                        <div className='relative'>
                            <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />
                            <input type="text" className='bg-[#e9e9ea] py-2 pl-12 rounded-[10px] w-[315px]' placeholder='Search user here' />
                        </div>
                        <button className='flex items-center gap-2 p-2.5 cursor-pointer'>
                            <FilterIcon />
                            Filter
                        </button>
                    </div>
                </div>
                
                <DynamicTable 
                    data={SpecificFinancialActivityData}
                    columns={SpecificFinancialActivityColumn({
                        onView: handleView,
                        onDownload: handleDownload,
                        onPrint: handlePrint
                    })}
                   
                     currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalpage={totalPages}
                    totalItems={totalItems}
                    onPageChange={setCurrentPage}
                    setItemsPerPage={setItemsPerPage}
                    noDataMessage="No users found"
                    loading={false}
                />
            </div>
        </div>
    )
}