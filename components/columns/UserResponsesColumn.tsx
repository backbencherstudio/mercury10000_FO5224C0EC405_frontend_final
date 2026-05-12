"use client";

import React, { useState } from "react";
import Dot3Icon from "@/components/icons/admin/Dot3Icon";
import TopRightArrow from "../icons/admin/TopRightArrow";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog";
import { useGetSingleRequesStatusQuery } from "@/redux/features/connection/connections";

// UserResponse type based on API response
export interface UserResponse {
    user_id: string;
    lead_id: string;
    user_name: string;
    trade: string;
    last_lead_he_sent: string;
    total_leads_he_sent: number;
    response_from_user: 'YES' | 'NO';
    num_connection_sent_by_us: number;
    total_assigned_connection: number;
    location?: string; // Add if available
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


const ActionDropdown: React.FC<ActionDropdownProps> = ({ row, onEdit }) => {
    const [open, setOpen] = useState(false);

    const {
        data: leadData,
        isLoading,
    } = useGetSingleRequesStatusQuery(row.lead_id, {
        skip: !open,
    });
    const detail = leadData?.data;

    return (
        <div className="flex justify-center w-full">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button
                        onClick={() => setOpen(true)}
                        className="cursor-pointer hover:bg-[#e9e9ea] px-3 py-1.5 rounded-full focus:outline-none"
                    >
                        <Dot3Icon />
                    </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[890px] w-full bg-white p-6">
                    {isLoading ? (
                        <div className="text-center py-10">Loading...</div>
                    ) : (
                        <>
                            <div className=" flex gap-8 mt-8">
                                <div className=" flex-3/5  ">
                                    <div className=" space-y-8">
                                        <div className=" space-y-2.5">
                                            <div className=" border-b  border-[#E9E9EA] pb-2.5">
                                                <h3 className=" text-base text-[#070707] font-medium">City:</h3>
                                                <p className=" text-sm text-[#777980] mt-2.5">{detail?.city || detail?.location || "N/A"}</p>
                                            </div>
                                            <div className=" border-b  border-[#E9E9EA] pb-2.5">
                                                <h3 className=" text-base text-[#070707] font-medium">Trade:</h3>
                                                <p className=" text-sm text-[#777980] mt-2.5">{detail?.trade || "N/A"}</p>
                                            </div>
                                        </div>
                                        <div className=" border-b  border-[#E9E9EA] pb-2.5">
                                            <h3 className=" text-base text-[#070707] font-medium">Note:</h3>
                                            <p className=" text-sm text-[#777980] mt-2.5">{detail?.note || detail?.description || "No notes available."}</p>
                                        </div>

                                        <div>
                                            <h3 className=" text-base text-[#070707] font-medium">Images ({detail?.files?.length || 0})</h3>
                                            <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
                                                {detail?.files && detail.files.length > 0 ? (
                                                    detail.files.map((file: any, idx: number) => (
                                                        <div key={idx} className="flex flex-col items-center min-w-[120px]">
                                                            <div className="w-full h-32 rounded-md bg-gray-200 overflow-hidden border border-gray-300">
                                                                <img src={file.url || file.path} alt={`Lead ${idx}`} className="w-full h-full object-cover" />
                                                            </div>
                                                            <span className="mt-2 text-xs text-gray-600">image {idx + 1}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-sm text-gray-400">No images</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" flex-2/5 border p-6 rounded-[12px] h-fit">
                                    <h2 className=" text-2xl text-[#111827] font-medium">User Details</h2>
                                    <div className="mt-8 space-y-6">
                                        <div>
                                            <h3 className=" text-base text-[#1D1F2C] mb-1.5 font-medium">Sent to</h3>
                                            <p className=" text-base text-[#777980]">{row.user_name} <span className=" text-[#D2D2D5]"> (ID {row.user_id})</span> </p>
                                        </div>
                                        <div>
                                            <h3 className=" text-base text-[#1D1F2C] mb-1.5 font-medium">User’s Response</h3>
                                            <p className={`text-base px-3 inline-block rounded-full ${row.response_from_user === 'YES' ? 'text-[#006557] bg-[#B0E4DD]' : 'text-[#990000] bg-[#FFB0B0]'}`}>
                                                {row.response_from_user}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className=" text-base text-[#1D1F2C] mb-1.5 font-medium">User’s Trade</h3>
                                            <p className=" text-base text-[#777980]">{row.trade}</p>
                                        </div>
                                        <div>
                                            <h3 className=" text-base text-[#1D1F2C] mb-1.5 font-medium">Connection Assigned</h3>
                                            <p className=" text-base text-[#777980]">{row.num_connection_sent_by_us} time(s)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};



const LeadIdCell = ({ value, row }: { value: string, row: UserResponse }) => {
    const { data: leadData, isLoading } = useGetSingleRequesStatusQuery(row.lead_id);
    const detail = leadData?.data;

    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-[#06030C]">{value}</span>
            <Dialog>
                <DialogTrigger asChild>
                    <button className="ml-2 p-1 rounded-full hover:bg-gray-200">
                        <TopRightArrow />
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[890px] w-full bg-white p-6">
                    {isLoading ? (
                        <div className="text-center py-10">Loading...</div>
                    ) : (
                        <>
                            <h2 className=" text-[32px] text-[#070707]  font-medium text-center">Lead ID #{detail?.lead_id || value}</h2>
                            <div className=" flex gap-8 mt-8">
                                <div className=" flex-3/5  ">
                                    <div className=" space-y-8">
                                        <div className=" space-y-2.5">
                                            <div className=" border-b  border-[#E9E9EA] pb-2.5">
                                                <h3 className=" text-base text-[#070707] font-medium">City:</h3>
                                                <p className=" text-sm text-[#777980] mt-2.5">{detail?.city || detail?.location || "N/A"}</p>
                                            </div>
                                            <div className=" border-b  border-[#E9E9EA] pb-2.5">
                                                <h3 className=" text-base text-[#070707] font-medium">Trade:</h3>
                                                <p className=" text-sm text-[#777980] mt-2.5">{detail?.trade || "N/A"}</p>
                                            </div>
                                        </div>
                                        <div className=" border-b  border-[#E9E9EA] pb-2.5">
                                            <h3 className=" text-base text-[#070707] font-medium">Note:</h3>
                                            <p className=" text-sm text-[#777980] mt-2.5">{detail?.note || detail?.description || "No notes available."}</p>
                                        </div>

                                        <div>
                                            <h3 className=" text-base text-[#070707] font-medium">Images ({detail?.files?.length || 0})</h3>
                                            <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
                                                {detail?.files && detail.files.length > 0 ? (
                                                    detail.files.map((file: any, idx: number) => (
                                                        <div key={idx} className="flex flex-col items-center min-w-[120px]">
                                                            <div className="w-full h-32 rounded-md bg-gray-200 overflow-hidden border border-gray-300">
                                                                <img src={file.url || file.path} alt={`Lead ${idx}`} className="w-full h-full object-cover" />
                                                            </div>
                                                            <span className="mt-2 text-xs text-gray-600">image {idx + 1}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-sm text-gray-400">No images</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" flex-2/5 border p-6 rounded-[12px] h-fit">
                                    <h2 className=" text-2xl text-[#111827] font-medium">User Details</h2>
                                    <div className="mt-8 space-y-6">
                                        <div>
                                            <h3 className=" text-base text-[#1D1F2C] mb-1.5 font-medium">Sent to</h3>
                                            <p className=" text-base text-[#777980]">{row.user_name} <span className=" text-[#D2D2D5]"> (ID {row.user_id})</span> </p>
                                        </div>
                                        <div>
                                            <h3 className=" text-base text-[#1D1F2C] mb-1.5 font-medium">User’s Response</h3>
                                            <p className={`text-base px-3 inline-block rounded-full ${row.response_from_user === 'YES' ? 'text-[#006557] bg-[#B0E4DD]' : 'text-[#990000] bg-[#FFB0B0]'}`}>
                                                {row.response_from_user}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className=" text-base text-[#1D1F2C] mb-1.5 font-medium">User’s Trade</h3>
                                            <p className=" text-base text-[#777980]">{row.trade}</p>
                                        </div>
                                        <div>
                                            <h3 className=" text-base text-[#1D1F2C] mb-1.5 font-medium">Connection Assigned</h3>
                                            <p className=" text-base text-[#777980]">{row.num_connection_sent_by_us} time(s)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

const UserNameCell = ({ value, row }: { value: string, row: UserResponse }) => {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-[#06030C]">{value}</span>
            <Dialog>
                <DialogTrigger asChild>
                    <button className="ml-2 p-1 rounded-full hover:bg-gray-200">
                        <TopRightArrow />
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[400px] w-full bg-white p-6">
                    <h2 className="text-2xl text-[#111827] font-medium mb-6">User Quick View</h2>
                    <div className="space-y-4">

                        <div className="flex justify-between border-b pb-2">
                            <span className="text-sm font-medium text-gray-500">Name</span>
                            <span className="text-sm text-gray-900">{row.user_name}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-sm font-medium text-gray-500">City</span>
                            <span className="text-sm text-gray-900">{row.location || "N/A"}</span>
                        </div>

                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export function UserResponsesColumn({ onEdit }: UserResponsesColumnProps): ColumnConfig<UserResponse>[] {
    return [
        {
            label: "User ID",
            accessor: "user_id",
            width: "100px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
        },
        {
            label: "Lead ID",
            accessor: "lead_id",
            width: "120px",
            formatter: (value: string, row: UserResponse) => (
                <LeadIdCell value={value} row={row} />
            ),
        },
        {
            label: "User Name",
            accessor: "user_name",
            width: "180px",
            formatter: (value: string, row: UserResponse) => (
                <UserNameCell value={value} row={row} />
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
            accessor: "last_lead_he_sent",
            width: "120px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">
                    {value || "-"}
                </span>
            ),
        },
        {
            label: "Total Leads",
            accessor: "total_leads_he_sent",
            width: "100px",
            formatter: (value: number) => (
                <span className="text-sm text-[#06030C]">
                    {value}
                </span>
            ),
        },
        {
            label: "Response",
            accessor: "response_from_user",
            width: "100px",
            formatter: (value: string) => (
                <span className={` uppercase px-3 py-0.5 text-base rounded-full
                    ${value === 'YES'
                        ? "text-[#006557] text-sm bg-[#b0e4dd]"
                        : "text-[#990000] text-sm bg-[#ffb0b0]"
                    }`}>
                    {value}
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
