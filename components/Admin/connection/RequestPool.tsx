'use client';
import React, { useMemo, useState } from 'react';
import FilterIcon from '@/components/icons/admin/FilterIcon';
import SearchIcon from '@/components/icons/admin/SearchIcon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DynamicTable from '@/components/reusable/DynamicTable';
import { RequestPoolColumn } from '@/components/columns/RequestPoolColumn';
import { useGetAllUsersQuery } from '@/redux/features/auth/authApi';
import { UsersColumn } from '@/components/columns/UsersColumn';
import confirmImg from '@/public/images/admin/confirm-img.png'
import bigStar from '@/public/images/admin/big-star.png'
import smallStar from '@/public/images/admin/little-star.png'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose
} from '@/components/ui/dialog';
import { CloudCog } from 'lucide-react';
import { useGetRequestPoolQuery, useUpdateUserRequestSentMutation, useDeleteConnectionRequestMutation } from '@/redux/features/connection/connections';
import toast from 'react-hot-toast';
import Image from 'next/image';


export default function RequestPool() {
    // Dialog state for viewing note details
    const [viewRow, setViewRow] = useState<any | null>(null);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [sendDialogOpen, setSendDialogOpen] = useState(false);
    // User table state for modal
    const [userCurrentPage, setUserCurrentPage] = useState(1);
    const [userItemsPerPage, setUserItemsPerPage] = useState(10);
    const [userTradeFilter, setUserTradeFilter] = useState('all');

    const [successModalOpen, setSuccessModalOpen] = useState(false);

    console.log("userTradeFilter", userTradeFilter)
    const [userSelectedRows, setUserSelectedRows] = useState<Set<string>>(new Set());
    const [userSearch, setUserSearch] = useState('');

    const { data: userData, isLoading: isUserLoading } = useGetAllUsersQuery({ page: 1, limit: 100 });

    const usersData = useMemo(() => {
        return Array.isArray(userData?.data) ? userData.data : [];
    }, [userData]);

    const { data, isLoading, error } = useGetRequestPoolQuery({});
    const requestPoolData = useMemo(() => {
        const rawData = data?.data;
        if (!rawData) return [];
        return Array.isArray(rawData) ? rawData : Object.values(rawData);
    }, [data]);

    const getTradeName = (row: any) => {
        if (!row) return "";
        if (typeof row.trade === "string") return row.trade;
        if (row.trade?.name) return row.trade.name;
        return "";
    };
    const lockedTrade = useMemo(() => {
        if (selectedRows.size === 0) return null;
        const firstId = Array.from(selectedRows)[0];
        const firstRow = requestPoolData.find((r: any) => r.id === firstId);
        return getTradeName(firstRow) || null;
    }, [selectedRows, requestPoolData]);

    const [userSend, { isLoading: isSending }] = useUpdateUserRequestSentMutation();

    const handleBulkSend = async () => {
        const userIds = Array.from(userSelectedRows);
        const requestIds = Array.from(selectedRows);

        if (userIds.length === 0 || requestIds.length === 0) return;

        try {
            await Promise.all(
                requestIds.map(requestId =>
                    userSend({
                        id: requestId,
                        data: { user_ids: userIds }
                    }).unwrap()
                )
            );

            setSendDialogOpen(false);
            setSelectedRows(new Set());
            setUserSelectedRows(new Set());


            setSuccessModalOpen(true);

        } catch (err) {
            console.error('Bulk send failed:', err);
        }
    };

    // User table filter logic
    const userAllTrades = useMemo(() => {
        const trades = new Set<string>();
        usersData.forEach((user: any) => {
            if (Array.isArray(user.trades)) {
                user.trades.forEach((t: any) => {
                    if (t.name) trades.add(t.name);
                });
            }
        });
        return Array.from(trades);
    }, [usersData]);

    const userFilteredData = useMemo(() => {
        return usersData.filter((row: any) => {

            const trades = Array.isArray(row?.trades)
                ? row.trades
                : [];

            const tradeMatch =
                userTradeFilter === 'all' ||
                trades.some((t: any) => t?.name === userTradeFilter);

            const searchMatch =
                userSearch.trim() === '' ||
                row?.name?.toLowerCase().includes(userSearch.trim().toLowerCase());

            return tradeMatch && searchMatch;
        });
    }, [usersData, userTradeFilter, userSearch]);


    const userTotalItems = userFilteredData.length;
    const userTotalPages = Math.ceil(userTotalItems / userItemsPerPage);
    const userStartIndex = (userCurrentPage - 1) * userItemsPerPage;

    const userCurrentData = useMemo(() => {
        const sliced = userFilteredData.slice(userStartIndex, userStartIndex + userItemsPerPage);
        // Map to match UsersColumn expected format
        return sliced.map((user: any) => ({
            ...user,
            userId: user.id, // UsersColumn expects userId
            trade: Array.isArray(user.trades) ? user.trades.map((t: any) => t.name).join(', ') : '-'
        }));
    }, [userFilteredData, userStartIndex, userItemsPerPage]);

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
    const [search, setSearch] = useState('');

    // Get unique trades for filter dropdown
    const allTrades = useMemo(() => {
        if (!Array.isArray(requestPoolData)) return [];

        const trades = requestPoolData
            .map((row: any) => getTradeName(row))
            .filter((t: string) => t && t.trim() !== "");

        return Array.from(new Set(trades));
    }, [requestPoolData]);

    // Filter data by trade and search
    const filteredData = useMemo(() => {
        return requestPoolData.filter((row: any) => {
            const tradeName = getTradeName(row);
            const tradeMatch = tradeFilter === 'all' || tradeName === tradeFilter;
            const searchTerm = search.trim().toLowerCase();
            const searchMatch = searchTerm === '' ||
                tradeName.toLowerCase().includes(searchTerm) ||
                (row.location || '').toLowerCase().includes(searchTerm) ||
                (row.id || '').toLowerCase().includes(searchTerm);
            return tradeMatch && searchMatch;
        });
    }, [requestPoolData, tradeFilter, search]);

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);



    const handleSelectRow = (id: string, checked: boolean) => {
        if (checked) {
            // Single select logic: replace selection
            setSelectedRows(new Set([id]));
        } else {
            setSelectedRows(prev => {
                const next = new Set(prev);
                next.delete(id);
                return next;
            });
        }
    };

    // Action column for view, edit, delete
    const handleView = (row: any) => setViewRow(row);
    const [deleteConnection] = useDeleteConnectionRequestMutation();

    const handleDelete = async (row: any) => {
        try {
            await deleteConnection(row.id).unwrap();
            toast.success('Connection request deleted successfully');
        } catch (err) {
            // console.error('Delete failed:', err);
            toast.error('Failed to delete connection request');
        }
    };

    const columns = RequestPoolColumn({
        selectedRows,
        handleSelectRow,
        handleView,
        handleDelete,
        currentData,
        lockedTrade,
    });

    return (
        <div>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-[30px]'>
                <div>
                    <h2 className='text-xl sm:text-2xl text-[#111827] font-medium'>Send a Connection Request To User</h2>
                </div>
                <div className='w-full sm:w-auto'>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6'>
                        <div className='relative w-full sm:w-auto'>
                            <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />
                            <input
                                type="text"
                                className='bg-[#e9e9ea] py-2 pl-12 pr-4 rounded-[10px] w-full sm:w-[315px] outline-none focus:ring-1 focus:ring-blue-500'
                                placeholder='Search here (ID, City, Trade)'
                                value={search}
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
                            <Select value={tradeFilter} onValueChange={value => { setTradeFilter(value); setCurrentPage(1); }}>
                                <SelectTrigger className='w-full sm:w-[150px] bg-[#e9e9ea] rounded-[10px]'>
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
                </div>
            </div>

            <div className="mt-8 w-full overflow-x-auto">
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
                />

                <div className=' flex items-center justify-end mt-8 '>
                    <Dialog
                        open={sendDialogOpen}
                        onOpenChange={(open) => {
                            setSendDialogOpen(open);
                            if (open && lockedTrade) {
                                setUserTradeFilter(lockedTrade);
                            }
                        }}
                    >
                        <DialogTrigger asChild>
                            <button
                                disabled={selectedRows.size === 0}
                                className={`py-3 rounded-[8px] w-3xs text-base text-white cursor-pointer ${selectedRows.size === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0b7680]'}`}
                            >
                                Send Connection
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-6xl p-6 rounded-xl shadow-lg overflow-x-scroll overflow-y-scroll">
                            <DialogHeader>
                                <h2 className=' text-center text-2xl text-[#111827] font-medium'>Send A Connection Request</h2>
                            </DialogHeader>
                            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6'>
                                <div className='relative w-full sm:w-auto'>
                                    <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />
                                    <input
                                        type="text"
                                        className='bg-[#e9e9ea] py-2 pl-12 pr-4 rounded-[10px] w-full sm:w-[315px] outline-none focus:ring-1 focus:ring-blue-500'
                                        placeholder='Search user here'
                                        value={userSearch}
                                        onChange={e => {
                                            setUserSearch(e.target.value);
                                            setUserCurrentPage(1);
                                        }}
                                    />
                                </div>
                                <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2.5 w-full sm:w-auto'>
                                    <button className='flex items-center gap-2 p-2.5 cursor-pointer hover:bg-gray-100 rounded-lg w-full sm:w-auto justify-center'>
                                        <FilterIcon />
                                        <span className='hidden sm:inline'>Filter</span>
                                    </button>
                                    <div className='w-full sm:w-auto'>
                                        <Select
                                            value={userTradeFilter}
                                            onValueChange={(value) => {
                                                setUserTradeFilter(value);
                                                setUserCurrentPage(1);
                                            }}
                                        >
                                            <SelectTrigger className='w-full sm:w-[150px] bg-[#e9e9ea] rounded-[10px]'>
                                                <SelectValue placeholder="Trade Filter" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="all">All Trades</SelectItem>

                                                {userAllTrades.map((trade: any) => (
                                                    <SelectItem key={trade} value={trade}>
                                                        {trade}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4 overflow-y-scroll max-h-[calc(80vh-200px)]'>
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
                                    loading={isUserLoading}
                                />
                            </div>
                            <div className=' flex items-center justify-center gap-8'>
                                <button
                                    onClick={() => setSendDialogOpen(false)}
                                    className=' p-3 border border-[#D2D2D5] rounded-[8px] w-[248px] cursor-pointer'
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleBulkSend}
                                    disabled={userSelectedRows.size === 0 || isSending}
                                    className={`p-3 rounded-[8px] text-white text-base cursor-pointer w-[248px] ${userSelectedRows.size === 0 || isSending ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0b7680]'}`}
                                >
                                    {isSending ? 'Sending...' : 'Send Connection'}
                                </button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Note View Dialog (static, styled like lead view) */}
            <Dialog open={!!viewRow} onOpenChange={open => !open && setViewRow(null)}>
                <DialogContent className="sm:max-w-[980px] p-6">
                    <h3 className="text-[32px] text-[#070707] font-medium text-center">Connection View</h3>
                    <div className="mt-8 space-y-8">
                        <div className="space-y-5">
                            <div className="border-b border-[#e9e9ea] pb-2.5">
                                <div className="flex items-center gap-2">

                                    <h3 className="text-base text-[#070707] font-medium">City</h3>
                                </div>
                                <p className="text-sm text-[#777980] mt-2.5">{viewRow?.location || '-'}</p>
                            </div>
                            <div className="border-b border-[#e9e9ea] pb-2.5">
                                <div className="flex items-center gap-2">

                                    <h3 className="text-base text-[#070707] font-medium">Trade</h3>
                                </div>
                                <p className="text-sm text-[#777980] mt-2.5">{viewRow?.trade?.name || 'N/A'}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-base text-[#070707] font-medium">Notes</h3>
                            <p className="text-[#777980] text-sm mt-2.5">{viewRow?.description || 'No notes available.'}</p>
                        </div>
                        {viewRow?.files && viewRow.files.length > 0 && (
                            <div>
                                <h3 className="text-base text-[#070707] font-medium">Images ({viewRow.files.length})</h3>
                                <div className="flex flex-wrap gap-2.5 mt-2.5 w-full">
                                    {viewRow.files.map((file: any, index: number) => (
                                        <div className="w-[120px]" key={index}>
                                            <div className="h-[90px] sm:h-[117px] border rounded-lg overflow-hidden">
                                                <img src={file.url || file.path} alt={`image ${index + 1}`} className="w-full h-full object-cover" />
                                            </div>
                                            <p className="text-center text-xs text-[#4A4C56] mt-1.5">image {index + 1}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={successModalOpen} onOpenChange={setSuccessModalOpen}>
                <DialogContent className="sm:max-w-md text-center p-8">

                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                            <div className="flex justify-center items-center">
                                <div className="relative ">
                                    <Image src={confirmImg} alt="confirm img" className="z-10 relative  " />
                                    {/* <Image src={bigStar} alt="big star" className="absolute -top-10 -left-10 animate-pulse" /> */}
                                    {/* <Image src={bigStar} alt="big star" className="absolute -bottom-10 -right-10 animate-pulse delay-700" /> */}
                                    <Image src={smallStar} alt="little star" className="absolute top-0 right-0" />
                                    <Image src={smallStar} alt="little star" className="absolute bottom-0 left-0" />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-900">
                            Success!
                        </h2>

                        <p className="text-gray-500">
                            Connection request sent successfully
                        </p>

                        <button
                            onClick={() => setSuccessModalOpen(false)}
                            className="mt-4 px-6 py-2 bg-[#0b7680] text-white rounded-md"
                        >
                            OK
                        </button>
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    );
}
