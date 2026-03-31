'use client'
import { SecretarySubmittedColumn } from '@/components/columns/SecretarySubmittedColulmn'
import { secretarySubmittedLeadsData } from '@/public/demoData/SecretarySubmittedLeadsData'
import DynamicTable from '@/components/reusable/DynamicTable'
import FilterIcon from '@/components/icons/admin/FilterIcon'
import SearchIcon from '@/components/icons/admin/SearchIcon'
import React, { useState } from 'react'

export default function SubmittedLeadsHome() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

    const totalItems = secretarySubmittedLeadsData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = secretarySubmittedLeadsData.slice(startIndex, startIndex + itemsPerPage);

    // Selection handlers
    const onSelectAll = (checked: boolean) => {
        const newSelected = new Set(selectedRows);
        if (checked) {
            currentData.forEach((_, idx) => newSelected.add(startIndex + idx));
        } else {
            currentData.forEach((_, idx) => newSelected.delete(startIndex + idx));
        }
        setSelectedRows(newSelected);
    };
    const onSelectRow = (globalIndex: number, checked: boolean) => {
        const newSelected = new Set(selectedRows);
        if (checked) {
            newSelected.add(globalIndex);
        } else {
            newSelected.delete(globalIndex);
        }
        setSelectedRows(newSelected);
    };

    return (
        <div className='mt-8 border border-[#DFDFDF] p-4 sm:p-6 rounded-[12px] w-full'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end mb-4 gap-3 sm:gap-2'>
                <div className='relative w-full sm:w-auto'>
                    <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />
                    <input
                        type="text"
                        className='bg-[#e9e9ea] py-2 pl-12 pr-4 rounded-[10px] w-full sm:w-[315px] outline-none focus:ring-1 focus:ring-blue-500'
                        placeholder='Search submitted lead here'
                    />
                </div>
                <button className='flex items-center gap-2 p-2.5 cursor-pointer hover:bg-gray-100 rounded-lg w-full sm:w-auto justify-center'>
                    <FilterIcon />
                    <span className='hidden sm:inline'>Filter</span>
                </button>
            </div>
            <div className='overflow-x-auto'>
                <DynamicTable
                    columns={SecretarySubmittedColumn({
                        startIndex,
                        selectedRows,
                        currentData,
                        onSelectAll,
                        onSelectRow,
                    })}
                    data={currentData}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalpage={totalPages}
                    totalItems={totalItems}
                    onPageChange={setCurrentPage}
                    setItemsPerPage={setItemsPerPage}
                    noDataMessage="No submitted leads found"
                    loading={false}
                />
            </div>
        </div>
    )
}
