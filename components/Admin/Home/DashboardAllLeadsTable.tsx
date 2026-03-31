"use client";

import DynamicTable from "@/components/reusable/DynamicTable";
import {  SubmittedLeadsData } from "@/public/demoData/SubmittedLeadsData";
import { useState } from "react";
 import { DashboardUserColumn } from "@/components/columns/DashboardUserColumn";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LocationIcon from "@/components/icons/admin/LocationIcon";
import UserIcon from "@/components/icons/admin/UserIcon";
import PhoneIcon from "@/components/icons/admin/PhoneIcon";
import SearchIcon from "@/components/icons/admin/SearchIcon";
import FilterIcon from "@/components/icons/admin/FilterIcon";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMemo } from "react";

function DashboardAllLeadsTable() {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [arrowDialogOpen, setArrowDialogOpen] = useState(false);
  const [arrowDialogData, setArrowDialogData] = useState<any>(null);
  const [leadProcessDialogOpen, setLeadProcessDialogOpen] = useState(false);
  const [notLeadDialogOpen, setNotLeadDialogOpen] = useState(false);
  const [dialogRowData, setDialogRowData] = useState<any>(null);
  const [tradeFilter, setTradeFilter] = useState<string>("all");

  // Get unique trades for filter dropdown
  const tradeOptions = useMemo(() => {
    const set = new Set<string>();
    SubmittedLeadsData.forEach((item) => {
      if (item.trade) set.add(item.trade);
    });
    return Array.from(set);
  }, []);

  // Filter data by trade
  const filteredData = tradeFilter === "all"
    ? SubmittedLeadsData
    : SubmittedLeadsData.filter((item) => item.trade === tradeFilter);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    const newSelected = new Set(selectedRows);
    currentData.forEach((_, index) => {
      const globalIndex = startIndex + index;
      checked ? newSelected.add(globalIndex) : newSelected.delete(globalIndex);
    });
    setSelectedRows(newSelected);
  };

  const handleSelectRow = (globalIndex: number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    checked ? newSelected.add(globalIndex) : newSelected.delete(globalIndex);
    setSelectedRows(newSelected);
  };

 
  // Modal handlers removed
  const handleViewLead = (row: any) => {
    // No modal, just log or handle inline
    console.log("View Lead clicked:", row);
  };

 

  const handleArrowClick = (row: any) => {
    setArrowDialogData(row);
    setArrowDialogOpen(true);
  };

  const handleLeadProcess = (row: any) => {
    setDialogRowData(row);
    setLeadProcessDialogOpen(true);
  };
  const handleNotLead = (row: any) => {
    setDialogRowData(row);
    setNotLeadDialogOpen(true);
  };

  

  // Get all columns from the single component
  const columns = DashboardUserColumn({
    startIndex,
    selectedRows,
    currentData,
    onSelectAll: handleSelectAll,
    onSelectRow: handleSelectRow,
    onLeadProcess: handleLeadProcess,
    onNotLead: handleNotLead,
    onViewLead: handleViewLead,
    // onEdit: handleEdit,
    // onApprove: handleApprove,
    onArrowClick: handleArrowClick,  
  });

  return (
    <div>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 mb-4'>
        <div className='relative w-full sm:w-auto'>
          <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />
          <input type="text" className='bg-[#e9e9ea] py-2 pl-12 pr-4 rounded-[10px] w-full sm:w-[315px] outline-none focus:ring-1 focus:ring-blue-500' placeholder='Search user here' />
        </div>
        <button className='flex items-center gap-2 p-2.5 cursor-pointer hover:bg-gray-100 rounded-lg w-full sm:w-auto justify-center'>
          <FilterIcon />
          <span className='hidden sm:inline'>Filter</span>
        </button>
        <div className='w-full sm:w-auto'>
          <Select value={tradeFilter} onValueChange={setTradeFilter}>
            <SelectTrigger className='w-full sm:w-[150px] bg-[#e9e9ea] rounded-[10px] ml-0 sm:ml-2'>
              <SelectValue placeholder="Trade Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Trades</SelectItem>
              {tradeOptions.map((trade) => (
                <SelectItem key={trade} value={trade}>{trade}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <DynamicTable
          columns={columns}
          data={currentData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalpage={totalPages}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
          noDataMessage="No users found"
          loading={false}
        />
      </div>
      {/* Lead in Process Custom Dialog */}
      <Dialog open={leadProcessDialogOpen} onOpenChange={(open) =>{setLeadProcessDialogOpen(open)}}>
        <DialogContent className="max-w-md p-8 rounded-xl shadow-lg text-white"  >
            <DialogHeader>
              <DialogTitle className="text-black text-2xl font-bold flex items-center gap-2">
                 Lead in Process
              </DialogTitle>
            </DialogHeader>
         
        </DialogContent>
      </Dialog>
      {/* Not a Lead Custom Dialog */}
      <Dialog open={notLeadDialogOpen} onOpenChange={(open) => {setNotLeadDialogOpen(open)}}>
        <DialogContent className="max-w-md p-8 rounded-xl shadow-lg text-white"  >
            <DialogHeader>
              <DialogTitle className="text-black text-2xl font-bold flex items-center gap-2">
                Not a Lead
              </DialogTitle>
            </DialogHeader>
        
        </DialogContent>
      </Dialog>
      {/* Custom Dialog for TopRightArrow */}
      <Dialog open={arrowDialogOpen} onOpenChange={setArrowDialogOpen} >
        <DialogContent className=" sm:max-w-[980px] p-6">
          <h3 className=" text-[32px] text-[#070707] font-medium text-center" >View The Lead</h3>
          {arrowDialogData && (
            <div className=" mt-8 space-y-8">
              <div className="  space-y-5">
                <div className=" border-b border-[#e9e9ea] pb-2.5">
                  <div className=" flex items-center gap-2">
                    <LocationIcon/>
                    <h3 className=" text-base text-[#070707] font-medium">Homeowner Address</h3>
                  </div>
                  <p className=" text-sm text-[#777980] mt-2.5">{ arrowDialogData.homeowners_address}</p>
                </div>
                <div className=" border-b border-[#e9e9ea] pb-2.5">
                  <div className=" flex items-center gap-2">
                    <UserIcon/>
                    <h3 className=" text-base text-[#070707] font-medium">Homeowner Name</h3>
                  </div>
                  <p className=" text-sm text-[#777980] mt-2.5">{ arrowDialogData.hmeowners_name}</p>
                </div>
                <div className=" border-b border-[#e9e9ea] pb-2.5">
                  <div className=" flex items-center gap-2">
                    <PhoneIcon/>
                    <h3 className=" text-base text-[#070707] font-medium">HomeownerPhone</h3>
                  </div>
                  <p className=" text-sm text-[#777980] mt-2.5">{ arrowDialogData.hmeowners_phone}</p>
                </div>
                  <div className=" border-b border-[#e9e9ea] pb-2.5">
                    <div  >
                      
                      <h3 className=" text-base text-[#070707] font-medium">Trade</h3>
                    </div>
                    <p className=" text-sm text-[#777980] mt-2.5">{ arrowDialogData.trade}</p>
                  </div>
              </div>
              <div>
                <h3 className=" text-base text-[#070707] font-medium">Notes</h3>
                <p className=" text-[#777980] text-sm mt-2.5">The lead is located on 123 Main St. The owner’s name is John Smith. He has some roof leaking issue. I’ve shared some images based on specific objective.</p>
                <p className=" text-[#777980] text-sm mt-5">Please see the images below for this specific lead.</p>
              </div>
              <div>
                <h3 className=" text-base text-[#070707] font-medium">Images (3)</h3>
                <div className="flex flex-col sm:flex-row items-center gap-2.5 mt-2.5 w-full">
                  {
                    [...Array(3)].map((_,index)=>(
                      <div className="flex-1 w-full min-w-[120px]" key={index}>
                        <div className="h-[90px] sm:h-[117px] border rounded-lg"></div>
                        <p className="text-center text-xs text-[#4A4C56] mt-1.5">image {index+1}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
               
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DashboardAllLeadsTable;