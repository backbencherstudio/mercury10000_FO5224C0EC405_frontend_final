'use client';
import FilterIcon from '@/components/icons/admin/FilterIcon';
import SearchIcon from '@/components/icons/admin/SearchIcon';
import React, { useState } from 'react';
import { LeadHistoryColumn } from '@/components/columns/LeadHistoryColumn';
import { leadHistoryData } from '@/public/demoData/LeadHistoryData';
import DynamicTable from '@/components/reusable/DynamicTable';

export default function LeadHistoryHome() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const totalItems = leadHistoryData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = leadHistoryData.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    const newSelected = new Set(selectedRows);
    currentData.forEach((_, index) => {
      const globalIndex = startIndex + index;
      checked ? newSelected.add(globalIndex) : newSelected.delete(globalIndex);
    });
    setSelectedRows(newSelected);
  };

  const handleSelectRow = (globalIndex: number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    checked ? newSelected.add(globalIndex) : newSelected.delete(globalIndex);
    setSelectedRows(newSelected);
  };

  const columns = LeadHistoryColumn({
    startIndex,
    selectedRows,
    currentData,
    onSelectAll: handleSelectAll,
    onSelectRow: handleSelectRow,
    // Optionally add onView, onEdit, onDelete handlers here
  });

  return (
    <div>
      <div className=' p-2.5 border-b-2 border-[#11BECF] inline-block'>
        <h3 className=' text-lg text-[#0E93A1] font-medium'>Lead History</h3>
      </div>
      <div className=' p-6 border border-[#E9E9EA] rounded-[12px] mt-[30px]'>
        <div className=' flex items-center justify-end'>
          <div className=' relative'>
            <SearchIcon className=' absolute top-1/2 -translate-y-1/2 left-4 ' />
            <input type="text" name="" id="" className=' bg-[#e9e9ea] py-2 pl-12 rounded-[10px] w-[315px]' placeholder='Search user here' />
          </div>
          <button className=' flex items-center gap-2 p-2.5 cursor-pointer'>
            <FilterIcon />
          </button>
          Filter
        </div>
        <div className='mt-8'>
          <DynamicTable
            columns={columns}
            data={currentData}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalpage={totalPages}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
            showPagination={true}
            noDataMessage="No lead history found"
            loading={false}
          />
        </div>
      </div>
    </div>
  );
}
