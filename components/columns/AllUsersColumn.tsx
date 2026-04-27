"use client";

import React from "react";
import Dot3Icon from "@/components/icons/admin/Dot3Icon";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// User type definition based on the data structure
interface User {
    id: string;
    name: string;
    phone_number: string;
    email: string;
    trades: string;
    city: string;
    country: string;
    type: string;
}

interface ColumnConfig<T = any> {
    label: React.ReactNode;
    accessor: keyof T | string;
    width?: string;
    formatter?: (value: any, row?: T, index?: number) => React.ReactNode;
}

interface UserColumnProps {
    onView?: (row: User) => void;
    onEdit?: (row: User) => void;
    onDelete?: (row: User) => void;
}

interface ActionDropdownProps {
    row: User;
    onView?: (row: User) => void;
    onEdit?: (row: User) => void;
    onDelete?: (row: User) => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
    row,
    onView,
    onEdit,
    onDelete
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
                       View User 
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => onDelete?.(row)}
                        className="cursor-pointer"
                    >
                        Delete User 
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => onEdit?.(row)}
                        className="cursor-pointer"
                    >
Edit User                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

 

export function AllUsersColumn({
   
    onView,
    onEdit,
    onDelete
}: UserColumnProps): ColumnConfig<User>[] {

    // Return all columns configuration with proper typing
    return [
        {
            label: "ID",
            accessor: "id",
            width: "100px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value || '-'}</span>
            ),
        },
        {
            label: "Name",
            accessor: "name",
            width: "140px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value || '-'}</span>
            ),
        },
        {
            label: "Phone No.",
            accessor: "phone_number",
            width: "170px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value || '-'}</span>
            ),
        },
        {
            label: "Email",
            accessor: "email",
            width: "210px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value || '-'}</span>
            ),
        },
        {
            label: "Trade",
            accessor: "trades",
            width: "170px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value || '-'}</span>
            ),
        },
        {
            label: "City",
            accessor: "city",
            width: "150px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value || '-'}</span>
            ),
        },
        {
            label: "Country",
            accessor: "country",
            width: "160px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value || '-'}</span>
            ),
        },
        {
            label: "Type",
            accessor: "type",
            width: "120px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value || '-'}</span>
            ),
        },
        {
            label: "Action",
            accessor: "action", // Changed from "status" to "action" for clarity
            width: "20px",
            formatter: (_: any, row: User) => (
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