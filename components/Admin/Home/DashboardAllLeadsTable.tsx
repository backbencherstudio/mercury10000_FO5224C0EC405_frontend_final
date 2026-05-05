"use client";

import DynamicTable from "@/components/reusable/DynamicTable";
import { useState, useMemo, useEffect } from "react";
import { DashboardUserColumn } from "@/components/columns/DashboardUserColumn";
import { LeadProcessCalendarDialog } from "@/components/Admin/Home/LeadProcessCalendarDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LocationIcon from "@/components/icons/admin/LocationIcon";
import UserIcon from "@/components/icons/admin/UserIcon";
import PhoneIcon from "@/components/icons/admin/PhoneIcon";
import SearchIcon from "@/components/icons/admin/SearchIcon";
import FilterIcon from "@/components/icons/admin/FilterIcon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useGetDashboardOverviewQuery } from "@/redux/features/dashboardOverview/dashboardOverView";

function DashboardAllLeadsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const [arrowDialogOpen, setArrowDialogOpen] = useState(false);
  const [arrowDialogData, setArrowDialogData] = useState<any>(null);

  const [leadProcessDialogOpen, setLeadProcessDialogOpen] = useState(false);
  const [notLeadDialogOpen, setNotLeadDialogOpen] = useState(false);
  const [dialogRowData, setDialogRowData] = useState<any>(null);

  const [tradeFilter, setTradeFilter] = useState<string>("all");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchInput.trim()), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const startIndex = (currentPage - 1) * itemsPerPage;


  const params = useMemo(() => {
    const p: Record<string, string | number> = {
      page: currentPage,
      limit: itemsPerPage,
    };

    if (tradeFilter !== "all") {
      p.trade_id = tradeFilter;
    }

    if (debouncedSearch) {
      p.search = debouncedSearch;
    }

    return p;
  }, [currentPage, itemsPerPage, tradeFilter, debouncedSearch]);

  const { data, isLoading, error } = useGetDashboardOverviewQuery(params);

  const apiData = data?.data || [];
const meta = (data as any)?.meta;

