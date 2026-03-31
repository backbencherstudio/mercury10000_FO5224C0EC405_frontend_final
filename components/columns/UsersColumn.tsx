import React from 'react';

export interface UsersColumnOptions {
	selectedRows: Set<string>;
	handleSelectAll: (checked: boolean) => void;
	handleSelectRow: (id: string, checked: boolean) => void;
	currentData: any[];
}

export function UsersColumn({
	selectedRows,
	handleSelectAll,
	handleSelectRow,
	currentData,
}: UsersColumnOptions) {
	return [
		{
			label: (
				<div className="flex items-center justify-center">
					<input
						type="checkbox"
						checked={selectedRows.size === currentData.length && currentData.length > 0}
						ref={el => {
							if (el) el.indeterminate = selectedRows.size > 0 && selectedRows.size < currentData.length;
						}}
						onChange={e => handleSelectAll(e.target.checked)}
						onClick={e => e.stopPropagation()}
						className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
					/>
				</div>
			),
			accessor: 'checkbox',
			width: '50px',
			formatter: (_: any, row: any) => (
				<div className="flex items-center justify-center">
					<input
						type="checkbox"
						checked={selectedRows.has(row.userId)}
						onChange={e => handleSelectRow(row.userId, e.target.checked)}
						onClick={e => e.stopPropagation()}
						className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
					/>
				</div>
			),
		},
		{
			label: 'User ID',
			accessor: 'userId',
			width: '80px',
			formatter: (value: string) => <span className="text-sm text-[#06030C]">{value}</span>,
		},
		{
			label: 'Name',
			accessor: 'name',
			width: '140px',
			formatter: (value: string) => <span className="text-sm text-[#06030C]">{value}</span>,
		},
		{
			label: 'Trade',
			accessor: 'trade',
			width: '120px',
			formatter: (value: string) => <span className="text-sm text-[#06030C]">{value}</span>,
		},
		{
			label: 'Last Lead Sent',
			accessor: 'last_lead_he_sent',
			width: '140px',
			formatter: (value: string) => <span className="text-sm text-[#06030C]">{value}</span>,
		},
		{
			label: 'Total Leads Sent',
			accessor: 'total_leads_he_sent',
			width: '120px',
			formatter: (value: number) => <span className="text-sm text-[#06030C]">{value}</span>,
		},
		{
			label: 'Last Connection Sent',
			accessor: 'last_connection_we_sent',
			width: '160px',
			formatter: (value: string) => <span className="text-sm text-[#06030C]">{value}</span>,
		},
	];
}
