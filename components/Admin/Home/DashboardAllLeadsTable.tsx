"use client";

import DynamicTable from "@/components/reusable/DynamicTable";
import {   SubmittedLeadsData } from "@/public/demoData/SubmittedLeadsData";
import { useState } from "react";
 
import { ViewLeadDialog } from "./ViewLeadDialog";
import { LeadApproveDialog } from "./LeadApproveDialog";
import { DashboardUserColumn } from "@/components/columns/DashboardUserColumn";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LocationIcon from "@/components/icons/admin/LocationIcon";
import UserIcon from "@/components/icons/admin/UserIcon";
import PhoneIcon from "@/components/icons/admin/PhoneIcon";

function DashboardAllLeadsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [arrowDialogOpen, setArrowDialogOpen] = useState(false);
  const [arrowDialogData, setArrowDialogData] = useState<any>(null);

 
  // Modal state removed

  const totalItems = SubmittedLeadsData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = SubmittedLeadsData.slice(startIndex, startIndex + itemsPerPage);

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

  const handleApprove = (row: any) => {
    // No modal, just log or handle inline
    console.log("Approve clicked:", row);
  };

  const handleArrowClick = (row: any) => {
    setArrowDialogData(row);
    setArrowDialogOpen(true);
  };

 
  // Handler for edit
  const handleEdit = (row: any) => {
    console.log("Edit clicked:", row);
    // Add edit logic here
  };

  // Get all columns from the single component
  const columns = DashboardUserColumn({
    startIndex,
    selectedRows,
    currentData,
    onSelectAll: handleSelectAll,
    onSelectRow: handleSelectRow,
    onViewLead: handleViewLead,
    // onEdit: handleEdit,
    onApprove: handleApprove,
    onArrowClick: handleArrowClick, // pass handler
  });

  return (
    <div>
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
              </div>
              <div>
                <h3 className=" text-base text-[#070707] font-medium">Notes</h3>
                <p className=" text-[#777980] text-sm mt-2.5">The lead is located on 123 Main St. The owner’s name is John Smith. He has some roof leaking issue. I’ve shared some images based on specific objective.</p>
                <p className=" text-[#777980] text-sm mt-5">Please see the images below for this specific lead.</p>
              </div>
              <div>
                <h3 className=" text-base text-[#070707] font-medium">Images (3)</h3>
                <div className="flex  flex-col md:flex-row items-center gap-2.5 mt-2.5 ">
                  {
                    [...Array(3)].map((_,index)=>(
                      <div className=" flex-1 w-full" key={index}>
                        <div className="  h-[117px] border rounded-lg"></div>
                        <p className=" text-center text-xs text-[#4A4C56] mt-1.5">image {index+1}</p>
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