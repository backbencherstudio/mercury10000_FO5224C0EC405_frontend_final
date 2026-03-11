import React from "react";
import Dot3Icon from "@/public/icons/admin/Dot3Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MessageIcon from "@/public/icons/admin/MessageIcon";

interface ColumnConfig {
  label: React.ReactNode;
  accessor: string;
  width?: string;
  formatter?: (value: any, row?: any, index?: number) => React.ReactNode;
}

interface ContactRequestColumnProps {
  onViewDetails?: (row: any) => void;
  onResolve?: (row: any) => void;
  onPending?: (row: any) => void;
}

// Secretary Note Dialog Component
const SecretaryNoteDialog: React.FC<{ row: any }> = ({ row }) => {
  // Mock note data - replace with actual note from your data
  const secretaryNote = row.note || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";

  return (
    <Dialog >
      <DialogTrigger asChild>
        <button className="cursor-pointer text-base text-[#0E93A1] hover:underline">
          View All
        </button>
      </DialogTrigger>
      <DialogContent className=" p-12">
        <DialogHeader>
          <DialogTitle className="text-xl text-[#040C0B]  ">Secretary Note Summery</DialogTitle>
          <DialogDescription className="text-base text-[#040C0B] py-8 border-b border-[#E9E9EA]">
           The User is saying that he cannot proceed to submit new leads from the app..... <span className=" font-medium">  view more</span>
          </DialogDescription>
        </DialogHeader>
<div className=" space-y-6">
        <div>
            <h2 className=" text-lg text-[#1D1F2C] font-semibold">Requested Date</h2>
            <p className=" text-base text-[#777980] mt-2">12 Feb, 2026 at 12:00 AM</p>
        </div>
        <div>
            <h2 className=" text-lg text-[#1D1F2C] font-semibold">User Name</h2>
            <p className=" text-base text-[#777980] mt-2">John Dan</p>
        </div>
        <div>
            <h2 className=" text-lg text-[#1D1F2C] font-semibold">User ID</h2>
            <p className=" text-base text-[#777980] mt-2">1236</p>
        </div>

</div>
      <button className=" flex items-center gap-2.5 bg-[#0b7680] justify-center text-white text-base py-4 w-full mt-8 rounded-[8px] cursor-pointer"> <MessageIcon/> Contact User Now</button>
      </DialogContent>
    </Dialog>
  );
};

// Action Dropdown Component
const ActionDropdown: React.FC<{
  row: any;
  onViewDetails?: (row: any) => void;
  onResolve?: (row: any) => void;
  onPending?: (row: any) => void;
}> = ({ row, onViewDetails, onResolve, onPending }) => {
  return (
    <div className="flex justify-center w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="cursor-pointer hover:bg-[#e9e9ea] px-3 py-1.5 rounded-full focus:outline-none">
            <Dot3Icon />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 border border-[#d2d2d5] shadow-none">
          
          {row.status === 'pending' && (
            <DropdownMenuItem 
              onClick={() => onResolve?.(row)}
              className="cursor-pointer"
            >
              Resolved
            </DropdownMenuItem>
          )}
          
          {row.status === 'resolved' && (
            <DropdownMenuItem 
              onClick={() => onPending?.(row)}
              className="cursor-pointer"
            >
              Pending
            </DropdownMenuItem>
          )}

          <DropdownMenuItem 
            onClick={() => onViewDetails?.(row)}
            className="cursor-pointer"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export function ContactRequestColumn({
  onViewDetails,
  onResolve,
  onPending
}: ContactRequestColumnProps): ColumnConfig[] {

  // Status formatter with styling
  const StatusFormatter = (status: string) => {
    const statusStyles = {
      resolved: "bg-[#B0E4DD] text-[#006557] px-3 py-1 rounded-full text-base",
      pending: "bg-[#FFB0B0] text-[#900] px-3 py-1 rounded-full text-base"
    };
    
    return (
      <div className="flex items-center justify-center">
        <span className={statusStyles[status as keyof typeof statusStyles]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    );
  };

  // Date formatter
  const DateFormatter = (date: string) => {
    return date;
  };

  return [
    {
      label: "Request ID",
      accessor: "id",
      width: "100px",
      formatter: (value: string) => (
        <span className="text-base text-[#040C0B]">{value}</span>
      ),
    },
 
    {
      label: "User Name",
      accessor: "userName",
      width: "150px",
      formatter: (value: string) => (
        <span className="text-base text-[#040C0B]">{value}</span>
      ),
    },
 
    {
      label: "Requested Date",
      accessor: "requestedDate",
      width: "130px",
      formatter: DateFormatter,
    },

    {
      label: 'Secretary Note',
      accessor: 'note',
      width: '120px',
      formatter: (_: any, row: any) => (
        <div className="flex items-center justify-center">
          <SecretaryNoteDialog row={row} />
        </div>
      )
    },
   
    {
      label: "Status",
      accessor: "status",
      width: "120px",
      formatter: (value: string) => StatusFormatter(value),
    },

    {
      label: "Action",
      accessor: "action",
      width: "80px",
      formatter: (_: any, row: any) => (
        <ActionDropdown
          row={row}
          onViewDetails={onViewDetails}
          onResolve={onResolve}
          onPending={onPending}
        />
      ),
    },
  ];
}