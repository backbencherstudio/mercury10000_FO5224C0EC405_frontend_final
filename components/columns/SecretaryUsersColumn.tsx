import React from "react";

// Secretary user type definition based on the data structure
interface SecretaryUser {
    id: string;
    name: string;
    phone: string;
    city: string;
}

interface ColumnConfig<T = any> {
    label: React.ReactNode;
    accessor: keyof T | string;
    width?: string;
    formatter?: (value: any, row?: T, index?: number) => React.ReactNode;
}

export function SecretaryUsersColumn(): ColumnConfig<SecretaryUser>[] {
    return [
        {
            label: "ID",
            accessor: "id",
            width: "100px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
        },
        {
            label: "Name",
            accessor: "name",
            width: "140px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
        },
        {
            label: "Phone",
            accessor: "phone",
            width: "170px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
        },
        {
            label: "City",
            accessor: "city",
            width: "150px",
            formatter: (value: string) => (
                <span className="text-sm text-[#06030C]">{value}</span>
            ),
        },
    ];
}