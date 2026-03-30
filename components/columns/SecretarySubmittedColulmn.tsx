import React from "react";
import TopRightArrow from "../icons/admin/TopRightArrow";

interface SecretarySubmittedLead {
  id: string;
  user_name: string;
  homeowners_address: string;
  homeowners_name: string;
  homeowners_phone: string;
  trade: string;
  lead_sent: string;
}

interface ColumnConfig<T = any> {
  label: React.ReactNode;
  accessor: keyof T | string;
  width?: string;
  formatter?: (value: any, row?: T, index?: number) => React.ReactNode;
}

interface SecretarySubmittedColumnProps {
  startIndex: number;
  selectedRows: Set<number>;
  currentData: SecretarySubmittedLead[];
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (globalIndex: number, checked: boolean) => void;
}

export function SecretarySubmittedColumn({
  startIndex,
  selectedRows,
  currentData,
  onSelectAll,
  onSelectRow,
}: SecretarySubmittedColumnProps): ColumnConfig<SecretarySubmittedLead>[] {
  const isAllSelected = currentData.length > 0 && currentData.every((_, idx) => selectedRows.has(startIndex + idx));
  const isSomeSelected = currentData.some((_, idx) => selectedRows.has(startIndex + idx));

  return [
    {
      label: (
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={isAllSelected}
            ref={el => { if (el) el.indeterminate = isSomeSelected && !isAllSelected; }}
            onChange={e => onSelectAll(e.target.checked)}
            onClick={e => e.stopPropagation()}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
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
              onChange={e => onSelectRow(globalIndex, e.target.checked)}
              onClick={e => e.stopPropagation()}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
          </div>
        );
      },
    },
    {
      label: "ID",
      accessor: "id",
      width: "80px",
      formatter: (value: string) => <span className="text-sm text-[#06030C]">{value}</span>,
    },
    {
      label: "User Name",
      accessor: "user_name",
      width: "140px",
      formatter: (value: string) => <span className="text-sm text-[#06030C]">{value}</span>,
    },
    {
      label: "Homeowner Name",
      accessor: "homeowners_name",
      width: "140px",
      formatter: (value: string) => <span className="text-sm text-[#06030C]">{value}</span>,
    },
    {
      label: "Homeowner Address",
      accessor: "homeowners_address",
      width: "200px",
      formatter: (value: string) => <span className="text-sm text-[#06030C]">{value}</span>,
    },
    {
      label: "Homeowner Phone",
      accessor: "homeowners_phone",
      width: "130px",
      formatter: (value: string) => <span className="text-sm text-[#06030C]">{value}</span>,
    },
    {
      label: "Trade",
      accessor: "trade",
      width: "110px",
      formatter: (value: string) => <span className="text-sm text-[#06030C]">{value}</span>,
    },
    {
      label: "Lead Sent to Us",
      accessor: "lead_sent",
      width: "120px",
      formatter: (value: string) => <div className=" flex items-center justify-between">

          <span className="text-sm text-[#06030C]">{value}</span>
          <TopRightArrow/>
      </div>
    },
  ];
}
