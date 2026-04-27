'use client'
import { AllUsersColumn } from '@/components/columns/AllUsersColumn'
import DynamicTable from '@/components/reusable/DynamicTable'
import FilterIcon from '@/components/icons/admin/FilterIcon'
import SearchIcon from '@/components/icons/admin/SearchIcon'
import { useRouter } from 'next/navigation'
 
import React, { useEffect, useState } from 'react'
import { UserService } from '@/service/user/user.service'
import { Skeleton } from '@/components/ui/skeleton'

export default function AllUser() {

     const router = useRouter()

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [users, setUsers] = useState<any[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

    const dash = (value: unknown) => {
        if (value === null || value === undefined) return '-';
        const text = String(value).trim();
        return text ? text : '-';
    };

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            try {
                const result = await UserService.getAllUsers(currentPage, itemsPerPage);
                const rows = Array.isArray(result?.users) ? result.users.map((user: any) => ({
                    id: dash(user?.id),
                    name: dash(user?.name),
                    phone_number: dash(user?.phone_number),
                    email: dash(user?.email),
                    trades: Array.isArray(user?.trades) && user.trades.length > 0
                        ? user.trades.map((trade: any) => dash(trade?.name)).filter((trade: string) => trade !== '-').join(', ') || '-'
                        : '-',
                    city: dash(user?.city),
                    country: dash(user?.country),
                    type: dash(user?.type),
                })) : [];

                setUsers(rows);
                setTotalItems(result?.totalItems ?? rows.length);
                setTotalPages(result?.totalPages ?? 1);
            } finally {
                setLoading(false);
                setHasLoadedOnce(true);
            }
        };

        loadUsers();
    }, [currentPage, itemsPerPage]);



    const handleViewDetails = (row: any) => {
        // setViewLead({ isOpen: true, userData: row });
        router.push(`/dashboard/user/all-users/${row.id}` )

       
    };


       const handleApprove = (row: any) => {
      
    };

    const handleDecline = (row: any) => {
      
        
    };

    const LoadingSkeleton = () => {
        const columnCount = 9;

        return (
            <div className='min-w-[1000px] border border-[#E5E7EB] rounded-lg overflow-hidden bg-white'>
                <div className='grid grid-cols-9 gap-3 px-4 py-4 bg-[#f7f7f7] border-b border-[#E5E7EB]'>
                    {Array.from({ length: columnCount }).map((_, index) => (
                        <Skeleton key={`skeleton-header-${index}`} className='h-4 w-full bg-slate-300/80' />
                    ))}
                </div>
                <div className='p-4 space-y-3'>
                    {Array.from({ length: itemsPerPage }).map((_, rowIndex) => (
                        <div key={`skeleton-row-${rowIndex}`} className='grid grid-cols-9 gap-3'>
                            {Array.from({ length: columnCount }).map((__, colIndex) => (
                                <Skeleton key={`skeleton-cell-${rowIndex}-${colIndex}`} className='h-8 w-full bg-slate-200/90' />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    };



    return (
        <div className='mt-8'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4'>
                <h3 className='text-xl sm:text-2xl text-[#111827] font-medium'>See All Users</h3>
                <div className='w-full sm:w-auto'>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2'>
                        <div className='relative w-full sm:w-auto'>
                            <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />
                            <input type="text" className='bg-[#e9e9ea] py-2 pl-12 pr-4 rounded-[10px] w-full sm:w-[315px] outline-none focus:ring-1 focus:ring-blue-500' placeholder='Search user here' />
                        </div>
                        <button className='flex items-center gap-2 p-2.5 cursor-pointer hover:bg-gray-100 rounded-lg w-full sm:w-auto justify-center'>
                            <FilterIcon />
                            <span className='hidden sm:inline'>Filter</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className='overflow-x-auto'>
                {loading || !hasLoadedOnce ? (
                    <LoadingSkeleton />
                ) : (
                    <DynamicTable
                        columns={AllUsersColumn({ onView: handleViewDetails, onEdit: handleApprove, onDelete: handleDecline })}
                        data={users}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalpage={totalPages}
                        totalItems={totalItems}
                        onPageChange={setCurrentPage}
                        setItemsPerPage={setItemsPerPage}
                        noDataMessage="No users found"
                        loading={false}
                    />
                )}
            </div>
        </div>
    )
}
