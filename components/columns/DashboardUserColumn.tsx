"use client";
 

import React from "react";
import Dot3Icon from "@/components/icons/admin/Dot3Icon";
import CustomDropdown from "@/components/custom-dropdown/CustomDropdown";
 
import TopRightArrow from "@/components/icons/admin/TopRightArrow";
 


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
  onArrowClick?: (row: any) => void;
  onLeadProcess?: (row: any) => void;
  onNotLead?: (row: any) => void;
}

interface ActionDropdownProps {
  row: any;
  onLeadProcess?: (row: any) => void;
  onNotLead?: (row: any) => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({ row, onLeadProcess, onNotLead }) => {
  return (
    <CustomDropdown
      items={[
        {
          label: 'Lead in Process',
          onClick: () => onLeadProcess?.(row),
          className: 'bg-[#0e93a1] text-white   focus:bg-[#0e93a1]/90',
        },
        {
          label: 'Not a Lead',
          onClick: () => onNotLead?.(row),
          className: 'bg-[#ff0000] text-white   focus:bg-[#ff0000]/90',
        },
      ]}
      containerClassName="flex justify-center w-full"
      menuClassName="space-y-1"
      trigger={<button className="cursor-pointer hover:bg-[#e9e9ea] p-1 rounded-full focus:outline-none"><Dot3Icon /></button>}
    />
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
  onDecline,
  onArrowClick,
  onLeadProcess,
  onNotLead
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
      label: "Lead ID",
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
      label: "Homeowner Address",
      accessor: "homeowners_address",
      width: "170px",
      formatter:(value:string)=>(
        <span className=" text-sm  text-[#06030C]">{value}</span>
      )  ,
    },

    // 5. Homeowner Name Column
    {
      label: "Homeowner Name ",
      accessor: "hmeowners_name",
      width: "140px",
      formatter: (value: string) => (
        <span className="text-sm f text-[#06030C]">{value}</span>
      ),
    },

    // 6. Homeowner Phone Column
    {
      label: "Homeowner Phone",
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

    // 8. Lead Sent Date Column with TopRightArrow
    {
      label: "Lead Sent to Us",
      accessor: "lead_sent",
      width: "180px",
      formatter: (value: string, row: any) => (
        <div className="flex items-center justify-between gap-2 cursor-pointer">
          <span>{DateFormatter(value)}</span>
          <button
            type="button"
            className="ml-2 p-1 rounded hover:bg-gray-100"
            onClick={() => onArrowClick && onArrowClick(row)}
          >
            <TopRightArrow />
          </button>
        </div>
      ),
    },

    // 9. Status Column (if you add status to your demo data)
    {
      label: "Action",
      accessor: "action",
      width: "10px",
      formatter: (_: any, row: any) => (
        <ActionDropdown
          row={row}
          onLeadProcess={onLeadProcess}
          onNotLead={onNotLead}
        />
      ),
    },
  ];
}