'use client'
import { AllUsersColumn } from '@/components/columns/AllUsersColumn'
import DynamicTable from '@/components/reusable/DynamicTable'
import FilterIcon from '@/components/icons/admin/FilterIcon'
import SearchIcon from '@/components/icons/admin/SearchIcon'
import { useRouter } from 'next/navigation'
 
import React, { useEffect, useState } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { useGetAllUsersQuery } from '@/redux/features/auth/authApi'


export default function AllUser() {

    const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(10);

const { data, isLoading, isFetching } = useGetAllUsersQuery({
  page: currentPage,
  limit: itemsPerPage,
});

     const router = useRouter()

    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setHasLoadedOnce(true);
        }
    }, [isLoading]);

    const dash = (value: unknown) => {
        if (value === null || value === undefined) return '-';
        const text = String(value).trim();
        return text ? text : '-';
    };

const users = Array.isArray(data?.data)
  ? data.data.map((user: any) => ({
      id: user?.id ?? "-",
      name: user?.name ?? "-",
      phone_number: user?.phone_number ?? "-",
      email: user?.email ?? "-",
      trades:
        Array.isArray(user?.trades) && user.trades.length > 0
          ? user.trades
              .map((t: any) => t?.name)
              .filter(Boolean)
              .join(", ")
          : "-",
      city: user?.city ?? "-",
      country: user?.country ?? "-",
      type: user?.type ?? "-",
    }))
  : [];

const totalItems = data?.totalItems ?? ((currentPage - 1) * itemsPerPage + users.length + (users.length === itemsPerPage ? 1 : 0));
const totalPages = data?.totalPages ?? (users.length === itemsPerPage ? currentPage + 1 : currentPage);

const handlePageChange = (page: number) => {
  setCurrentPage(page);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handlePageSizeChange = (size: number) => {
  setItemsPerPage(size);
  setCurrentPage(1);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

console.log(data,'datta');



    const handleViewDetails = (row: any) => {
        router.push(`/dashboard/user/all-users/${row.id}` )
    };

    const handleEdit = (row: any) => {
        router.push(`/dashboard/user/all-users/${row.id}` )
    };

    const handleDelete = (row: any) => {
        console.log("Delete user", row.id);
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
                {isLoading || !hasLoadedOnce ? (
                    <LoadingSkeleton />
                ) : (
                    <DynamicTable
                        columns={AllUsersColumn({ onView: handleViewDetails, onEdit: handleEdit, onDelete: handleDelete })}
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
