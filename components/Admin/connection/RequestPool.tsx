'use client';
import React, { useState } from 'react';
import FilterIcon from '@/components/icons/admin/FilterIcon';
import SearchIcon from '@/components/icons/admin/SearchIcon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DynamicTable from '@/components/reusable/DynamicTable';
import { requestPoolData } from '@/public/demoData/RequestPoolData';
import { RequestPoolColumn } from '@/components/columns/RequestPoolColumn';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose
} from '@/components/ui/dialog';


export default function RequestPool() {
    // Dialog state for viewing note details
    const [viewNote, setViewNote] = useState<string | null>(null);
    const [editRow, setEditRow] = useState<any | null>(null);
    const [deleteRow, setDeleteRow] = useState<any | null>(null);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [sendDialogOpen, setSendDialogOpen] = useState(false);
    const [tradeFilter, setTradeFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Get unique trades for filter dropdown
    const allTrades = Array.from(new Set(requestPoolData.map((row) => row.Trade)));

    // Filter data by trade
    const filteredData = tradeFilter === 'all'
        ? requestPoolData
        : requestPoolData.filter((row) => row.Trade === tradeFilter);

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedRows(new Set(currentData.map(row => row.id)));
        } else {
            setSelectedRows(new Set());
        }
    };
    const handleSelectRow = (id: string, checked: boolean) => {
        setSelectedRows(prev => {
            const next = new Set(prev);
            if (checked) next.add(id); else next.delete(id);
            return next;
        });
    };

    // Action column for view, edit, delete
    const handleView = (row: any) => setViewNote(row.note);
    const handleEdit = (row: any) => setEditRow(row);
    const handleDelete = (row: any) => setDeleteRow(row);

    const columns = RequestPoolColumn({
        selectedRows,
        handleSelectAll,
        handleSelectRow,
        handleView,
        handleEdit,
        handleDelete,
        currentData,
        setViewNote,
    });

    return (
        <div>
            <div className='flex items-center justify-between gap-2 mt-[30px]'>
                <div>
                    <h2 className='text-2xl text-[#111827] font-medium'>Send a Connection Request To User</h2>
                </div>
                <div className='flex items-center gap-6'>
                    <div className='relative'>
                        <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />
                        <input type="text" className='bg-[#e9e9ea] py-2 pl-12 rounded-[10px] w-[315px]' placeholder='Search user here' />
                    </div>
                    <button className='flex items-center gap-2 p-2.5 cursor-pointer'>
                        <FilterIcon />
                        Filter
                    </button>
                    <Select value={tradeFilter} onValueChange={value => { setTradeFilter(value); setCurrentPage(1); }}>
                        <SelectTrigger className='w-[150px] bg-[#e9e9ea] rounded-[10px]'>
                            <SelectValue placeholder="Trade Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Trades</SelectItem>
                            {allTrades.map(trade => (
                                <SelectItem key={trade} value={trade}>{trade}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="mt-8 w-full">
                <DynamicTable
                    columns={columns}
                    data={currentData}
                    showPagination={true}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalpage={totalPages}
                    totalItems={totalItems}
                    onPageChange={setCurrentPage}
                    setItemsPerPage={setItemsPerPage}
                    // Optionally add loading, error, etc.
                />

                <div className=' flex items-center justify-end mt-8'>
                    <Dialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
                        <DialogTrigger asChild>
                            <button className=' py-3 bg-[#0b7680] rounded-[8px] w-3xs text-base text-white cursor-pointer '>Send Connection</button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md p-8 rounded-xl shadow-lg">
                            <DialogHeader>
                                <DialogTitle className="text-black text-2xl font-bold flex items-center gap-2">
                                    Send Connection
                                </DialogTitle>
                            </DialogHeader>
                            <div className="text-base text-[#4a4c56] mt-4">Are you sure you want to send a connection request?</div>
                            <div className="flex justify-end gap-2 mt-6">
                                <DialogClose asChild>
                                    <button className="px-4 py-2 bg-gray-200 text-black rounded" type="button">Cancel</button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <button className="px-4 py-2 bg-[#0b7680] text-white rounded" type="button">Confirm</button>
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Note View Dialog */}
            <Dialog open={!!viewNote} onOpenChange={open => !open && setViewNote(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Note Details</DialogTitle>
                    </DialogHeader>
                    <div className="text-base text-[#4a4c56] whitespace-pre-line">{viewNote}</div>
                    <DialogClose asChild>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" type="button">Close</button>
                    </DialogClose>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editRow} onOpenChange={open => !open && setEditRow(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Request</DialogTitle>
                    </DialogHeader>
                    <div className="text-base text-[#4a4c56] whitespace-pre-line">
                        {editRow ? (
                            <>
                                <div>ID: {editRow.id}</div>
                                <div>City: {editRow.city}</div>
                                <div>Trade: {editRow.Trade}</div>
                                <div>Note: {editRow.note}</div>
                            </>
                        ) : null}
                    </div>
                    <DialogClose asChild>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" type="button">Close</button>
                    </DialogClose>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={!!deleteRow} onOpenChange={open => !open && setDeleteRow(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Request</DialogTitle>
                    </DialogHeader>
                    <div className="text-base text-[#4a4c56] whitespace-pre-line">
                        {deleteRow ? (
                            <>
                                <div>Are you sure you want to delete this request?</div>
                                <div>ID: {deleteRow.id}</div>
                                <div>City: {deleteRow.city}</div>
                                <div>Trade: {deleteRow.Trade}</div>
                            </>
                        ) : null}
                    </div>
                    <DialogClose asChild>
                        <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded" type="button">Cancel</button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </div>
    );
}
