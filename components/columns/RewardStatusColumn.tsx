import React from "react";

// Reward status type definition based on the data structure
export interface RewardStatus {
	id: number;
	user_name: string;
	recent_lead: string;
	total_leads_sent_us: number;
	total_gift_received: number;
	last_gift_date: string;
	last_gift_received: string;
	next_planned_gift: string;
}

interface ColumnConfig<T = any> {
	label: React.ReactNode;
	accessor: keyof T | string;
	width?: string;
	formatter?: (value: any, row?: T, index?: number) => React.ReactNode;
}

export function RewardStatusColumn(): ColumnConfig<RewardStatus>[] {
	return [
		{
			label: "ID",
			accessor: "id",
			width: "80px",
			formatter: (value: number) => (
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
			label: "Recent Lead",
			accessor: "recent_lead",
			width: "120px",
			formatter: (value: string) => (
				<span className="text-sm text-[#06030C]">{value}</span>
			),
		},
		{
			label: "Total Leads Sent",
			accessor: "total_leads_sent_us",
			width: "120px",
			formatter: (value: number) => (
				<span className="text-sm text-[#06030C]">{value}</span>
			),
		},
		{
			label: "Total Gift Received",
			accessor: "total_gift_received",
			width: "120px",
			formatter: (value: number) => (
				<span className="text-sm text-[#06030C]">{value}</span>
			),
		},
		{
			label: "Last Gift Date",
			accessor: "last_gift_date",
			width: "120px",
			formatter: (value: string) => (
				<span className="text-sm text-[#06030C]">{value}</span>
			),
		},
		{
			label: "Last Gift Received",
			accessor: "last_gift_received",
			width: "140px",
			formatter: (value: string) => (
				<span className="text-sm text-[#06030C]">{value}</span>
			),
		},
		{
			label: "Next Planned Gift",
			accessor: "next_planned_gift",
			width: "140px",
			formatter: (value: string) => (
				<span className="text-sm text-[#06030C]">{value}</span>
			),
		},
	];
}
