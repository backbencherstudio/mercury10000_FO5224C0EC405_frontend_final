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
interface FinancialActivity {
    month: string;
    qualified_leads: string;
    Conversion: string;
    
}

interface ColumnConfig<T = any> {
    label: React.ReactNode;
    accessor: keyof T | string;
    width?: string;
    formatter?: (value: any, row?: T, index?: number) => React.ReactNode;
}

interface FinancialColumnProps {
    onView?: (row: FinancialActivity) => void;
 
}

interface ActionDropdownProps {
    row: FinancialActivity;
    onView?: (row: FinancialActivity) => void;
    
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
    row,
    onView,
   
}) => {
    return (
        <div className="flex justify-center w-full">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="cursor-pointer hover:bg-[#e9e9ea] px-3 py-1.5 rounded-full focus:outline-none">
                        <Dot3Icon />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 border border-[#d2d2d5] shadow-none">
                    <DropdownMenuItem
                        onClick={() => onView?.(row)}
                        className="cursor-pointer"
                    >
                       Monthly Detailed View
                    </DropdownMenuItem>
                    
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

 

export function FinancialActivityColumn({
    onView,
   
}: FinancialColumnProps): ColumnConfig<FinancialActivity>[] {

    // Return all columns configuration with proper typing
    return [
        {
            label: "Month",
            accessor: "month",
            width: "100px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
        },
        {
            label: "Qualified leads",
            accessor: "qualified_leads",
            width: "140px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
        },
        {
            label: "Conversion",
            accessor: "Conversion",
            width: "140px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
        },
   
        {
            label: "Action",
            accessor: "action", // Changed from "status" to "action" for clarity
            width: "20px",
            formatter: (_: any, row: FinancialActivity) => (
                <ActionDropdown
                    row={row}
                    onView={onView}
                    
                />
            ),
        },
    ];
}