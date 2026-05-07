import React from "react";
import Dot3Icon from "@/components/icons/admin/Dot3Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TopRightArrow from "../icons/admin/TopRightArrow";
import CustomDropdown from "../custom-dropdown/CustomDropdown";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "../ui/dialog";
import LocationIcon from "@/components/icons/admin/LocationIcon";
import UserIcon from "@/components/icons/admin/UserIcon";
import PhoneIcon from "@/components/icons/admin/PhoneIcon";

interface LeadHistory {
  id: string;
  city: string;
  home_owner_name: string;
  Trade: string;
  lead_sent: string;
  status: string;
}

interface ColumnConfig<T = any> {
  label: React.ReactNode;
  accessor: keyof T | string;
  width?: string;
  formatter?: (value: any, row?: T, index?: number) => React.ReactNode;
}

interface ProcessLeadsColumnProps {
  startIndex: number;
  selectedRows: Set<number>;
  currentData: LeadHistory[];
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (globalIndex: number, checked: boolean) => void;
  onView?: (row: LeadHistory) => void;
  onDelete?: (row: LeadHistory) => void;
  onEdit?: (row: LeadHistory) => void;
  onStatusChange?: (id: string, newStatus: string) => void;
}

interface ActionDropdownProps {
  row: LeadHistory;
  onView?: (row: LeadHistory) => void;
  onDelete?: (row: LeadHistory) => void;
  onEdit?: (row: LeadHistory) => void;
}

