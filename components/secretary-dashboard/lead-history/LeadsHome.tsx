"use client";

import FilterIcon from '@/components/icons/admin/FilterIcon';
import SearchIcon from '@/components/icons/admin/SearchIcon';
import React, { useMemo, useState } from 'react';

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select';

import { LeadHistoryColumn } from '@/components/columns/LeadHistoryColumn';
import DynamicTable from '@/components/reusable/DynamicTable';

import { useGetLeadsHistorySecrateryQuery } from '@/redux/features/dashboardOverview/dashboardOverView';

export default function LeadsHome() {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const [statusFilter, setStatusFilter] = useState('all');

  const [search, setSearch] = useState("");

  //  API CALL
  const { data: history, isLoading } =
    useGetLeadsHistorySecrateryQuery({});

  //  REAL API DATA
  const allProcess = history?.data || [];
  const filteredData = useMemo(() => {

    let data = [...allProcess];

    if (statusFilter !== "all") {
      data = data.filter(
        (item: any) =>
          item?.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // SEARCH FILTER
    if (search.trim()) {
      data = data.filter((item: any) =>
        item?.name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.lead_no?.toLowerCase().includes(search.toLowerCase()) ||
        item?.address?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return data;

  }, [allProcess, statusFilter, search]);

  //  PAGINATION
  const totalItems = filteredData.length;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  //  SELECT ALL
  const handleSelectAll = (checked: boolean) => {

    const newSelected = new Set(selectedRows);

    currentData.forEach((_, index) => {

      const globalIndex = startIndex + index;

      if (checked) {
        newSelected.add(globalIndex);
      } else {
        newSelected.delete(globalIndex);
      }
    });

    setSelectedRows(newSelected);
  };

  //  SINGLE SELECT
  const handleSelectRow = (
    globalIndex: number,
    checked: boolean
  ) => {

    const newSelected = new Set(selectedRows);

    if (checked) {
      newSelected.add(globalIndex);
    } else {
      newSelected.delete(globalIndex);
    }

    setSelectedRows(newSelected);
  };

  //  TABLE COLUMNS
  const columns = LeadHistoryColumn({
    startIndex,
    selectedRows,
    currentData,
    onSelectAll: handleSelectAll,
    onSelectRow: handleSelectRow,
  });

  return (
    <div>

      <div className='p-4 sm:p-6 border border-[#E9E9EA] rounded-[12px] mt-[30px] w-full'>

        {/* TOP BAR */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-2'>

          {/* SEARCH */}
          <div className='relative w-full sm:w-auto'>

            <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className='bg-[#e9e9ea] py-2 pl-12 pr-4 rounded-[10px] w-full sm:w-[315px] outline-none focus:ring-1 focus:ring-blue-500'
              placeholder='Search user here'
            />

          </div>

          {/* FILTER BUTTON */}
          <button className='flex items-center gap-2 p-2.5 cursor-pointer hover:bg-gray-100 rounded-lg w-full sm:w-auto justify-center'>
            <FilterIcon />
            <span className='hidden sm:inline'>Filter</span>
          </button>

          {/* STATUS FILTER */}
          <div className='w-full sm:w-auto'>

            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}
            >

              <SelectTrigger className='w-full sm:w-[170px] bg-[#e9e9ea] rounded-[10px] ml-0 sm:ml-2'>
                <SelectValue placeholder="Status Filter" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                <SelectItem value="CLOSED">Closed</SelectItem>
                <SelectItem value="INVALID">Invalid</SelectItem>
              </SelectContent>

            </Select>

          </div>

        </div>

        {/* TABLE */}
        <div className='mt-8 overflow-x-auto'>

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
            loading={isLoading}
          />

        </div>

      </div>

    </div>
  );
}