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
        <div className='mt-8 border border-[#E9E9EA] rounded-[12px] p-4 sm:p-6'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4'>
                <h3 className='text-xl sm:text-2xl text-[#111827] font-medium'>See All Users</h3>
                <div className='w-full sm:w-auto'>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2'>
                        <div className='relative w-full sm:w-auto'>
                            <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />
                            <input
                                type="text"
                                className='bg-[#e9e9ea] py-2 pl-12 pr-4 rounded-[10px] w-full sm:w-[315px] outline-none focus:ring-1 focus:ring-blue-500'
                                placeholder='Search secretary user here'
                            />
                        </div>
                        <button className='flex items-center gap-2 p-2.5 cursor-pointer hover:bg-gray-100 rounded-lg w-full sm:w-auto justify-center'>
                            <FilterIcon />
                            <span className='hidden sm:inline'>Filter</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className='overflow-x-auto'>
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
        </div>
    )
}
