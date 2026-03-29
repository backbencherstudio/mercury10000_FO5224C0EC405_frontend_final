import React from 'react';
import CustomDropdown from '@/components/custom-dropdown/CustomDropdown';
import { format } from 'path';


export interface RequestPoolColumnOptions {
	selectedRows: Set<string>;
	handleSelectAll: (checked: boolean) => void;
	handleSelectRow: (id: string, checked: boolean) => void;
	handleView: (row: any) => void;
	handleEdit: (row: any) => void;
	handleDelete: (row: any) => void;
	currentData: any[];
	setViewNote: (note: string) => void;
}

export function RequestPoolColumn({
	selectedRows,
	handleSelectAll,
	handleSelectRow,
	handleView,
	handleEdit,
	handleDelete,
	currentData,
	setViewNote,
}: RequestPoolColumnOptions) {
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
						checked={selectedRows.has(row.id)}
						onChange={e => handleSelectRow(row.id, e.target.checked)}
						onClick={e => e.stopPropagation()}
						className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
					/>
				</div>
			),
		},
		{
			label: 'ID',
			accessor: 'id',
			width: '60px',
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
		},
		{
			label: 'City',
			accessor: 'city',
			width: '120px',
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
		},
		{
			label: 'Trade',
			accessor: 'Trade',
			width: '120px',
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
		},
		{
			label: 'Note',
			accessor: 'note',
			width: '200px',
			formatter: (value: string, row: any) => (
				<>
					<span>
						{value.length > 60 ? value.slice(0, 60) + '......' : value}
					</span>
					{/* {value.length > 60 && (
						<button
							className="ml-2 text-xs underline text-blue-600 hover:text-blue-800"
							onClick={() => setViewNote(value)}
							type="button"
						>
							View More
						</button>
					)} */}
				</>
			),
		},
		{
			label: 'Action',
			accessor: 'action',
			width: '20px',
			formatter: (_: any, row: any) => (
				<CustomDropdown
					items={[
						{ label: 'View', onClick: () => handleView(row) },
						{ label: 'Edit', onClick: () => handleEdit(row) },
						{ label: 'Delete', onClick: () => handleDelete(row), className: 'text-red-600' },
					]}
				/>
			),
		},
	];
}

