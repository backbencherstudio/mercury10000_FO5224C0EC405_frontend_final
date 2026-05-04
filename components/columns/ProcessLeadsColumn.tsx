import React from "react";
import Dot3Icon from "@/components/icons/admin/Dot3Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TopRightArrow from "../icons/admin/TopRightArrow";
import CustomDropdown from "../custom-dropdown/CustomDropdown";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "../ui/dialog";

interface LeadHistory {
  id: string;
  city: string;
  home_owner_name: string;
  Trade: string;
  lead_sent: string;
  status: string;
}

interface ColumnConfig<T = any> {
  label: React.ReactNode;
  accessor: keyof T | string;
  width?: string;
  formatter?: (value: any, row?: T, index?: number) => React.ReactNode;
}

interface ProcessLeadsColumnProps {
  startIndex: number;
  selectedRows: Set<number>;
  currentData: LeadHistory[];
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (globalIndex: number, checked: boolean) => void;
  onView?: (row: LeadHistory) => void;
  onDelete?: (row: LeadHistory) => void;
  onEdit?: (row: LeadHistory) => void;
}

interface ActionDropdownProps {
  row: LeadHistory;
  onView?: (row: LeadHistory) => void;
  onDelete?: (row: LeadHistory) => void;
  onEdit?: (row: LeadHistory) => void;
}

// const ActionDropdown: React.FC<ActionDropdownProps> = ({ row, onView, onDelete, onEdit }) => (
//   <div className="flex justify-center w-full">
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <button className="cursor-pointer hover:bg-[#e9e9ea] px-3 py-1.5 rounded-full focus:outline-none">
//           <Dot3Icon />
//         </button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end" className="w-40 border border-[#d2d2d5] shadow-none">
//         <DropdownMenuItem onClick={() => onView?.(row)} className="cursor-pointer">View</DropdownMenuItem>
//         <DropdownMenuItem onClick={() => onEdit?.(row)} className="cursor-pointer">Edit</DropdownMenuItem>
//         <DropdownMenuItem onClick={() => onDelete?.(row)} className="cursor-pointer text-red-600">Delete</DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   </div>
// );

export function ProcessLeadsColumn({
  startIndex,
  selectedRows,
  currentData,
  onSelectAll,
  onSelectRow,
  onView,
  onDelete,
  onEdit,
}: ProcessLeadsColumnProps): ColumnConfig<LeadHistory>[] {
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
      label: "Lead ID",
      accessor: "lead_no",
      width: "100px",
      formatter: (value: string) => <span className="text-sm text-[#06030C]">{value}</span>,
    },
    {
      label: "City",
      accessor: "address",
      width: "170px",
      formatter: (value: string) => <span className="text-sm text-[#06030C]">{value}</span>,
    },
    {
      label: "Homeowner Name",
      accessor: "name",
      width: "140px",
      formatter: (value: string) => <span className="text-sm text-[#06030C]">{value}</span>,
    },
    {
      label: "Trade",
      accessor: "trade",
      width: "120px",
      formatter: (value: string) => <span className="text-sm text-[#06030C]">{value}</span>,
    },
    {
      label: "Lead Sent",
      accessor: "created_at",
      width: "150px",
      formatter: (value: string, row: LeadHistory) => {
        const [openView, setOpenView] = React.useState(false);
        const [openEdit, setOpenEdit] = React.useState(false);
        return (
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#06030C]">{value}</span>
            <CustomDropdown
              trigger={
                <button className="ml-2 p-1 rounded hover:bg-gray-200 cursor-pointer" type="button">
                  <TopRightArrow />
                </button>
              }
              items={[
                { label: 'View lead date', onClick: () => setOpenView(true) },
                { label: 'Edit lead date', onClick: () => setOpenEdit(true) },
                { label: 'Active work', onClick: () => {} },
                { label: 'Close', onClick: () => {} },
              ]}
              containerClassName=""
              menuClassName=""
            />
            {/* View Dialog */}
            <Dialog open={openView} onOpenChange={setOpenView}>
              <DialogContent>
                <h2 className="text-2xl text-[#111827] font-medium">Meeting Details</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg text-[#1D1F2C] font-semibold">Date</h3>
                    <p className="text-base text-[#777980] mt-1.5">13 February, 2026</p>
                  </div>
                  <div>
                    <h3 className="text-lg text-[#1D1F2C] font-semibold">Time</h3>
                    <p className="text-base text-[#777980] mt-1.5">11:00 PM</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            {/* Edit Dialog */}
            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
              <DialogContent>
                <h2 className="text-2xl text-[#111827] font-medium">Edit Lead Date</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg text-[#1D1F2C] font-semibold">Date</h3>
                    <input type="date" className="border rounded px-2 py-1 mt-1.5 w-full" />
                  </div>
                  <div>
                    <h3 className="text-lg text-[#1D1F2C] font-semibold">Time</h3>
                    <input type="time" className="border rounded px-2 py-1 mt-1.5 w-full" />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        );
      },
    },
    {
      label: "Status",
      accessor: "status",
      width: "120px",
      formatter: (value: string) => {
        let bg = "bg-gray-200";
        let text = "text-gray-800";
        const val = (value || '').toLowerCase();
        if (val === "scheduled") {
          bg = "bg-[#F8E997]";
          text = "text-[#AC8815]";
        } else if (val === "active work") {
          bg = "bg-[#A7EADE]";
          text = "text-[#116557]";
        } else if (val === "closed") {
          bg = "bg-[#FFB0B0]";
          text = "text-[#F00]";
        } else if (val === "invalid") {
          bg = "bg-[#FFB0B0]";
          text = "text-[#F00]";
        }
        return (
          <span className={`px-2 py-1 rounded-[4px] text-xs ${bg} ${text}`}>{value || '-'}</span>
        );
      },
    }
  ];
}
