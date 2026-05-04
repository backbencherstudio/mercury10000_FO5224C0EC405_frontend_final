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
import DynamicTable from '@/components/reusable/DynamicTable';
import { useGetLeadsHistoryQuery } from '@/redux/features/dashboardOverview/dashboardOverView';


export default function LeadHistoryHome() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());



const { data, isLoading } = useGetLeadsHistoryQuery({
  page: currentPage,
  limit: itemsPerPage,
  search: searchText,
  trade_id: "",   // optional
  status: statusFilter === "all" ? "" : statusFilter,
});
const leadsHistory = data?.data || [];
const totalItems = data?.meta?.total_items || 0;
const totalPages = data?.meta?.total_pages || 1;

const filteredData =
  statusFilter === 'all'
    ? leadsHistory
    : leadsHistory.filter(
        (item) =>
          (item.status || '').toLowerCase() === statusFilter.toLowerCase()
      );


const startIndex = (currentPage - 1) * itemsPerPage;

const currentData = filteredData.slice(
  startIndex,
  startIndex + itemsPerPage
);
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
      <div className='p-4 sm:p-6 border border-[#E9E9EA] rounded-[12px] mt-[30px]'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2'>
          <div className='relative w-full sm:w-auto'>
  <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />

  <input
  type="text"
  value={searchText}
  onChange={(e) => {
    setCurrentPage(1);
    setSearchText(e.target.value);
  }}
  className="bg-[#e9e9ea] py-2 pl-12 pr-4 rounded-[10px] w-full sm:w-[315px]"
  placeholder="Search user here"
/>
</div>
          <button className='flex items-center gap-2 p-2.5 cursor-pointer hover:bg-gray-100 rounded-lg w-full sm:w-auto justify-center'>
            <FilterIcon />
            <span className='hidden sm:inline'>Filter</span>
          </button>
          <div className='w-full sm:w-auto'>
            <Select
  value={statusFilter}
  onValueChange={(value) => {
    setCurrentPage(1);
    setStatusFilter(value);
  }}
>
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
  totalpage={totalPages}
  totalItems={totalItems}
  onPageChange={setCurrentPage}
  setItemsPerPage={setItemsPerPage}
  showPagination={true}
  noDataMessage="No lead history found"

/>
        </div>
      </div>
    </div>
  );
}
