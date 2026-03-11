"use client";

import DynamicTable from "@/components/reusable/DynamicTable";
import { demoData } from "@/public/demoData/DemoData";
import { useState } from "react";
 
import { ViewLeadDialog } from "./ViewLeadDialog";
import { LeadApproveDialog } from "./LeadApproveDialog";
import { DashboardUserColumn } from "@/components/columns/DashboardUserColumn";

function DashboardAllLeadsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

 
  const [viewLead, setViewLead] = useState({
    isOpen: false,
    userData: null as any
  });

 
  const [isApproveOpen, setIsApproveOpen] = useState(false);
 

  const [selectedLeadForApprove, setSelectedLeadForApprove] = useState<any>(null);

  const totalItems = demoData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = demoData.slice(startIndex, startIndex + itemsPerPage);

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

 
  const handleViewLead = (row: any) => {
    setViewLead({
      isOpen: true,
      userData: row
    });
  };

 
  const handleViewLeadClose = () => {
    setViewLead({
      isOpen: false,
      userData: null
    });
  };

 
  const handleApprove = (row: any) => {
    
      
    setIsApproveOpen(true);
  };

 
  const handleApproveClose = () => {
    setIsApproveOpen(false);
    setSelectedLeadForApprove(null); 
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
  });

  return (
    <div className="p-6">
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

      {/* View Lead Dialog */}
      <ViewLeadDialog
        isOpen={viewLead.isOpen}
        onClose={handleViewLeadClose}
        userData={viewLead.userData}
      />
      
      {/* Approve Dialog */}
      <LeadApproveDialog 
        isOpen={isApproveOpen} 
        onClose={handleApproveClose}
       
      />
    </div>
  );
}

export default DashboardAllLeadsTable;