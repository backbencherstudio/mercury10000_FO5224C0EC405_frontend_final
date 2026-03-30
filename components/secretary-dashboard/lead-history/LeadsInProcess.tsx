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
     
      <div className=' p-6 border border-[#E9E9EA] rounded-[12px] mt-[30px]'>
        <div className=' flex items-center justify-end gap-2'>
          <div className=' relative'>
            <SearchIcon className=' absolute top-1/2 -translate-y-1/2 left-4 ' />
            <input type="text" name="" id="" className=' bg-[#e9e9ea] py-2 pl-12 rounded-[10px] w-[315px]' placeholder='Search user here' />
          </div>
        
          <button className=' flex items-center gap-2 p-2.5 cursor-pointer'>
            <FilterIcon />
          </button>
          Filter
            <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className='w-[150px] bg-[#e9e9ea] rounded-[10px] ml-2'>
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
        <div className='mt-8'>
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