const totalItems = Number(meta?.total_items ?? 0);
const totalPages = Number(meta?.total_pages ?? 1);

  // trade options from API
  const tradeOptions = useMemo(() => {
    const set = new Set<string>();
    apiData.forEach((item: any) => {
      if (item.trade) set.add(item.trade);
    });
    return Array.from(set);
  }, [apiData]);

  //  selection handlers (unchanged)
  const handleSelectAll = (checked: boolean) => {
    const newSelected = new Set(selectedRows);
    apiData.forEach((_: any, index: number) => {
      const global = startIndex + index;
      checked ? newSelected.add(global) : newSelected.delete(global);
    });
    setSelectedRows(newSelected);
  };

  const handleSelectRow = (index: number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    checked ? newSelected.add(index) : newSelected.delete(index);
    setSelectedRows(newSelected);
  };

  const handleArrowClick = (row: any) => {
    setArrowDialogData(row);
    setArrowDialogOpen(true);
  };

  const handleLeadProcess = (row: any) => {
    setDialogRowData(row);
    setLeadProcessDialogOpen(true);
  };

  const handleNotLead = (row: any) => {
    setDialogRowData(row);
    setNotLeadDialogOpen(true);
  };

  const columns = DashboardUserColumn({
    startIndex,
    selectedRows,
    currentData: apiData,
    onSelectAll: handleSelectAll,
    onSelectRow: handleSelectRow,
    onLeadProcess: handleLeadProcess,
    onNotLead: handleNotLead,
    onArrowClick: handleArrowClick,
  });

  return (
    <div>
     
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 mb-4">
        <div className="relative w-full sm:w-auto">
          <SearchIcon className="absolute top-1/2 -translate-y-1/2 left-4" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="bg-[#e9e9ea] py-2 pl-12 pr-4 rounded-[10px] w-full sm:w-[315px] outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search by name, phone, address..."
            aria-label="Search leads"
          />
        </div>

        <button className="flex items-center gap-2 p-2.5 cursor-pointer hover:bg-gray-100 rounded-lg w-full sm:w-auto justify-center">
          <FilterIcon />
          <span className="hidden sm:inline">Filter</span>
        </button>

        <div className="w-full sm:w-auto">
          <Select
            value={tradeFilter}
            onValueChange={(v) => {
              setTradeFilter(v);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-[150px] bg-[#e9e9ea] rounded-[10px] ml-0 sm:ml-2">
              <SelectValue placeholder="Trade Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Trades</SelectItem>
              {tradeOptions.map((trade: any, index) => (
  <SelectItem
    key={trade?.id || trade?.value || index}
    value={trade?.id || trade}
  >
    {trade?.name || trade}
  </SelectItem>
))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/*  Table */}
      <div className="overflow-x-auto">
        <DynamicTable
          columns={columns}
          data={apiData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalpage={totalPages}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
          setItemsPerPage={(n) => {
            setItemsPerPage(n);
            setCurrentPage(1);
          }}
          noDataMessage="No users found"
          loading={isLoading}
          error={
            error
              ? String((error as any)?.data?.message ?? (error as any)?.error ?? "Request failed")
              : undefined
          }
        />
      </div>

      {/* dialogs (unchanged) */}
      <LeadProcessCalendarDialog
        isOpen={leadProcessDialogOpen}
        onClose={() => setLeadProcessDialogOpen(false)}
        onSave={(dateTime) => {
          console.log("Saved datetime:", dateTime);
          setLeadProcessDialogOpen(false);
        }}
          ID={dialogRowData?.id}
      />

      <Dialog open={notLeadDialogOpen} onOpenChange={setNotLeadDialogOpen}>
        <DialogContent className="max-w-md p-8 rounded-xl shadow-lg text-white">
          <DialogHeader>
            <DialogTitle className="text-black text-2xl font-bold">
              Not a Lead 
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={arrowDialogOpen} onOpenChange={setArrowDialogOpen}>
        <DialogContent className="sm:max-w-[980px] p-6">
          <h3 className="text-[32px] text-[#070707] font-medium text-center">
            View The Lead
          </h3>

          {arrowDialogData && (
            <div className="mt-8 space-y-8">
              <div className="space-y-5">
                <div className="border-b border-[#e9e9ea] pb-2.5">
                  <div className="flex items-center gap-2">
                    <LocationIcon />
                    <h3 className="text-base font-medium">Homeowner Address</h3>
                  </div>
                  <p className="text-sm mt-2.5">
                    {arrowDialogData.address}
                  </p>
                </div>

                <div className="border-b border-[#e9e9ea] pb-2.5">
                  <div className="flex items-center gap-2">
                    <UserIcon />
                    <h3 className="text-base font-medium">Homeowner Name</h3>
                  </div>
                  <p className="text-sm mt-2.5">
                    {arrowDialogData.name}
                  </p>
                </div>

                <div className="border-b border-[#e9e9ea] pb-2.5">
                  <div className="flex items-center gap-2">
                    <PhoneIcon />
                    <h3 className="text-base font-medium">
                      Homeowner Phone
                    </h3>
                  </div>
                  <p className="text-sm mt-2.5">
                    {arrowDialogData.phone}
                  </p>
                </div>

             <div className="border-b border-[#e9e9ea] pb-2.5">
  <h3 className="text-base font-medium">Trade</h3>
  <p className="text-sm mt-2.5 capitalize">
    {arrowDialogData?.trade?.name 
      ? arrowDialogData.trade.name 
      : (typeof arrowDialogData?.trade === 'string' 
          ? arrowDialogData.trade 
          : "N/A")}
  </p>
</div>
    <div className="border-b border-[#e9e9ea] pb-2.5">
                  <div className="flex items-center gap-2">
                    {/* <PhoneIcon /> */}
                    <h3 className="text-base font-medium">
                      Notes
                    </h3>
                  </div>
                  <p className="text-sm mt-2.5">
                    {arrowDialogData.notes}
                  </p>
                </div>

                <div className="border-b border-[#e9e9ea] pb-2.5">
  <div className="flex items-center gap-2">
    <h3 className="text-base font-medium">Attached Images</h3>
  </div>
  
  {arrowDialogData?.files && arrowDialogData.files.length > 0 ? (
    <div className="flex flex-wrap gap-3 mt-3">
      {arrowDialogData.files.map((file: any, index: number) => (
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
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DashboardAllLeadsTable;