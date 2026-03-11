"use client";

import React from "react";
import Dot3Icon from "@/public/icons/admin/Dot3Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdOutlineEdit } from "react-icons/md";


interface ColumnConfig {
  label: React.ReactNode;
  accessor: string;
  width?: string;
  formatter?: (value: any, row?: any, index?: number) => React.ReactNode;
}

interface DashboardUserColumnProps {
  startIndex: number;
  selectedRows: Set<number>;
  currentData: any[];
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (globalIndex: number, checked: boolean) => void;
 onDecline?:(row:any)=>void
 
  
  onViewLead?: (row: any) => void;
  onApprove?:(row:any)=>void
}


interface ActionDropdownProps {
  row: any;
  onViewLead?: (row: any) => void;
  onDecline?: (row: any) => void;
  onApprove?: (row: any) => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({ 
  row, 
  onViewLead, 
  onDecline, 
  onApprove 
}) => {
  return (
    <div className="flex justify-center w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="cursor-pointer hover:bg-[#e9e9ea] px-3 py-1.5 rounded-full focus:outline-none">
            <Dot3Icon />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 border border-[#d2d2d5] shadow-none">
          <DropdownMenuItem 
            onClick={() => onApprove?.(row)}
            className="cursor-pointer"
          >
           Approve
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onDecline?.(row)}
            className="cursor-pointer"
          >
           Decline
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onViewLead?.(row)}
            className="cursor-pointer  "
          >
            View The Lead
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
 
 
 

// Date formatter for lead_sent
const DateFormatter = (value: string) => {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

 

 

export function DashboardUserColumn({
  startIndex,
  selectedRows,
  currentData,
  onSelectAll,
  onSelectRow,
  onApprove,
  onViewLead,
  onDecline
 
}: DashboardUserColumnProps): ColumnConfig[] {
  
  // Check if all rows are selected
  const isAllSelected =
    currentData.length > 0 &&
    currentData.every((_, index) => selectedRows.has(startIndex + index));

  // Check if some rows are selected (for indeterminate state)
  const isSomeSelected = currentData.some((_, index) =>
    selectedRows.has(startIndex + index)
  );

  // Return all columns configuration
  return [
    // 1. Checkbox Column
    {
      label: (
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={isAllSelected}
            ref={(el) => {
              if (el) el.indeterminate = isSomeSelected && !isAllSelected;
            }}
            onChange={(e) => onSelectAll(e.target.checked)}
            onClick={(e) => e.stopPropagation()}
            className="w-4 h-4  rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer  "
          />
        </div>
      ),
      accessor: "checkbox",
      width: "50px",
      formatter: (_: any, __: any, rowIndex: number) => {
        const globalIndex = startIndex + rowIndex;
        return (
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              checked={selectedRows.has(globalIndex)}
              onChange={(e) => onSelectRow(globalIndex, e.target.checked)}
              onClick={(e) => e.stopPropagation()}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
          </div>
        );
      },
    },

    // 2. ID Column
    {
      label: "User ID",
      accessor: "id",
      width: "100px",
      formatter: (value: string) => (
        <span className="text-sm  text-[#06030C]">{value}</span>
      ),
    },

    // 3. Full Name Column
    {
      label: "User name",
      accessor: "full_name",
      width: "140px",
      formatter: (value: string) => (
        <span className=" text-sm  text-[#06030C]">{value}</span>
      ),
    },

    // 4. City/Address Column
    {
      label: "City",
      accessor: "city",
      width: "170px",
      formatter:(value:string)=>(
        <span className=" text-sm  text-[#06030C]">{value}</span>
      )  ,
    },

    // 5. Homeowner Name Column
    {
      label: "Homeowner’s Name",
      accessor: "hmeowners_name",
      width: "140px",
      formatter: (value: string) => (
        <span className="text-sm f text-[#06030C]">{value}</span>
      ),
    },

    // 6. Homeowner Phone Column
    {
      label: "Homeowner’s Phone",
      accessor: "hmeowners_phone",
      width: "150px",
      formatter: (value: string) => (
        <span className="text-sm f text-[#06030C]">{value}</span>
      ),
    },

    // 7. Trade/Enquiry Type Column
    {
      label: "Trade",
      accessor: "trade",
      width: "150px",
       formatter: (value: string) => (
        <span className="text-sm f text-[#06030C]">{value}</span>
      ),
    },

    // 8. Lead Sent Date Column
    {
      label: "Lead Sent",
      accessor: "lead_sent",
      width: "150px",
      formatter: DateFormatter,
    },

    // 9. Status Column (if you add status to your demo data)
    {
      label: "Action",
      accessor: "action",
      width: "10px",
        formatter: (_: any, row: any) => (
        <ActionDropdown
          row={row}
          onViewLead={onViewLead}
          onDecline={onDecline}
          onApprove={onApprove}
        />
      ),
    },
  ];
}