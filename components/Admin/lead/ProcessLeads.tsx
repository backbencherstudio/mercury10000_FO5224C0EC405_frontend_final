"use client";
import FilterIcon from '@/components/icons/admin/FilterIcon';
import SearchIcon from '@/components/icons/admin/SearchIcon';
import React, { useState, useEffect, useMemo } from 'react';
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
import { ProcessLeadsColumn } from '@/components/columns/ProcessLeadsColumn';
import { useGetLeadsProcessQuery } from '@/redux/features/dashboardOverview/dashboardOverView';


export default function ProcessLeads() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchInput.trim()), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter]);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const params = useMemo(() => {
    const p: Record<string, string | number> = {
      page: currentPage,
      limit: itemsPerPage,
    };
    if (statusFilter !== "all") {
      p.status = statusFilter.toUpperCase();
    }
    if (debouncedSearch) {
      p.search = debouncedSearch;
    }
    return p;
  }, [currentPage, itemsPerPage, statusFilter, debouncedSearch]);

  const { data, isLoading, error } = useGetLeadsProcessQuery(params);

  const apiData = data?.data || [];
  const meta = (data as any)?.meta;
  const totalItems = Number(meta?.total_items ?? 0);
  const totalPages = Number(meta?.total_pages ?? 1);

  const handleSelectAll = (checked: boolean) => {
    const newSelected = new Set(selectedRows);
    apiData.forEach((_: any, index: number) => {
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

  const columns = ProcessLeadsColumn({
    startIndex,
    selectedRows,
    currentData: apiData,
    onSelectAll: handleSelectAll,
    onSelectRow: handleSelectRow,
  });

  return (
    <div>
      <div className='rounded-[12px]'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2'>
          <div className='relative w-full sm:w-auto'>
            <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />
            <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className='bg-[#e9e9ea] py-2 pl-12 pr-4 rounded-[10px] w-full sm:w-[315px] outline-none focus:ring-1 focus:ring-blue-500' placeholder='Search user here' />
          </div>
          <button className='flex items-center gap-2 p-2.5 cursor-pointer hover:bg-gray-100 rounded-lg w-full sm:w-auto justify-center'>
            <FilterIcon />
            {/* <span className='hidden sm:inline'>Filter</span> */}
          </button>
          <div className='w-full sm:w-auto'>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='w-full sm:w-[150px] bg-[#e9e9ea] rounded-[10px] ml-0 sm:ml-2'>
                <SelectValue placeholder="Status Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Active_Work">Active Work</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
                <SelectItem value="Invalid">Invalid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='mt-8 overflow-x-auto'>
          <DynamicTable
            columns={columns}
            data={apiData}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalpage={totalPages}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
            setItemsPerPage={(n) => {
              setItemsPerPage(n);
              setCurrentPage(1);
            }}
            showPagination={true}
            noDataMessage="No lead history found"
            loading={isLoading}
            error={
              error
                ? String((error as any)?.data?.message ?? (error as any)?.error ?? "Request failed")
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}
