"use client";

import React from "react";
import Dot3Icon from "@/components/icons/admin/Dot3Icon";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TopRightArrow from "../icons/admin/TopRightArrow";

// UserResponse type based on userResponsesData
export interface UserResponse {
    user_id: number;
    lead_id: number;
    user_name: string;
    trade: string;
    he_sent: string;
    total_leads: number;
    res_from_user: 'yes' | 'no';
}

interface ColumnConfig<T = any> {
    label: React.ReactNode;
    accessor: keyof T | string;
    width?: string;
    formatter?: (value: any, row?: T, index?: number) => React.ReactNode;
}

interface UserResponsesColumnProps {
    onEdit?: (row: UserResponse) => void;
}

interface ActionDropdownProps {
    row: UserResponse;
    onEdit?: (row: UserResponse) => void;
}


const ActionDropdown: React.FC<ActionDropdownProps> = ({ row, onEdit }) => (
    <div className="flex justify-center w-full">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="cursor-pointer hover:bg-[#e9e9ea] px-3 py-1.5 rounded-full focus:outline-none">
                    <Dot3Icon />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 border border-[#d2d2d5] shadow-none">
                <DropdownMenuItem
                    onClick={() => onEdit?.(row)}
                    className="cursor-pointer"
                >
                    Assign Request
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
);

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogClose
} from "@/components/ui/dialog";

export function UserResponsesColumn({ onEdit }: UserResponsesColumnProps): ColumnConfig<UserResponse>[] {
    return [
        {
            label: "User ID",
            accessor: "user_id",
            width: "100px",
            formatter: (value: number) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
        },
        {
            label: "Lead ID",
            accessor: "lead_id",
            width: "100px",
            formatter: (value: number, row: UserResponse) => (
                <div className="flex items-center justify-between">
                    <span className="text-sm text-[#06030C]">{value}</span>
                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="ml-2 p-1 rounded-full hover:bg-gray-200">
                                <TopRightArrow />
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[890px] w-full bg-white p-6">

                            <h2 className=" text-[32px] text-[#070707]  font-medium text-center">Lead ID #2001</h2>
                            <div className=" flex   gap-8">
                                <div className=" flex-3/5  ">
                                    <div className=" space-y-8">
                                        <div className=" space-y-2.5">
                                            <div className=" border-b  border-[#E9E9EA] pb-2.5">
                                                <h3 className=" text-base text-[#070707] font-medium">City:</h3>
                                                <p className=" text-sm text-[#777980] mt-2.5">123 Main St, Los Angeles</p>

                                            </div>
                                            <div className=" border-b  border-[#E9E9EA] pb-2.5">
                                                <h3 className=" text-base text-[#070707] font-medium">Trade:</h3>
                                                <p className=" text-sm text-[#777980] mt-2.5">Electrician</p>

                                            </div>

                                        </div>
                                        <div className=" border-b  border-[#E9E9EA] pb-2.5">
                                            <h3 className=" text-base text-[#070707] font-medium">Note:</h3>
                                            <p className=" text-sm text-[#777980] mt-2.5">The lead is located on 123 Main St. The owner’s name is John Smith. He has some roof leaking issue. I’ve shared some images based on specific objective.

                                                Please see the images below for this specific lead.... See More</p>
                                        </div>

                                        <div>
                                            <h3 className=" text-base text-[#070707] font-medium">Images (3)</h3>
                                            <div className="flex gap-4 mt-4">
                                                {/* Example image placeholders using divs */}
                                                <div className="flex flex-col items-center w-1/3">
                                                    <div className="w-full h-32 rounded-md bg-gray-200 flex items-center justify-center text-gray-400 text-lg font-semibold border border-gray-300">Image 1</div>
                                                    <span className="mt-2 text-xs text-gray-600">Caption 1</span>
                                                </div>
                                                <div className="flex flex-col items-center w-1/3">
                                                    <div className="w-full h-32 rounded-md bg-gray-200 flex items-center justify-center text-gray-400 text-lg font-semibold border border-gray-300">Image 2</div>
                                                    <span className="mt-2 text-xs text-gray-600">Caption 2</span>
                                                </div>
                                                <div className="flex flex-col items-center w-1/3">
                                                    <div className="w-full h-32 rounded-md bg-gray-200 flex items-center justify-center text-gray-400 text-lg font-semibold border border-gray-300">Image 3</div>
                                                    <span className="mt-2 text-xs text-gray-600">Caption 3</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" flex-2/5 border p-6 rounded-[12px]">
                                    <h2 className=" text-2xl text-[#111827] font-medium">User Details</h2>
                                    <div className="mt-8 space-y-6">
                                        <div>
                                            <h3 className=" text-base text-[#1D1F2C] mb-1.5">Sent to</h3>
                                            <p className=" text-base text-[#777980]">Floyd Miles <span className=" text-[#D2D2D5]"> (ID 1235)</span> </p>
                                        </div>
                                        <div>
                                            <h3 className=" text-base text-[#1D1F2C] mb-1.5">User’s Response</h3>
                                            <p className=" text-base text-[#006557] bg-[#B0E4DD] px-3 inline-block rounded-full">YES</p>
                                        </div>
                                        <div>
                                            <h3 className=" text-base text-[#1D1F2C] mb-1.5">User’s Phone</h3>
                                            <p className=" text-base text-[#777980]">F+32 231242134</p>
                                        </div>
                                        <div>
                                            <h3 className=" text-base text-[#1D1F2C] mb-1.5">User’s Trade</h3>
                                            <p className=" text-base text-[#777980]">Plumbing, Electrician</p>
                                        </div>
                                        <div>
                                            <h3 className=" text-base text-[#1D1F2C] mb-1.5">Connection Sent to User</h3>
                                            <p className=" text-base text-[#777980]">Feb 17, 2026</p>
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </DialogContent>
                    </Dialog>
                </div>
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
            label: "Trade",
            accessor: "trade",
            width: "120px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
        },
        {
            label: "He Sent",
            accessor: "he_sent",
            width: "120px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
        },
        {
            label: "Total Leads",
            accessor: "total_leads",
            width: "100px",
            formatter: (value: number) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
        },
        {
            label: "Response",
            accessor: "res_from_user",
            width: "100px",
            formatter: (value: 'yes' | 'no') => (
                <span className={` uppercase px-3 py-0.5 text-base rounded-full
                    ${value === 'yes'
                        ? "text-[#006557] text-sm bg-[#b0e4dd]"
                        : "text-[#990000] text-sm bg-[#ffb0b0]"
                    }`}>
                    {value === 'yes' ? 'Yes' : 'No'}
                </span>
            ),
        },
        {
            label: "Action",
            accessor: "action",
            width: "20px",
            formatter: (_: any, row: UserResponse) => (
                <ActionDropdown row={row} onEdit={onEdit} />
            ),
        },
    ];
}