// ─── Lead Sent Cell: clicking the arrow opens the view dialog with all details ─
function LeadSentCell({ value, row }: { value: string; row: any }) {
  const [openView, setOpenView] = React.useState(false);

  let bg = "bg-gray-200";
  let text = "text-gray-800";
  const statusVal = (row?.status || "").toLowerCase();
  if (statusVal === "scheduled") { bg = "bg-[#F8E997]"; text = "text-[#AC8815]"; }
  else if (statusVal === "active" || statusVal === "active work") { bg = "bg-[#A7EADE]"; text = "text-[#116557]"; }
  else if (statusVal === "closed" || statusVal === "invalid") { bg = "bg-[#FFB0B0]"; text = "text-[#F00]"; }

  const createdAt = row?.created_at || "";
  const scheduledTime = row?.scheduled_time;

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-[#06030C]">{value}</span>

      {/* Arrow button → opens detail dialog */}
      <button
        className="ml-2 p-1 rounded hover:bg-gray-200 cursor-pointer"
        type="button"
        onClick={() => setOpenView(true)}
      >
        <TopRightArrow />
      </button>

      {/* Full Lead Detail Dialog */}
      <Dialog open={openView} onOpenChange={setOpenView}>
        <DialogContent className="sm:max-w-[980px] p-6">
          <h3 className="text-[32px] text-[#070707] font-medium text-center">
            View The Lead
          </h3>

          <div className="mt-8 space-y-8">
            <div className="space-y-5">

              <div className="border-b border-[#e9e9ea] pb-2.5">
                <div className="flex items-center gap-2">
                  <LocationIcon />
                  <h3 className="text-base font-medium">Homeowner Address</h3>
                </div>
                <p className="text-sm mt-2.5">{row?.address || "-"}</p>
              </div>

              <div className="border-b border-[#e9e9ea] pb-2.5">
                <div className="flex items-center gap-2">
                  <UserIcon />
                  <h3 className="text-base font-medium">Homeowner Name</h3>
                </div>
                <p className="text-sm mt-2.5">{row?.name || "-"}</p>
              </div>

              <div className="border-b border-[#e9e9ea] pb-2.5">
                <div className="flex items-center gap-2">
                  <PhoneIcon />
                  <h3 className="text-base font-medium">Homeowner Phone</h3>
                </div>
                <p className="text-sm mt-2.5">{row?.phone || "-"}</p>
              </div>

              <div className="border-b border-[#e9e9ea] pb-2.5">
                <h3 className="text-base font-medium">Trade</h3>
                <p className="text-sm mt-2.5 capitalize">
                  {row?.trade?.name
                    ? row.trade.name
                    : typeof row?.trade === "string"
                    ? row.trade
                    : "N/A"}
                </p>
              </div>

              <div className="border-b border-[#e9e9ea] pb-2.5">
                <h3 className="text-base font-medium">Notes</h3>
                <p className="text-sm mt-2.5">{row?.notes || "-"}</p>
              </div>

              <div className="border-b border-[#e9e9ea] pb-2.5">
                <h3 className="text-base font-medium">Attached Images</h3>
                {row?.files && row.files.length > 0 ? (
                  <div className="flex flex-wrap gap-3 mt-3">
                    {row.files.map((file: any, index: number) => (
                      <div
                        key={file?.id || index}
                        className="w-20 h-20 relative rounded-md overflow-hidden border border-[#e9e9ea]"
                      >
                        <img
                          src={file?.url || file?.file_url || file?.path}
                          alt={`Attached file ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm mt-2.5 text-gray-400">No images attached</p>
                )}
              </div>

            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Status Cell: 4-item dropdown (View Data, Schedule, Active, Close) ────────
function StatusCell({
  value,
  row,
  onStatusChange,
}: {
  value: string;
  row: LeadHistory;
  onStatusChange?: (id: string, newStatus: string) => void;
}) {
  const [openViewData, setOpenViewData] = React.useState(false);

  let bg = "bg-gray-200";
  let text = "text-gray-800";
  const val = (value || "").toLowerCase();

  if (val === "scheduled") {
    bg = "bg-[#F8E997]";
    text = "text-[#AC8815]";
  } else if (val === "active" || val === "active work") {
    bg = "bg-[#A7EADE]";
    text = "text-[#116557]";
  } else if (val === "closed") {
    bg = "bg-[#FFB0B0]";
    text = "text-[#F00]";
  } else if (val === "invalid") {
    bg = "bg-[#FFB0B0]";
    text = "text-[#F00]";
  }

  // The lead_sent date for "View Data"
  const leadSentValue = (row as any)?.created_at || (row as any)?.lead_sent || "";

  return (
    <>
      <CustomDropdown
        trigger={
          <span
            className={`px-2 flex justify-between gap-2 items-center py-1 rounded-[4px] text-xs cursor-pointer ${bg} ${text}`}
          >

            {value || "-"}
            {val !== "active" && val !== "active work" && <TopRightArrow />}
          </span>
        }
        items={[
          {
            label: "View Data",
            onClick: () => setOpenViewData(true),
          },
          {
            label: "Schedule",
            onClick: () => onStatusChange?.(row.id, "SCHEDULED"),
          },
          {
            label: "Active",
            onClick: () => onStatusChange?.(row.id, "ACTIVE"),
          },
          {
            label: "Close",
            onClick: () => onStatusChange?.(row.id, "CLOSED"),
          },
        ]}
      />

      {/* View Data Dialog — shows the lead sent date/time */}
      <Dialog open={openViewData} onOpenChange={setOpenViewData}>
        <DialogContent>
          <h2 className="text-2xl text-[#111827] font-medium">Lead Details</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg text-[#1D1F2C] font-semibold">Status</h3>
              <p className={`text-sm mt-1.5 inline-block px-2 py-1 rounded-[4px] ${bg} ${text}`}>
                {value || "-"}
              </p>
            </div>
            <div>
              <h3 className="text-lg text-[#1D1F2C] font-semibold">Lead Sent Date</h3>
              <p className="text-base text-[#777980] mt-1.5">
                {leadSentValue
                  ? new Date(leadSentValue).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                  : "-"}
              </p>
            </div>
            <div>
              <h3 className="text-lg text-[#1D1F2C] font-semibold">Lead Sent Time</h3>
              <p className="text-base text-[#777980] mt-1.5">
                {leadSentValue
                  ? new Date(leadSentValue).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  : "-"}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── Main Column Builder ───────────────────────────────────────────────────────
export function ProcessLeadsColumn({
  startIndex,
  selectedRows,
  currentData,
  onSelectAll,
  onSelectRow,
  onView,
  onDelete,
  onEdit,
  onStatusChange,
}: ProcessLeadsColumnProps): ColumnConfig<LeadHistory>[] {
  const isAllSelected =
    currentData.length > 0 &&
    currentData.every((_, idx) => selectedRows.has(startIndex + idx));
  const isSomeSelected = currentData.some((_, idx) =>
    selectedRows.has(startIndex + idx)
  );

  const DateFormatter = (value: string) =>
    new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  return [
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
    {
      label: "Lead ID",
      accessor: "lead_no",
      width: "100px",
      formatter: (value: string) => (
        <span className="text-sm text-[#06030C]">{value}</span>
      ),
    },
    {
      label: "City",
      accessor: "address",
      width: "170px",
      formatter: (value: string) => (
        <span className="text-sm text-[#06030C]">{value}</span>
      ),
    },
    {
      label: "Homeowner Name",
      accessor: "name",
      width: "140px",
      formatter: (value: string) => (
        <span className="text-sm text-[#06030C]">{value}</span>
      ),
    },
    {
      label: "Trade",
      accessor: "trade",
      width: "120px",
      formatter: (_: any, row: any) => (
        <span className="text-sm text-[#06030C]">
          {row?.trade?.name || (typeof row?.trade === "string" ? row.trade : "-")}
        </span>
      ),
    },
    {
      label: "Lead Sent",
      accessor: "created_at",
      width: "150px",
      // Use a proper React component so hooks work correctly
      formatter: (value: string, row: any) => <LeadSentCell value={DateFormatter(value)} row={row} />,
    },
    {
      label: "Status",
      accessor: "status",
      width: "140px",
      formatter: (value: string, row: LeadHistory) => (
        <StatusCell value={value} row={row} onStatusChange={onStatusChange} />
      ),
    },
  ];
}
