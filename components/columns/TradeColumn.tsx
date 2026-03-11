"use client";

import React from "react";
import Dot3Icon from "@/public/icons/admin/Dot3Icon";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Trade type definition based on the TreadData structure
interface Trade {
    serial_no: string;
    trade_name: string;
    date: string;
    status: "active" | "pause";
}

interface ColumnConfig<T = any> {
    label: React.ReactNode;
    accessor: keyof T | string;
    width?: string;
    formatter?: (value: any, row?: T, index?: number) => React.ReactNode;
}

interface TradeColumnProps {
    onView?: (row: Trade) => void;
    onEdit?: (row: Trade) => void;
    onDelete?: (row: Trade) => void;
    onStatusChange?: (row: Trade) => void;
}

interface ActionDropdownProps {
    row: Trade;
    onView?: (row: Trade) => void;
    onEdit?: (row: Trade) => void;
    onDelete?: (row: Trade) => void;
    onStatusChange?: (row: Trade) => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
    row,
    onView,
    onEdit,
    onDelete,
    onStatusChange
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
                        onClick={() => onDelete?.(row)}
                        className="cursor-pointer  "
                    >
                        Delete Trade
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => onView?.(row)}
                        className="cursor-pointer"
                    >
                        Pause Trade
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => onEdit?.(row)}
                        className="cursor-pointer"
                    >
                        Active Trade
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem
                        onClick={() => onStatusChange?.(row)}
                        className="cursor-pointer"
                    >
                        {row.status === 'active' ? 'Pause Trade' : 'Activate Trade'}
                    </DropdownMenuItem> */}

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export function TradeColumn({
    onView,
    onEdit,
    onDelete,
    onStatusChange
}: TradeColumnProps): ColumnConfig<Trade>[] {

    // Return all columns configuration with proper typing
    return [
        {
            label: "Serial No.",
            accessor: "serial_no",
            width: "50px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
        },
        {
            label: "Trade Name",
            accessor: "trade_name",
            width: "300px",
            formatter: (value: string) => (
                <span className="text-sm font-medium text-[#06030C]">{value}</span>
            ),
        },
        {
            label: "Date",
            accessor: "date",
            width: "300px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
        },
        {
            label: "Status",
            accessor: "status",
            width: "300px",
            formatter: (value: "active" | "pause") => {
                const statusConfig = {
                    active: {
                        bgColor: "bg-[#A7EADE]",
                        textColor: "text-[#116557]",
                        label: "Active"

                    },
                    pause: {
                        bgColor: "bg-[#FFB0B0]",
                        textColor: "text-[#CC0000]",
                        label: "Paused"
                    }
                };

                const config = statusConfig[value] || statusConfig.pause;

                return (
                    <div className=" inline-flex items-center justify-center w-full">

                        <span className={` px-2 py-1 rounded-[4px] text-xs font-medium ${config.bgColor} ${config.textColor}`}>

                            {config.label}
                        </span>
                    </div>
                );
            },
        },
        {
            label: "Action",
            accessor: "action",
            width: "50px",
            formatter: (_: any, row: Trade) => (
                <ActionDropdown
                    row={row}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                />
            ),
        },
    ];
}