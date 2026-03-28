"use client";

import React from "react";
import Dot3Icon from "@/components/icons/admin/Dot3Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Admin type definition based on the data structure
interface Admin {
  id: string;
  user_name: string;
  password: string;
  Phone: string;
}

interface ColumnConfig<T = any> {
  label: React.ReactNode;
  accessor: keyof T | string;
  width?: string;
  formatter?: (value: any, row?: T, index?: number) => React.ReactNode;
}

interface AdminColumnProps {
  onView?: (row: Admin) => void;
  onEdit?: (row: Admin) => void;
  onDelete?: (row: Admin) => void;
}

interface ActionDropdownProps {
  row: Admin;
  onView?: (row: Admin) => void;
  onEdit?: (row: Admin) => void;
  onDelete?: (row: Admin) => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  row,
  onView,
  onEdit,
  onDelete,
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
            onClick={() => onView?.(row)}
            className="cursor-pointer"
          >
            View  
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete?.(row)}
            className="cursor-pointer"
          >
            Delete  
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onEdit?.(row)}
            className="cursor-pointer"
          >
            Edit  
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export function AllAdminColumn({
  onView,
  onEdit,
  onDelete,
}: AdminColumnProps): ColumnConfig<Admin>[] {
  return [
    {
      label: "ID",
      accessor: "id",
      width: "100px",
      formatter: (value: string) => (
        <span className="text-sm text-[#06030C]">{value}</span>
      ),
    },
    {
      label: "User Name",
      accessor: "user_name",
      width: "140px",
      formatter: (value: string) => (
        <span className="text-sm text-[#06030C]">{value}</span>
      ),
    },
    {
      label: "Password",
      accessor: "password",
      width: "140px",
      formatter: (value: string) => (
        <span className="text-sm text-[#06030C]">{value}</span>
      ),
    },
    {
      label: "Phone No.",
      accessor: "Phone",
      width: "170px",
      formatter: (value: string) => (
        <span className="text-sm text-[#06030C]">{value}</span>
      ),
    },
    {
      label: "Action",
      accessor: "action",
      width: "10px",
      formatter: (_: any, row: Admin) => (
        <ActionDropdown
          row={row}
          onView={onView}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ),
    },
  ];
}
