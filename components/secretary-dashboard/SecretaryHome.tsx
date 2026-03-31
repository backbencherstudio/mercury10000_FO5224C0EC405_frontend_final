
'use client'
import React, { useState } from 'react';
import SearchIcon from '../icons/admin/SearchIcon';
import FilterIcon from '../icons/admin/FilterIcon';
import SuccessTik from '../icons/admin/SuccessTik';
import { RequestSupportColumn } from '@/components/columns/RequestSupportColumn';
import DynamicTable from '@/components/reusable/DynamicTable';
import requestSupportData from '@/public/demoData/RequestSupportData';
 


const stateData = [
    {
        title: 'Solved',
        value: 5
    },
    {
        title: 'Pending',
        value: 2
    }
]

export default function SecretaryHome() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalItems = requestSupportData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = requestSupportData.slice(startIndex, startIndex + itemsPerPage);

    const handleWriteNote = (row: any) => {
        // Implement note writing logic here
        alert(`Write note to admin for request ID: ${row.id}`);
    };

    return (
        <div>
            <div className='flex flex-col sm:flex-row gap-3'>
                {
                    stateData.map((item, index) => (
                        <div key={index} className='p-4 bg-[#f6f8fa] flex-1 rounded-[12px] border border-[#E9E9EA] min-w-[140px]'>
                            <h2 className='text-base text-[#64748B]'>{item.title}</h2>
                            <p className='mt-6 text-[#1E293B] text-2xl sm:text-[32px] font-semibold'>{item.value}</p>
                        </div>
                    ))
                }
            </div>
            <div className='border border-[#E9E9EA] p-4 sm:p-6 rounded-[12px] mt-6 w-full'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0'>
                    <h3 className='text-xl sm:text-2xl text-[#111827] font-medium'>Requested Support</h3>
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
                        </div>
                    </div>
                </div>
                <div className='p-4 sm:p-6 border border-[#11B0C1] bg-[#E6F6F4] rounded-[12px] my-4'>
                    <div className='flex items-center gap-1.5'>
                        <SuccessTik />
                        <h3 className='text-base sm:text-lg text-[#1D1F2C] font-semibold'>A Call is Better Than Conversation!</h3>
                    </div>
                    <p className='text-xs sm:text-sm text-[#06030C] mt-4'>Hello Coby! Your morning task is here. Please solve the pending status. Call the users to solve it! They are waiting for you!</p>
                </div>
                <div className='overflow-x-auto'>
                    <DynamicTable
                        columns={RequestSupportColumn({ onView: handleWriteNote })}
                        data={currentData}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalpage={totalPages}
                        totalItems={totalItems}
                        onPageChange={setCurrentPage}
                        setItemsPerPage={setItemsPerPage}
                        noDataMessage="No requests found"
                        loading={false}
                    />
                </div>
            </div>
        </div>
    );
}
