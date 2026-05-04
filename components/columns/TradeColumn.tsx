"use client";

import React from "react";
import Dot3Icon from "@/components/icons/admin/Dot3Icon";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Trade type definition
interface Trade {
    serial_no: string;
    trade_name: string;
    date: string;
    status: "active" | "pause";
    id: string;
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
                        className="cursor-pointer text-red-600 hover:text-red-700"
                    >
                        Delete Trade
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => onStatusChange?.(row)}
                        className="cursor-pointer"
                    >
                        {row.status === 'active' ? 'Pause Trade' : 'Activate Trade'}
                    </DropdownMenuItem>
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

    return [
        {
            label: "Serial No.",
            accessor: "serial_no",
            width: "100px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
        },
        {
            label: "Trade Name",
            accessor: "trade_name",
            width: "250px",
            formatter: (value: string) => (
                <span className="text-sm font-medium text-[#06030C]">{value}</span>
            ),
        },
        {
            label: "Date",
            accessor: "date",
            width: "200px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
        },
        {
            label: "Status",
            accessor: "status",
            width: "150px",
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
                    <div className="inline-flex items-center justify-center w-full">
                        <span className={`px-3 py-1 rounded-[4px] text-xs font-medium ${config.bgColor} ${config.textColor}`}>
                            {config.label}
                        </span>
                    </div>
                );
            },
        },
        {
            label: "Action",
            accessor: "action" as any,
            width: "100px",
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