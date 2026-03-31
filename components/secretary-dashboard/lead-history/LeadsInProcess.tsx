"use client";
import FilterIcon from '@/components/icons/admin/FilterIcon';
import SearchIcon from '@/components/icons/admin/SearchIcon';
import React, { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select';
import { LeadHistoryColumn } from '@/components/columns/LeadHistoryColumn';
import { leadHistoryData } from '@/public/demoData/LeadHistoryData';
import DynamicTable from '@/components/reusable/DynamicTable';


export default function LeadsInProcess() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [statusFilter, setStatusFilter] = useState('all');

  const totalItems = leadHistoryData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const filteredData = statusFilter === 'all'
    ? leadHistoryData
    : leadHistoryData.filter(item => (item.status || '').toLowerCase() === statusFilter.toLowerCase());
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const filteredTotalItems = filteredData.length;
  const filteredTotalPages = Math.ceil(filteredTotalItems / itemsPerPage);

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
      <div className='p-4 sm:p-6 border border-[#E9E9EA] rounded-[12px] mt-[30px] w-full'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-2'>
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
          <div className='w-full sm:w-auto'>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='w-full sm:w-[150px] bg-[#e9e9ea] rounded-[10px] ml-0 sm:ml-2'>
                <SelectValue placeholder="Status Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Active Work">Active Work</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
                <SelectItem value="Invalid">Invalid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='mt-8 overflow-x-auto'>
          <DynamicTable
            columns={columns}
            data={currentData}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalpage={filteredTotalPages}
            totalItems={filteredTotalItems}
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
