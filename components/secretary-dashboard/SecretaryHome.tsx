
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
            <div className=' flex items-center gap-3'>
                {
                    stateData.map((item, index) => (
                        <div key={index} className=' p-4  bg-[#f6f8fa] flex-1 rounded-[12px] border border-[#E9E9EA]'>
                            <h2 className=' text-base text-[#64748B]'>{item.title}</h2>
                            <p className=' mt-6 text-[#1E293B] text-[32px] font-semibold'>{item.value}</p>
                        </div>
                    ))
                }
            </div>
            <div className=' border border-[#E9E9EA] p-6 rounded-[12px] mt-6'>
                <div className=' flex items-center justify-between  '>
                    <h3 className=' text-2xl text-[#111827] font-medium'>Requested Support</h3>
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
                <div className=' p-6 border border-[#11B0C1] bg-[#E6F6F4] rounded-[12px] my-4'>
                    <div className=' flex items-center gap-1.5'>
                        <SuccessTik />
                        <h3 className=' text-lg text-[#1D1F2C] font-semibold'>A Call is Better Than Conversation!</h3>
                    </div>
                    <p className=' text-sm text-[#06030C] mt-4'>Hello Coby! Your morning task is here. Please solve the pending status. Call the users to solve it! They are waiting for you!</p>
                </div>
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
    );
}
