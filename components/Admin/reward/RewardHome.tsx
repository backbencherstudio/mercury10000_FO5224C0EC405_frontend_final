'use client'
import { GiftStatusColumn } from '@/components/columns/GiftStatusColumn'
import DynamicTable from '@/components/reusable/DynamicTable'
import { giftStatusData } from '@/public/demoData/giftStatusData'
import DownArrowIcon2 from '@/public/icons/admin/DownArrowIcon2'
import FilterIcon from '@/public/icons/admin/FilterIcon'
import SearchIcon from '@/public/icons/admin/SearchIcon'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
 
 
import Image from 'next/image'
import confirmImg from '@/public/images/admin/confirm-img.png' 
import bigStar from '@/public/images/admin/big-star.png'
import smallStar from '@/public/images/admin/little-star.png'

export default function RewardHome() {
  // State for selection and pagination
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  // Filter data based on search term
  const filteredData = giftStatusData.filter(item => 
    item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.userId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Get current page data
  const currentData = filteredData.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  // Handle select all rows on current page
  const handleSelectAll = (checked: boolean) => {
    const newSelected = new Set(selectedRows)
    currentData.forEach((_, index) => {
      const globalIndex = startIndex + index
      if (checked) {
        newSelected.add(globalIndex)
      } else {
        newSelected.delete(globalIndex)
      }
    })
    setSelectedRows(newSelected)
  }

  // Handle select single row
  const handleSelectRow = (globalIndex: number, checked: boolean) => {
    const newSelected = new Set(selectedRows)
    if (checked) {
      newSelected.add(globalIndex)
    } else {
      newSelected.delete(globalIndex)
    }
    setSelectedRows(newSelected)
  }

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to first page on search
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Handle bulk actions
  const handleBulkExport = () => {
    const selectedData = Array.from(selectedRows).map(index => giftStatusData[index])
    console.log('Export selected:', selectedData)
    // Implement your export logic here
  }

  const handleBulkDelete = () => {
    console.log('Delete selected:', Array.from(selectedRows))
    // Implement your delete logic here
    setSelectedRows(new Set()) // Clear selection after delete
  }

  // Get columns with selection props
  const columns = GiftStatusColumn({
    startIndex,
    selectedRows,
    currentData,
    onSelectAll: handleSelectAll,
    onSelectRow: handleSelectRow,
  })

  return (
    <div className='mt-8'>
      <div className='p-6 border rounded-[12px]'>
        {/* Header with title and filters */}
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-2xl text-[#111827] font-medium'>All Gift Status</h3>
          <div>
            <div className='flex items-center'>
              <div className='relative'>
                <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={handleSearch}
                  className='bg-[#e9e9ea] py-2 pl-12 rounded-[10px] w-[315px] outline-none focus:ring-1 focus:ring-blue-500' 
                  placeholder='Search user here' 
                />
              </div>
              <button className='flex items-center gap-2 p-2.5 cursor-pointer mr-2 hover:bg-gray-100 rounded-lg'>
                <FilterIcon />
                Filter
              </button>
              <div className='flex items-center gap-2.5'>
                <button className='flex items-center gap-7 border border-[#D2D2D5] py-2 px-2.5 rounded-[8px] cursor-pointer hover:bg-gray-50'>
                  From <DownArrowIcon2 />
                </button>
                <button className='flex items-center gap-7 border border-[#D2D2D5] py-2 px-2.5 rounded-[8px] cursor-pointer hover:bg-gray-50'>
                  To <DownArrowIcon2 />
                </button>
              </div>
            </div>
          </div>
        </div>

       
        {/* Dynamic Table */}
        <DynamicTable
          columns={columns}
          data={currentData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          totalpage={totalPages}
          totalItems={filteredData.length}
          setItemsPerPage={setItemsPerPage}
          border={true}
          showPagination={true}
          noDataMessage="No gift status data found!"
        />

          <Dialog >
    
        <DialogTrigger asChild>
         <button className=' mt-4 py-4 px-6 bg-[#0b7680] text-base text-white rounded-[8px] cursor-pointer'>Send Reward</button>
        </DialogTrigger>
        <DialogContent className=" p-16">
           <div className=" flex justify-center items-center">
          <div className=" relative">
          <Image src={confirmImg} alt="confirm img"/>
         
            <Image src={bigStar} alt="big star" className=" absolute top-10 left-0"/>
            <Image src={bigStar} alt="big star" className=" absolute top-28 right-0"/>
         
          
            <Image src={smallStar} alt="little star" className="  absolute top-28 left-5"/>
            <Image src={smallStar} alt="little star" className="  absolute top-8 right-5"/>
          

          </div>
        </div>
      <h2 className=' text-center text-2xl  font-medium mt-8'>Reward Sent Successfully</h2>
        </DialogContent>
     
    </Dialog>
    
      </div>
    </div>
  )
}




 
