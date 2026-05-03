"use client";

import React from "react";
import Dot3Icon from "@/components/icons/admin/Dot3Icon";
import CustomDropdown from "@/components/custom-dropdown/CustomDropdown";
import TopRightArrow from "@/components/icons/admin/TopRightArrow";

/* =========================
   Types
========================= */

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
  onArrowClick?: (row: any) => void;
  onLeadProcess?: (row: any) => void;
  onNotLead?: (row: any) => void;
}

/* =========================
   Dropdown
========================= */

const ActionDropdown = ({ row, onLeadProcess, onNotLead }: any) => {
  return (
    <CustomDropdown
      items={[
        {
          label: "Lead in Process",
          onClick: () => onLeadProcess?.(row),
          className: "bg-[#0e93a1] text-white",
        },
        {
          label: "Not a Lead",
          onClick: () => onNotLead?.(row),
          className: "bg-red-500 text-white",
        },
      ]}
      containerClassName="flex justify-center w-full"
      trigger={
        <button className="cursor-pointer hover:bg-gray-200 p-1 rounded-full">
          <Dot3Icon />
        </button>
      }
    />
  );
};

/* =========================
   Utils
========================= */

const DateFormatter = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

/* =========================
   Columns
========================= */

export function DashboardUserColumn({
  startIndex,
  selectedRows,
  currentData,
  onSelectAll,
  onSelectRow,
  onArrowClick,
  onLeadProcess,
  onNotLead,
}: DashboardUserColumnProps): ColumnConfig[] {

  const isAllSelected =
    currentData.length > 0 &&
    currentData.every((_, i) => selectedRows.has(startIndex + i));

  const isSomeSelected = currentData.some((_, i) =>
    selectedRows.has(startIndex + i)
  );

  return [

    {
      label: (
        <input
          type="checkbox"
          checked={isAllSelected}
          ref={(el) => {
            if (el) el.indeterminate = isSomeSelected && !isAllSelected;
          }}
          onChange={(e) => onSelectAll(e.target.checked)}
        />
      ),
      accessor: "checkbox",
      width: "50px",
      formatter: (_: any, __: any, index: number) => {
        const globalIndex = startIndex + index;
        return (
          <input
            type="checkbox"
            checked={selectedRows.has(globalIndex)}
            onChange={(e) =>
              onSelectRow(globalIndex, e.target.checked)
            }
          />
        );
      },
    },

  
    {
      label: "Lead ID",
      accessor: "lead_no",
      formatter: (value) => <span>{value}</span>,
    },

   
    {
      label: "User Name",
      accessor: "user",
      formatter: (_: any, row) => (
        <span>{row?.name || "-"}</span>
      ),
    },

 
    {
      label: "Homeowner Address",
      accessor: "address",
      formatter: (value) => <span>{value}</span>,
    },

 
    {
      label: "Phone",
      accessor: "phone",
      formatter: (value) => <span>{value}</span>,
    },


    {
      label: "Trade",
      accessor: "trade",
      formatter: (_: any, row) => (
        <span>{row?.trade?.name || "-"}</span>
      ),
    },

    
    {
      label: "Created At",
      accessor: "created_at",
      formatter: (value, row) => (
        <div className="flex items-center gap-2">
          <span>{DateFormatter(value)}</span>
          <button onClick={() => onArrowClick?.(row)}>
            <TopRightArrow />
          </button>
        </div>
      ),
    },


    {
      label: "Status",
      accessor: "status",
      formatter: (value) => (
        <span className="text-xs px-2 py-1 bg-gray-200 rounded">
          {value}
        </span>
      ),
    },


    {
      label: "Action",
      accessor: "action",
      formatter: (_: any, row) => (
        <ActionDropdown
          row={row}
          onLeadProcess={onLeadProcess}
          onNotLead={onNotLead}
        />
      ),
    },
  ];
}