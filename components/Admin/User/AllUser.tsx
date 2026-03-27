'use client'
import { AllUsersColumn } from '@/components/columns/AllUsersColumn'
import DynamicTable from '@/components/reusable/DynamicTable'
import { AllUsersData } from '@/public/demoData/AllUsersData'
import FilterIcon from '@/components/icons/admin/FilterIcon'
import SearchIcon from '@/components/icons/admin/SearchIcon'
import { useRouter } from 'next/navigation'
 
import React, { useState } from 'react'

export default function AllUser() {

     const router = useRouter()
    
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [viewLead, setViewLead] = useState({ isOpen: false, userData: null });
    const [isApproveOpen, setIsApproveOpen] = useState(false);


    const totalItems = AllUsersData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = AllUsersData.slice(startIndex, startIndex + itemsPerPage);



    const handleViewDetails = (row: any) => {
        // setViewLead({ isOpen: true, userData: row });
        router.push(`/dashboard/user/all-users/${row.id}` )

       
    };


       const handleApprove = (row: any) => {
      
        setIsApproveOpen(true);
    };

    const handleDecline = (row: any) => {
      
        
    };

    const handleViewLeadClose = () => {
        setViewLead({ isOpen: false, userData: null });
    };

    const handleApproveClose = () => {
        setIsApproveOpen(false);
    };



    return (
        <div className=' mt-8'>
            <div className=' flex items-center justify-between mb-4'>
                <h3 className=' text-2xl text-[#111827] font-medium'>See All Users</h3>
                <div>
                    <div className=' flex items-center'>
                        <div className=' relative'>
                            <SearchIcon className=' absolute top-1/2 -translate-y-1/2 left-4 ' />
                            <input type="text" name="" id="" className=' bg-[#e9e9ea] py-2 pl-12 rounded-[10px] w-[315px]' placeholder='Search user here' />

                        </div>
                        <button className=' flex items-center gap-2 p-2.5 cursor-pointer'>
                        <FilterIcon/>
                        </button>
                         Filter
                         
                    </div>
                </div>

            </div>

                  <DynamicTable
                    columns={AllUsersColumn({onView:handleViewDetails, onEdit:handleApprove, onDelete:handleDecline})}
                    data={currentData}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalpage={totalPages}
                    totalItems={totalItems}
                    onPageChange={setCurrentPage}
                    setItemsPerPage={setItemsPerPage}
                    noDataMessage="No users found"
                    loading={false}
                    // showPagination={false}
                  />
        </div>
    )
}
