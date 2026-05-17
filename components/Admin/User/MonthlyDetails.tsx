'use client'
import { SpecificFinancialActivity, SpecificFinancialActivityColumn } from '@/components/columns/SpecificFinancialActivityColumn'
import DynamicTable from '@/components/reusable/DynamicTable'
import { SpecificFinancialActivityData } from '@/public/demoData/SpecificFinancialActivityData'
import FilterIcon from '@/components/icons/admin/FilterIcon'
import SearchIcon from '@/components/icons/admin/SearchIcon'
import React, { useState } from 'react'
import { useGetSpecificActivityQuery } from '@/redux/features/user/user'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"



export default function MonthlyDetails() {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [search, setSearch] = useState("")

    const [selectedRow, setSelectedRow] = useState<any | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const { data, isLoading, error } = useGetSpecificActivityQuery({
        page: currentPage,
        limit: itemsPerPage,
        search,
        startDate,
        endDate
    });


    const SpecificData = data?.data || [];

    const statsData = [
        {
            title: 'Total Lead Submitted',
            value: SpecificData?.length
        },
        {
            title: 'Qualified Leads',
            value: SpecificData.filter(
                (item: any) => item.status === "pending"
            ).length,
        },
        {
            title: 'Conversion',
            value: SpecificData.filter(
                (item: any) => item.status === "RESOLVED"
            ).length,
        }
    ]
    // console.log(SpecificData, 'SpecificData');

    const totalPages = data?.pagination?.totalPages || 1;
    const totalItems = data?.pagination?.totalItems || 0;
    const handleView = (row: any) => {
        setSelectedRow(row);
        setIsDialogOpen(true);
    }
    const handleDownload = () => {
        console.log('done')
    }
    const handlePrint = () => {
        console.log('done')
    }

    return (
        <div className='mt-8'>
            <div className='grid grid-cols-3 gap-3'>
                {statsData.map((item, index) => (
                    <div key={index} className='p-4 bg-[#f6f8fa] rounded-[12px] border border-[#E9E9EA]'>
                        <p className='text-base text-[#64748B]'>{item.title}</p>
                        <h2 className='text-[32px] mt-[26px]'>{item.value}</h2>
                    </div>
                ))}
            </div>

            <div className='mt-[27px]'>
                <h2 className='text-2xl text-[#111827] font-medium'>See Specific Financial Activity Here</h2>
                <div className='flex items-center justify-between my-4'>

                    {/* DATE RANGE */}
                    <div className='flex items-center gap-3'>

                        {/* START DATE */}
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.target.value)
                                setCurrentPage(1)
                            }}
                            className='px-4 py-2.5 border rounded-[10px]'
                        />

                        <span className='text-gray-500'>to</span>

                        {/* END DATE */}
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value)
                                setCurrentPage(1)
                            }}
                            className='px-4 py-2.5 border rounded-[10px]'
                        />
                    </div>

                    {/* SEARCH + FILTER */}
                    <div className='flex items-center'>
                        <div className='relative'>
                            <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                    setCurrentPage(1)
                                }}
                                className='bg-[#e9e9ea] py-2 pl-12 rounded-[10px] w-[315px]'
                                placeholder='Search by name, lead no or address'
                            />
                        </div>

                        <button className='flex items-center gap-2 p-2.5 cursor-pointer'>
                            <FilterIcon />
                            Filter
                        </button>
                    </div>
                </div>

                <DynamicTable
                    data={SpecificData}
                    columns={SpecificFinancialActivityColumn({
                        onView: handleView,
                        onDownload: handleDownload,
                        onPrint: handlePrint
                    })}

                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalpage={totalPages}
                    totalItems={totalItems}
                    onPageChange={setCurrentPage}
                    setItemsPerPage={setItemsPerPage}
                    noDataMessage="No users found"
                    loading={isLoading}
                />
            </div>

            {/* View Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px] w-full bg-white p-6">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-medium mb-4">Financial Activity Details</DialogTitle>
                    </DialogHeader>
                    {selectedRow && (
                        <div className="space-y-4">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-sm font-medium text-gray-500">Lead Number</span>
                                <span className="text-sm text-gray-900">{selectedRow.lead_no}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-sm font-medium text-gray-500">Name</span>
                                <span className="text-sm text-gray-900">{selectedRow.name}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-sm font-medium text-gray-500">Phone</span>
                                <span className="text-sm text-gray-900">{selectedRow.phone}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-sm font-medium text-gray-500">Collected</span>
                                <span className="text-sm text-gray-900">{selectedRow.collected ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-sm font-medium text-gray-500">Lead Submitted Address</span>
                                <span className="text-sm text-gray-900 text-right max-w-[60%]">{selectedRow.lead_submitted_addr || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-sm font-medium text-gray-500">Qualified Leads Address</span>
                                <span className="text-sm text-gray-900 text-right max-w-[60%]">{selectedRow.qualified_leads_addr || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-sm font-medium text-gray-500">Conversation Address</span>
                                <span className="text-sm text-gray-900 text-right max-w-[60%]">{selectedRow.conversation_addr || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-sm font-medium text-gray-500">To Company</span>
                                <span className="text-sm text-gray-900 text-right max-w-[60%]">{selectedRow.to_company || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-sm font-medium text-gray-500">Starting Date</span>
                                <span className="text-sm text-gray-900">{selectedRow.starting_date}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-sm font-medium text-gray-500">Status</span>
                                <span className="text-sm text-gray-900">{selectedRow.status}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-sm font-medium text-gray-500">Created At</span>
                                <span className="text-sm text-gray-900">{new Date(selectedRow.created_at).toLocaleString()}</span>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}   