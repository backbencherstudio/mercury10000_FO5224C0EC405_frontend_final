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
        <div className='mt-8 border border-[#DFDFDF] p-6 rounded-[12px]'>
            <div className='flex items-center justify-end mb-4'>
                
                <div>
                    <div className='flex items-center'>
                        <div className='relative'>
                            <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />
                            <input type="text" className='bg-[#e9e9ea] py-2 pl-12 rounded-[10px] w-[315px]' placeholder='Search submitted lead here' />
                        </div>
                        <button className='flex items-center gap-2 p-2.5 cursor-pointer'>
                            <FilterIcon />
                        </button>
                        Filter
                    </div>
                </div>
            </div>
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
    )
}
