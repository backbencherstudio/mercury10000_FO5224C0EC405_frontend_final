'use client';
import React, { useState } from 'react';
import FilterIcon from '@/components/icons/admin/FilterIcon';
import SearchIcon from '@/components/icons/admin/SearchIcon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DynamicTable from '@/components/reusable/DynamicTable';
import { requestPoolData } from '@/public/demoData/RequestPoolData';
import { RequestPoolColumn } from '@/components/columns/RequestPoolColumn';
import { usersData } from '@/public/demoData/UsersData';
import { UsersColumn } from '@/components/columns/UsersColumn';
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
    // User table state for modal
    const [userCurrentPage, setUserCurrentPage] = useState(1);
    const [userItemsPerPage, setUserItemsPerPage] = useState(10);
    const [userTradeFilter, setUserTradeFilter] = useState('all');
    const [userSelectedRows, setUserSelectedRows] = useState<Set<string>>(new Set());
    const [userSearch, setUserSearch] = useState('');
    // User table filter logic
    const userAllTrades = Array.from(new Set(usersData.map((row) => row.trade)));
    const userFilteredData = usersData.filter(row => {
        const tradeMatch = userTradeFilter === 'all' || row.trade === userTradeFilter;
        const searchMatch = userSearch.trim() === '' || row.name.toLowerCase().includes(userSearch.trim().toLowerCase());
        return tradeMatch && searchMatch;
    });
    const userTotalItems = userFilteredData.length;
    const userTotalPages = Math.ceil(userTotalItems / userItemsPerPage);
    const userStartIndex = (userCurrentPage - 1) * userItemsPerPage;
    const userCurrentData = userFilteredData.slice(userStartIndex, userStartIndex + userItemsPerPage);

        const handleUserSelectAll = (checked: boolean) => {
            if (checked) {
                setUserSelectedRows(new Set(userCurrentData.map(row => row.userId)));
            } else {
                setUserSelectedRows(new Set());
            }
        };
        const handleUserSelectRow = (id: string, checked: boolean) => {
            setUserSelectedRows(prev => {
                const next = new Set(prev);
                if (checked) next.add(id); else next.delete(id);
                return next;
            });
        };
        const userColumns = UsersColumn({
            selectedRows: userSelectedRows,
            handleSelectAll: handleUserSelectAll,
            handleSelectRow: handleUserSelectRow,
            currentData: userCurrentData,
        });
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
                        <DialogContent className="sm:max-w-6xl p-6 rounded-xl shadow-lg">
                            <DialogHeader>
                                 <h2 className=' text-center text-2xl text-[#111827] font-medium'>Send A Connection Request</h2>
                            </DialogHeader>
                            <div className='flex items-center justify-between gap-2 mb-6'>
                                <div className='relative'>
                                    <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />
                                    <input
                                        type="text"
                                        className='bg-[#e9e9ea] py-2 pl-12 rounded-[10px] w-[315px]'
                                        placeholder='Search user here'
                                        value={userSearch}
                                        onChange={e => {
                                            setUserSearch(e.target.value);
                                            setUserCurrentPage(1);
                                        }}
                                    />
                                </div>
                                <div className=' flex items-center gap-2.5'>
                                    <button className='flex items-center gap-2 p-2.5 cursor-pointer'>
                                        <FilterIcon />
                                        Filter
                                    </button>
                                    <Select value={userTradeFilter} onValueChange={value => { setUserTradeFilter(value); setUserCurrentPage(1); }}>
                                        <SelectTrigger className='w-[150px] bg-[#e9e9ea] rounded-[10px] ml-2'>
                                            <SelectValue placeholder="Trade Filter" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Trades</SelectItem>
                                            {userAllTrades.map(trade => (
                                                <SelectItem key={trade} value={trade}>{trade}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <DynamicTable
                                    columns={userColumns}
                                    data={userCurrentData}
                                    currentPage={userCurrentPage}
                                    itemsPerPage={userItemsPerPage}
                                    totalpage={userTotalPages}
                                    totalItems={userTotalItems}
                                    onPageChange={setUserCurrentPage}
                                    setItemsPerPage={setUserItemsPerPage}
                                    showPagination={true}
                                    noDataMessage="No users found"
                                    loading={false}
                                />
                            </div>
                            <div className=' flex items-center justify-center gap-8'>
                                <button className=' p-3 border border-[#D2D2D5] rounded-[8px] w-[248px] cursor-pointer'>Cancel</button>
                                <button className=' p-3 rounded-[8px] bg-[#0b7680] text-white text-base  cursor-pointer w-[248px]'>Send Connection</button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Note View Dialog (static, styled like lead view) */}
            <Dialog open={!!viewNote} onOpenChange={open => !open && setViewNote(null)}>
                <DialogContent className="sm:max-w-[980px] p-6">
                    <h3 className="text-[32px] text-[#070707] font-medium text-center">Connection View</h3>
                    <div className="mt-8 space-y-8">
                        <div className="space-y-5">
                            <div className="border-b border-[#e9e9ea] pb-2.5">
                                <div className="flex items-center gap-2">
                                    
                                    <h3 className="text-base text-[#070707] font-medium">City</h3>
                                </div>
                                <p className="text-sm text-[#777980] mt-2.5">123 Main St, Los Angeles</p>
                            </div>
                            <div className="border-b border-[#e9e9ea] pb-2.5">
                                <div className="flex items-center gap-2">
                                    
                                    <h3 className="text-base text-[#070707] font-medium">Trade</h3>
                                </div>
                                <p className="text-sm text-[#777980] mt-2.5">Electrician</p>
                            </div>
                          
                            <div className="border-b border-[#e9e9ea] pb-2.5">
                                <div>
                                    <h3 className="text-base text-[#070707] font-medium">Trade</h3>
                                </div>
                                <p className="text-sm text-[#777980] mt-2.5">Plumbing</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-base text-[#070707] font-medium">Notes</h3>
                            <p className="text-[#777980] text-sm mt-2.5">The lead is located on 123 Main St. The owner’s name is John Smith. He has some roof leaking issue. I’ve shared some images based on specific objective.</p>
                            <p className="text-[#777980] text-sm mt-5">Please see the images below for this specific lead.</p>
                        </div>
                        <div>
                            <h3 className="text-base text-[#070707] font-medium">Images (3)</h3>
                            <div className="flex flex-col md:flex-row items-center gap-2.5 mt-2.5">
                                {[...Array(3)].map((_, index) => (
                                    <div className="flex-1 w-full" key={index}>
                                        <div className="h-[117px] border rounded-lg"></div>
                                        <p className="text-center text-xs text-[#4A4C56] mt-1.5">image {index + 1}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
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
