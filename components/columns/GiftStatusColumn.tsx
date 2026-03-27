"use client";

import DownArrowIcon from "@/components/icons/admin/DownArrowIcon";
import React from "react";

// Gift Status type definition based on the giftStatusData structure
interface GiftStatus {
    userId: string;
    userName: string;
    recentLead: string;
    leadSent: string;
    giftReceived: string;
    lastGiftDate: string;
    lastGiftReceived: string;
    nextPlannedGift: string;
}

interface ColumnConfig {
    label: React.ReactNode;
    accessor: string;
    width?: string;
    formatter?: (value: any, row?: any, index?: number) => React.ReactNode;
}

interface GiftStatusColumnProps {
    startIndex: number;
    selectedRows: Set<number>;
    currentData: GiftStatus[];
    onSelectAll: (checked: boolean) => void;
    onSelectRow: (globalIndex: number, checked: boolean) => void;
    onView?: (row: GiftStatus) => void;
    onEdit?: (row: GiftStatus) => void;
    onDelete?: (row: GiftStatus) => void;
}

// Date formatter for consistent date display
const DateFormatter = (value: string) => {
    return new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export function GiftStatusColumn({
    startIndex,
    selectedRows,
    currentData,
    onSelectAll,
    onSelectRow,
    onView,
    onEdit,
    onDelete
}: GiftStatusColumnProps): ColumnConfig[] {

    // Check if all rows are selected
    const isAllSelected =
        currentData.length > 0 &&
        currentData.every((_, index) => selectedRows.has(startIndex + index));

    // Check if some rows are selected (for indeterminate state)
    const isSomeSelected = currentData.some((_, index) =>
        selectedRows.has(startIndex + index)
    );

    return [
        // 1. Checkbox Column
        {
            label: (
                <div className="flex items-center justify-center">
                    <input
                        type="checkbox"
                        checked={isAllSelected}
                        ref={(el) => {
                            if (el) el.indeterminate = isSomeSelected && !isAllSelected;
                        }}
                        onChange={(e) => onSelectAll(e.target.checked)}
                        onClick={(e) => e.stopPropagation()}
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
                            onChange={(e) => onSelectRow(globalIndex, e.target.checked)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                    </div>
                );
            },
        },

        // 2. User ID Column
        {
            label: "User ID",
            accessor: "userId",
            width: "90px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C] ">{value}</span>
            ),
        },

        // 3. User Name Column
        {
            label: "User Name",
            accessor: "userName",
            width: "130px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C] ">{value}</span>
            ),
        },

        // 4. Recent Lead Column
        {
            label: "Recent Lead",
            accessor: "recentLead",
            width: "110px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
        },

        // 5. Lead Sent Column
        {
            label: "Total Leads Sent to Us",
            accessor: "leadSent",
            width: "90px",
            formatter: (value: string) => (
                <div className="flex items-center">
                    <span className="text-sm  text-[#06030C]">{value}</span>
                  
                </div>
            ),
        },

        // 6. Gift Received Column
        {
            label: " Total Gift Received",
            accessor: "giftReceived",
            width: "110px",
            formatter: (value: string) => (
                <div className="flex items-center">
                    <span className="text-sm text-[#06030C] ">{value}</span>
                    
                </div>
            ),
        },

        // 7. Conversion Column
        // {
        //     label: " ",
        //     accessor: "conversion",
        //     width: "100px",
        //     formatter: (_: any, row: GiftStatus) => {
        //         if (!row) return null;
        //         const sent = parseInt(row.leadSent);
        //         const received = parseInt(row.giftReceived);
        //         const percentage = Math.round((received / sent) * 100);
                
        //         let colorClass = "text-gray-600";
        //         if (percentage >= 30) colorClass = "text-green-600";
        //         else if (percentage >= 20) colorClass = "text-yellow-600";
        //         else colorClass = "text-red-600";
                
        //         return (
        //             <span className={`text-sm font-medium ${colorClass}`}>
        //                 {percentage}%
        //             </span>
        //         );
        //     },
        // },

        // 8. Last Gift Column
        {
            label: "Last Gift Date",
            accessor: "lastGiftReceived",
            width: "150px",
            formatter: (value: string, row: GiftStatus) => (
                <div className="flex flex-col">
                  
                    <span className="text-sm text-[#06030C] ">{DateFormatter(row?.lastGiftDate)}</span>
                </div>
            ),
        },

        // 9. Next Planned Gift Column
        {
            label: "Last Gift Received",
            accessor: "nextPlannedGift",
            width: "140px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C] ">
                    {value}
                </span>
            ),
        },

        // 10. Last Gift Date Column (separate if needed)
        {
            label: "Next Planned Gift",
            accessor: "lastGiftDate",
            width: "120px",
            formatter: (value: string) => (
                <div className=" flex items-center justify-between">
                    <span className="text-sm text-[#06030C] ">{DateFormatter(value)}</span>
                    <DownArrowIcon/>

                </div>
            ),
        },
    ];
}