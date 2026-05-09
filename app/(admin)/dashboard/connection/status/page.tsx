'use client'
import { UserResponsesColumn } from '@/components/columns/UserResponsesColumn'
import DynamicTable from '@/components/reusable/DynamicTable'
import { userResponsesData } from '@/public/demoData/UserResponsesData'
import FilterIcon from '@/components/icons/admin/FilterIcon'
import SearchIcon from '@/components/icons/admin/SearchIcon'
import { useRouter } from 'next/navigation'
import React, { useState, useMemo } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useGetCunnectionStausQuery } from '@/redux/features/connection/connections'


export default function UserResponsesPage() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [tradeFilter, setTradeFilter] = useState('all');
    const [viewRow, setViewRow] = useState({ isOpen: false, rowData: null });
    const [isEditOpen, setIsEditOpen] = useState(false);


    const { data: cunnectionStatus, isLoading } =
        useGetCunnectionStausQuery({
            page: currentPage,
            limit: itemsPerPage,
            search,
            trade_id: tradeFilter === "all" ? "" : tradeFilter,
        });
    console.log("cunnectionStatus: ", cunnectionStatus)

    const Alltrades = cunnectionStatus?.data?.map(
        (item: any) => item?.trade
    );


    // Filtered data based on search and trade
    const currentData = cunnectionStatus?.data || [];

    const totalItems = cunnectionStatus?.meta?.total_items || 0;

    const totalPages = cunnectionStatus?.meta?.total_pages || 1;



    const handleView = (row: any) => {
        setViewRow({ isOpen: true, rowData: row });
    };
    const handleEdit = (row: any) => {
        setIsEditOpen(true);
    };
    const handleDelete = (row: any) => { };
    const handleViewClose = () => {
        setViewRow({ isOpen: false, rowData: null });
    };
    const handleEditClose = () => {
        setIsEditOpen(false);
    };

    return (
        <div className='mt-8'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-[30px] mb-4'>
                <div>
                    <h2 className='text-xl sm:text-2xl text-[#111827] font-medium'>Request Responses From Users</h2>
                </div>
                <div className='w-full sm:w-auto'>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6'>
                        <div className='relative w-full sm:w-auto'>
                            <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />
                            <input
                                type="text"
                                className='bg-[#e9e9ea] py-2 pl-12 pr-4 rounded-[10px] w-full sm:w-[315px] outline-none focus:ring-1 focus:ring-blue-500'
                                placeholder='Search user here'
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                        <button className='flex items-center gap-2 p-2.5 cursor-pointer hover:bg-gray-100 rounded-lg w-full sm:w-auto justify-center'>
                            <FilterIcon />
                            <span className='hidden sm:inline'>Filter</span>
                        </button>
                        <div className='w-full sm:w-auto'>
                            <Select
                                value={tradeFilter}
                                onValueChange={(value) => {
                                    setTradeFilter(value);
                                    setCurrentPage(1);
                                }}
                            >
                                <SelectTrigger className='w-full sm:w-[150px] bg-[#e9e9ea] rounded-[10px]'>
                                    <SelectValue placeholder="Trade Filter" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Trades</SelectItem>
                                    {Alltrades?.map(trade => (
                                        <SelectItem key={trade} value={trade}>{trade}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
            <div className='overflow-x-auto'>
                <DynamicTable
                    columns={UserResponsesColumn({ onEdit: handleEdit })}
                    data={currentData}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalpage={totalPages}
                    totalItems={totalItems}
                    onPageChange={setCurrentPage}
                    setItemsPerPage={setItemsPerPage}
                    noDataMessage="No responses found"
                    loading={false}
                />
            </div>
        </div>
    )
}
