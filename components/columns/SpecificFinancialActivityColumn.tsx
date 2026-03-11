"use client";

import React from "react";
import Dot3Icon from "@/public/icons/admin/Dot3Icon";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DownArrowIcon from "@/public/icons/admin/DownArrowIcon";
import EditIcon from "@/public/icons/admin/EditIcon";

// Update the interface to match SpecificFinancialActivityData structure
interface SpecificFinancialActivity {
    lead_submitted: string;
    qualified_leads: string;
    Conversion: string;
    to_company: string;
    check_number: string;
    date: string;
    collected: 'YES' | 'NO';
}

interface ColumnConfig<T = any> {
    label: React.ReactNode;
    accessor: keyof T | string;
    width?: string;
    formatter?: (value: any, row?: T, index?: number) => React.ReactNode;
}

interface SpecificFinancialColumnProps {
    onView?: (row: SpecificFinancialActivity) => void;
    onDownload?: (row: SpecificFinancialActivity) => void;
    onPrint?: (row: SpecificFinancialActivity) => void;
}

interface ActionDropdownProps {
    row: SpecificFinancialActivity;
    onView?: (row: SpecificFinancialActivity) => void;
    onDownload?: (row: SpecificFinancialActivity) => void;
    onPrint?: (row: SpecificFinancialActivity) => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
    row,
    onView,
    onDownload,
    onPrint
}) => {
    return (
        <div className=" ">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="cursor-pointer hover:bg-[#e9e9ea] px-3 py-1.5 rounded-full focus:outline-none">
                        <DownArrowIcon/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 border border-[#d2d2d5] shadow-none">
                    <DropdownMenuItem
                        onClick={() => onView?.(row)}
                        className="cursor-pointer"
                    >
                        YES
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => onDownload?.(row)}
                        className="cursor-pointer"
                    >
                        N/A
                    </DropdownMenuItem>
                    
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

 

export function SpecificFinancialActivityColumn({
    onView,
    onDownload,
    onPrint
}: SpecificFinancialColumnProps): ColumnConfig<SpecificFinancialActivity>[] {

    return [
        {
            label: "Lead Submitted",
            accessor: "lead_submitted",
            width: "150px",
            formatter: (value: string) => (
                <span className="text-base text-[#040C0B]  ">{value}</span>
            ),
        },
        {
            label: "Qualified Leads",
            accessor: "qualified_leads",
            width: "150px",
            formatter: (value: string) => (
                <span className="text-base text-[#040C0B]  ">{value}</span>
            ),
        },
        {
            label: "Conversion",
            accessor: "Conversion",
            width: "150px",
            formatter: (value: string) => (
                <span className="text-base text-[#040C0B]  ">{value}</span>
            ),
        },
        {
            label: "To Company",
            accessor: "to_company",
            width: "120px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
        },
        {
            label: "Check Number",
            accessor: "check_number",
            width: "130px",
            formatter: (value: string) => (
                <div className=" flex items-center justify-between">
                    <span className="text-sm text-[#06030C] font-mono">{value}</span>
                    <button className=" cursor-pointer">

                    <EditIcon/>
                    </button>

                </div>
            ),
        },
        {
            label: "Date",
            accessor: "date",
            width: "120px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
        },
        {
            label: "Collected",
            accessor: "collected",
            width: "100px", // Increased width to accommodate both badge and dropdown
            formatter: (value: 'YES' | 'NO', row: SpecificFinancialActivity) => (
                <div className="flex items-center justify-center gap-2.5">
                  
                <span className="text-sm text-[#06030C]">{value}</span>
                    <ActionDropdown
                        row={row}
                        onView={onView}
                        onDownload={onDownload}
                        onPrint={onPrint}
                    />
                    
                </div>
            ),
        }
    ];
}