'use client'
import { GiftStatusColumn } from '@/components/columns/GiftStatusColumn'
import DynamicTable from '@/components/reusable/DynamicTable'
import DownArrowIcon2 from '@/components/icons/admin/DownArrowIcon2'
import FilterIcon from '@/components/icons/admin/FilterIcon'
import SearchIcon from '@/components/icons/admin/SearchIcon'
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
import { useGetGiftCardStatusQuery, useGetGiftCardsQuery, useGetRwardQuery, useGiftCardMutation, useSendGiftCardMutation } from '@/redux/features/reward/reward'
import toast from 'react-hot-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function RewardHome() {
  // State for selection and pagination
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')

  //POST API GIFT CARD

  const [payload, setPayload] = useState({
    name: "",
  });

  const [giftCard, { isLoading }] = useGiftCardMutation();
  const [sendGiftCard, { isLoading: isSendingReward }] = useSendGiftCardMutation();

  const { data: giftCardStatusData } = useGetGiftCardStatusQuery({});
  const { data: availableGiftCards } = useGetGiftCardsQuery({});

  const [selectedGiftCardId, setSelectedGiftCardId] = useState<string>('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);




  const formattedData = (giftCardStatusData || []).map((item: any) => ({
    userId: item.user_id,
    userName: item.user_name,
    recentLead: item.recent_lead || "--",
    leadSent: item.total_leads_sent,
    giftReceived: item.total_gift_received,
    lastGiftDate: item.last_gift_date,
  }))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    giftCard(payload).unwrap();
    toast.success("Gift created successfully");
    setPayload({
      name: "",
    });
  };


  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  // Filter data based on search term
  const filteredData = formattedData.filter(item =>
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
    const selectedData = Array.from(selectedRows).map(index => formattedData[index])
    console.log('Export selected:', selectedData)
    // Implement your export logic here
  }

  const handleBulkDelete = () => {
    console.log('Delete selected:', Array.from(selectedRows))
    // Implement your delete logic here
    setSelectedRows(new Set()) // Clear selection after delete
  }

  const handleSendReward = async () => {
    if (!selectedGiftCardId) {
      toast.error("Please select a gift card first");
      return;
    }

    const selectedUserIds = Array.from(selectedRows).map(index => formattedData[index].userId);

    if (selectedUserIds.length === 0) {
      toast.error("Please select at least one user");
      return;
    }

    try {
      await sendGiftCard({
        giftCardId: selectedGiftCardId,
        userIds: selectedUserIds
      }).unwrap();

      setIsSuccessModalOpen(true);
      setSelectedRows(new Set());
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send reward");
    }
  }

  const handleSingleSend = async (row: any) => {
    if (!selectedGiftCardId) {
      toast.error("Please select a gift card first");
      return;
    }

    try {
      await sendGiftCard({
        giftCardId: selectedGiftCardId,
        userIds: [row.userId]
      }).unwrap();

      setIsSuccessModalOpen(true);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send reward");
    }
  }

  // Get columns with selection props
  const columns = GiftStatusColumn({
    startIndex,
    selectedRows,
    currentData,
    onSelectAll: handleSelectAll,
    onSelectRow: handleSelectRow,
    onSend: handleSingleSend,
  })

  return (

    <div>
      <div className=' p-2.5 border-b border-[#11BECF] inline-block mb-8'>
        <h3 className=' text-lg text-[#0E93A1] font-medium'>All Rewards</h3>
      </div>

      <div >

        <div className=' border border-[#D2D2D5] p-6 mb-4 rounded-[8px]'>
          <h2 className=' text-2xl text-[#111827] font-medium mb-6'>Create a Gift</h2>
          <form onSubmit={handleSubmit} className='flex flex-col gap-2.5'>
            <label htmlFor="gift-name">Gift Name</label>

            <input
              name="name"
              onChange={handleChange}
              value={payload.name}
              type="text"
              id="gift-name"
              className='border border-[#D2D2D5] py-2 px-4 rounded-[8px] placeholder:text-base placeholder:text-[#161721]'
              placeholder='Bus Ticket'
            />

            <button
              type="submit"
              className='text-base text-white bg-[#0b7680] py-4 w-full rounded-[8px] mt-6 cursor-pointer'
            >
              {isLoading ? "Loading..." : "Create Gift"}
            </button>
          </form>
        </div>
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
            data={formattedData}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            totalpage={totalPages}
            totalItems={formattedData.length}
            setItemsPerPage={setItemsPerPage}
            border={true}
            showPagination={true}
            noDataMessage="No gift status data found!"
          />

          <div className='flex items-center gap-4 mt-6'>
            <div className='w-full max-w-xs'>
              <Select onValueChange={setSelectedGiftCardId} value={selectedGiftCardId}>
                <SelectTrigger className="w-full bg-white border-[#D2D2D5] h-[52px] rounded-[8px]">
                  <SelectValue placeholder="Select a Gift Card" />
                </SelectTrigger>
                <SelectContent>
                  {availableGiftCards?.map((card: any) => (
                    <SelectItem key={card.id} value={card.id}>
                      {card.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <button
              onClick={handleSendReward}
              disabled={isSendingReward || selectedRows.size === 0}
              className='py-4 px-10 bg-[#0b7680] text-base font-medium text-white rounded-[8px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all'
            >
              {isSendingReward ? "Sending..." : "Send Reward"}
            </button>
          </div>

          <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
            <DialogContent className="p-16 max-w-lg rounded-[20px] border-none shadow-2xl overflow-hidden">
              <div className="flex justify-center items-center">
                <div className="relative">
                  <Image src={confirmImg} alt="confirm img" className="z-10 relative" />
                  <Image src={bigStar} alt="big star" className="absolute -top-10 -left-10 animate-pulse" />
                  <Image src={bigStar} alt="big star" className="absolute -bottom-10 -right-10 animate-pulse delay-700" />
                  <Image src={smallStar} alt="little star" className="absolute top-0 right-0" />
                  <Image src={smallStar} alt="little star" className="absolute bottom-0 left-0" />
                </div>
              </div>
              <div className="text-center mt-10">
                <h2 className='text-3xl font-bold text-[#111827]'>Reward Sent!</h2>
                <p className='text-gray-500 mt-3 text-lg'>Selected users have received their gift cards successfully.</p>
                <button
                  onClick={() => setIsSuccessModalOpen(false)}
                  className="mt-10 bg-[#0b7680] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#095f67] transition-all w-full shadow-lg shadow-[#0b7680]/20"
                >
                  Great!
                </button>
              </div>
            </DialogContent>
          </Dialog>

        </div>
      </div>

    </div>
  )
}





