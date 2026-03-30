'use client'
import { SecretaryUsersColumn } from '@/components/columns/SecretaryUsersColumn'
import DynamicTable from '@/components/reusable/DynamicTable'
 
import FilterIcon from '@/components/icons/admin/FilterIcon'
import SearchIcon from '@/components/icons/admin/SearchIcon'
import React, { useState } from 'react'
import { secretaryUsersData } from '@/public/demoData/SecretaryUsersData'
 

export default function SecretaryUsersHome() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const totalItems = secretaryUsersData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = secretaryUsersData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className='mt-8 border border-[#E9E9EA] rounded-[12px] p-6'>
            <div className='flex items-center justify-between mb-4'>
                <h3 className='text-2xl text-[#111827] font-medium'>See All Users</h3>
                <div>
                    <div className='flex items-center'>
                        <div className='relative'>
                            <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />
                            <input type="text" className='bg-[#e9e9ea] py-2 pl-12 rounded-[10px] w-[315px]' placeholder='Search secretary user here' />
                        </div>
                        <button className='flex items-center gap-2 p-2.5 cursor-pointer'>
                            <FilterIcon />
                        </button>
                        Filter
                    </div>
                </div>
            </div>
            <DynamicTable
                columns={SecretaryUsersColumn()}
                data={currentData}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalpage={totalPages}
                totalItems={totalItems}
                onPageChange={setCurrentPage}
                setItemsPerPage={setItemsPerPage}
                noDataMessage="No secretary users found"
                loading={false}
            />
        </div>
    )
}
