import React from "react";
import Dot3Icon from "@/components/icons/admin/Dot3Icon";
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
import MessageIcon from "@/components/icons/admin/MessageIcon";
import { useUpdataStatusMutation } from "@/redux/features/Support/support";

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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="cursor-pointer text-base text-[#0E93A1] hover:underline">
          View All
        </button>
      </DialogTrigger>

      <DialogContent className="p-12">
        <DialogHeader>
          <DialogTitle className="text-xl text-[#040C0B]">
            Request Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">

        <div>
            <h2 className="text-lg font-semibold">Requested Date</h2>
            <p className="text-base text-[#777980] mt-2">
              {new Date(row?.created_at).toLocaleString()}
            </p>
          </div>  

          <div>
            <h2 className="text-lg font-semibold">User Name</h2>
            <p className="text-base text-[#777980] mt-2">
              {row?.user?.name || "-"}
            </p>
          </div>

         
          <div>
            <h2 className="text-lg font-semibold">Request ID</h2>
            <p className="text-base text-[#777980] mt-2">{row?.id}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Phone No.</h2>
            <p className="text-base text-[#777980] mt-2">
              {row?.user?.phone_no || "-"}
            </p>
          </div>

          {/* <div>
            <h2 className="text-lg font-semibold">Secretary Note</h2>
            <p className="text-base text-[#777980] mt-2">
              {row?.secretary_note || "-"}
            </p>
          </div> */}

        </div>

        <button className="flex items-center gap-2.5 bg-[#0b7680] justify-center text-white text-base py-4 w-full mt-8 rounded-[8px] cursor-pointer">
          <MessageIcon />
          Contact User Now
        </button>

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

  const StatusFormatter = (status: string) => {
    const formatted = status?.toLowerCase();

    const statusStyles = {
      resolved: "bg-[#B0E4DD] text-[#006557] px-3 py-1 rounded-full text-base",
      pending: "bg-[#FFB0B0] text-[#900] px-3 py-1 rounded-full text-base"
    };

    const [updateStatus] = useUpdataStatusMutation();

    

    return (
      <div className="flex items-center justify-center">
        <span className={statusStyles[formatted as keyof typeof statusStyles]}>
          {formatted?.charAt(0).toUpperCase() + formatted?.slice(1)}
        </span>
      </div>
    );
  };

  const DateFormatter = (date: string) => {
    if (!date) return "-";
    return new Date(date).toLocaleString();
  };

  return [
    {
      label: "Request ID",
      accessor: "id",
      formatter: (value: string) => (
        <span className="text-base text-[#040C0B]">{value}</span>
      ),
    },

    {
      label: "User Name",
      accessor: "user",
      formatter: (_: any, row: any) => (
        <span className="text-base text-[#040C0B]">
          {row?.user?.name || "-"}
        </span>
      ),
    },

    {
      label: "Requested Date",
      accessor: "created_at",
      formatter: DateFormatter,
    },

    {
      label: "Secretary Note",
      accessor: "secretary_note",
      formatter: (_: any, row: any) => (
        <div className="flex items-center justify-center">
          <SecretaryNoteDialog row={{
            ...row,
            note: row.secretary_note
          }} />
        </div>
      ),
    },

    {
      label: "Status",
      accessor: "status",
      formatter: (value: string) => StatusFormatter(value),
    },

    {
      label: "Action",
      accessor: "action",
      formatter: (_: any, row: any) => (
        <ActionDropdown
          row={{
            ...row,
            status: row.status?.toLowerCase()
          }}
          onViewDetails={onViewDetails}
          onResolve={onResolve}
          onPending={onPending}
        />
      ),
    },
  ];
}