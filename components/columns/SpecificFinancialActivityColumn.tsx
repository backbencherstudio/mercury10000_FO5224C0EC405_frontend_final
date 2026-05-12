"use client";

import React from "react";
import Dot3Icon from "@/components/icons/admin/Dot3Icon";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DownArrowIcon from "@/components/icons/admin/DownArrowIcon";
import EditIcon from "@/components/icons/admin/EditIcon";
import { useUpdateLeadStatusMutation } from "@/redux/features/user/user";
import toast from "react-hot-toast";

// Update the interface to match SpecificFinancialActivityData structure
interface SpecificFinancialActivity {
    id: string;
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

    const [updateLeadStatus, { isLoading }] = useUpdateLeadStatusMutation();
    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            await updateLeadStatus({ id, body: { status } }).unwrap();
            toast.success("Status updated successfully");
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const toggleStatus = async (row: SpecificFinancialActivity) => {
        try {
            const newStatus = row.collected ? false : true;

            await updateLeadStatus({
                id: row.id,
                body: { collected: newStatus }
            }).unwrap();

            toast.success(`Status updated successfully`);
        } catch (error) {
            console.log(error);
            toast.error("Failed to update status");
        }
    };


    return (
        <div className=" ">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="cursor-pointer hover:bg-[#e9e9ea] px-3 py-1.5 rounded-full focus:outline-none">
                        <DownArrowIcon />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-20  border border-[#d2d2d5] shadow-none">
                    <DropdownMenuItem
                        onClick={() => toggleStatus(row)}
                        className="cursor-pointer"
                    >
                        <span className="text-sm text-[#06030C]">
                            {row.collected ? "YES" : "NO"}
                        </span>
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

    const formatDate = (date: string) => {
        if (!date) return "--"

        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    return [
        {
            label: "Lead Submitted",
            accessor: "lead_submitted_addr",
            width: "150px",
            formatter: (value: string) => (
                <span className="text-base text-[#040C0B]  ">{value}</span>
            ),
        },
        {
            label: "Qualified Leads",
            accessor: "qualified_leads_addr",
            width: "150px",
            formatter: (value: string) => (
                <span className="text-base text-[#040C0B]  ">{value}</span>
            ),
        },
        {
            label: "Conversion",
            accessor: "conversation_addr",
            width: "150px",
            formatter: (value: string) => (
                <span className="text-base text-[#040C0B]  ">{value || "--"}</span>
            ),
        },
        {
            label: "To Company",
            accessor: "to_company",
            width: "120px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value || "--"}</span>
            ),
        },
        {
            label: "Check Number",
            accessor: "lead_no",
            width: "130px",
            formatter: (value: string, row: SpecificFinancialActivity) => (
                <div className=" flex items-center justify-between">
                    <span className="text-sm text-[#06030C] font-mono">{value}</span>
                    <button className=" cursor-pointer" onClick={() => onView?.(row)}>

                        <EditIcon />
                    </button>

                </div>
            ),
        },
        {
            label: "Date",
            accessor: "created_at",
            width: "120px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{formatDate(value)}</span>
            ),
        },
        {
            label: "Collected",
            accessor: "collected",
            width: "100px", // Increased width to accommodate both badge and dropdown
            formatter: (value: boolean, row: SpecificFinancialActivity) => (
                <div className="flex items-center justify-center gap-2.5">

                    <span className="text-sm text-[#06030C]">
                        {value ? <span className="text-[#990000]">NO</span> : <span className="text-[#006557] ">YES</span>}
                    </span>

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