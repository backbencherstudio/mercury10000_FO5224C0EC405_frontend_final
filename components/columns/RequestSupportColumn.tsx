
import Dot3Icon from "@/components/icons/admin/Dot3Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GreenDownArrow from "../icons/secretary/GreenDownArrow";
import RedDownArrow from "../icons/secretary/RedDownArrow";
 

// Type for a support request row
export interface RequestSupportRow {
  id: string;
  user_name: string;
  phone_no: string;
  city: string;
  supportReqDate: string;
  status: "Solved" | "Pending";
}

export interface ColumnConfig<T = any> {
  label: React.ReactNode;
  accessor: keyof T | string;
  width?: string;
  formatter?: (value: any, row?: T, index?: number) => React.ReactNode;
}

interface RequestSupportColumnProps {
  onView?: (row: RequestSupportRow) => void;
  onDelete?: (row: RequestSupportRow) => void;
}

interface ActionDropdownProps {
  row: RequestSupportRow;
  onView?: (row: RequestSupportRow) => void;
  onDelete?: (row: RequestSupportRow) => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({ row, onView, onDelete }) => {
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
            onClick={() => onView?.(row)}
            className="cursor-pointer"
          >
            Write Note to Admin
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export function RequestSupportColumn({ onView, onDelete }: RequestSupportColumnProps): ColumnConfig<RequestSupportRow>[] {
  return [
    {
      label: "ID",
      accessor: "id",
      width: "80px",
      formatter: (value: string) => <span className="text-sm text-[#06030C]">{value}</span>,
    },
    {
      label: "User Name",
      accessor: "user_name",
      width: "140px",
      formatter: (value: string) => <span className="text-sm text-[#06030C]">{value}</span>,
    },
    {
      label: "Phone No.",
      accessor: "phone_no",
      width: "130px",
      formatter: (value: string) => <span className="text-sm text-[#06030C]">{value}</span>,
    },
    {
      label: "City",
      accessor: "city",
      width: "120px",
      formatter: (value: string) => <span className="text-sm text-[#06030C]">{value}</span>,
    },
    {
      label: "Support Request Date",
      accessor: "supportReqDate",
      width: "130px",
      formatter: (value: string) => <span className="text-sm text-[#06030C]">{value}</span>,
    },
    {
      label: "Status",
      accessor: "status",
      width: "100px",
      formatter: (value: string) => (
        <span className={`text-xs font-semibold px-2 py-2 rounded-[4px] inline-flex items-center gap-2   ${value === "Solved" ? "bg-[#a7eade] text-[#116557]" : "bg-[#ffb0b0] text-[#C00]"}`}>
          {value}

          {value === "Solved" ? <GreenDownArrow /> : <RedDownArrow />}
        </span>
      ),
    },
    {
      label: "Action",
      accessor: "action",
      width: "20px",
      formatter: (_: any, row: RequestSupportRow) => (
        <ActionDropdown row={row} onView={onView} onDelete={onDelete} />
      ),
    },
  ];
}
