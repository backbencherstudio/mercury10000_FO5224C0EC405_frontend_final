'use client'
import React, { useEffect, useMemo, useState } from 'react'
import DynamicTable from '@/components/reusable/DynamicTable'
import FilterIcon from '@/components/icons/admin/FilterIcon'
import SearchIcon from '@/components/icons/admin/SearchIcon'
import SuccessTik from '@/components/icons/admin/SuccessTik'
import CrossIcon from '@/components/icons/admin/CrossIcon'
import { TradeColumn } from '@/components/columns/TradeColumn'
import { UserService } from '@/service/user/user.service'
import { Skeleton } from "@/components/ui/skeleton"
import { useGetTradesQuery, useCreateTradeMutation, useDeleteTradeMutation, useUpdateTradeMutation } from '@/redux/features/user/user'

type Trade = {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED';
  created_at: string;
  updated_at: string;
  userId: string | null;
};

type TradeRow = {
  serial_no: string;
  trade_name: string;
  date: string;
  status: 'active' | 'pause';
  id: string;
};

type AlertState = {
  type: 'success' | 'error';
  title: string;
  message: string;
} | null;

export default function CreateTrade() {
  const [tradeName, setTradeName] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<AlertState>(null);
  const [createTradeMutation] = useCreateTradeMutation();
  const [deleteTradeMutation] = useDeleteTradeMutation();
  const [updateTradeMutation] = useUpdateTradeMutation();
  const { data: trades = [], isLoading: isLoadingTrades, error } = useGetTradesQuery(undefined);
  console.log("trades: ",trades)
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (error) {
      setAlert({
        type: 'error',
        title: 'Error',
        message: 'Failed to fetch trades',
      });
    }
    if (!isLoadingTrades) {
      setHasLoadedOnce(true);
    }
  }, [error, isLoadingTrades]);

 const formatTradeDate = (value?: string) => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';

  const parts = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).split(' ');

  return parts.length === 3 
    ? `${parts[0]} ${parts[1]}, ${parts[2]}`
    : date.toLocaleDateString('en-GB');
};

const tradeRows = useMemo(() => {
  if (!Array.isArray(trades)) return [];

  return trades.map((trade, index) => ({
    serial_no: String(index + 1).padStart(2, '0'),
    trade_name: trade.name,
    date: formatTradeDate(trade.created_at), 
    status: trade.status === 'ACTIVE' ? 'active' : 'pause',
    id: trade.id,
  }));
}, [trades]);

  const toAlertMessage = (value: unknown) => {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object') {
      const messageValue = value as { message?: unknown; error?: unknown; statusCode?: unknown };
      if (typeof messageValue.message === 'string') return messageValue.message;
      if (messageValue.message && typeof messageValue.message === 'object') {
        const nested = messageValue.message as { message?: unknown; error?: unknown };
        if (typeof nested.message === 'string') return nested.message;
        if (typeof nested.error === 'string') return nested.error;
      }
      if (typeof messageValue.error === 'string') return messageValue.error;
      if (typeof messageValue.statusCode === 'number') return 'Request failed';
    }
    return 'Failed to create trade';
  };

  const handleCreateTrade = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = tradeName.trim();

    if (!name) {
      setAlert({
        type: 'error',
        title: 'Trade Not Created',
        message: 'Trade name is required',
      });
      return;
    }

    setIsSubmitting(true);
    setAlert(null);

    try {
      const response = await createTradeMutation({ name }).unwrap();
      const data = response?.data ?? response;

      if (data?.success === false) {
        const message = toAlertMessage(data?.message);
        setAlert({
          type: 'error',
          title: 'Trade Not Created',
          message,
        });
        return;
      }
      
      setTradeName('');
      setAlert({
        type: 'success',
        title: 'Trade Created',
        message: data?.message || `A trade named ${name} has been created successfully!`,
      });
    } catch (error: any) {
      const source = error?.response?.data?.message || error?.response?.data || error?.message;
      setAlert({
        type: 'error',
        title: 'Trade Not Created',
        message: toAlertMessage(source),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleView = (row: TradeRow) => {
    console.log('View trade:', row);
  };

  const handleEdit = (row: TradeRow) => {
    console.log('Edit trade:', row);
  };

  const handleDelete = async (row: TradeRow) => {
    try {
      await deleteTradeMutation({ id: row.id }).unwrap();
      setAlert({
        type: 'success',
        title: 'Trade Deleted',
        message: 'The trade has been successfully deleted.',
      });
    } catch (error: any) {
      const source = error?.data?.message || error?.message || 'Failed to delete trade';
      setAlert({
        type: 'error',
        title: 'Delete Failed',
        message: toAlertMessage(source),
      });
    }
  };

  const handleStatusChange = async (row: TradeRow) => {
    const newStatus = row.status === 'active' ? 'PAUSED' : 'ACTIVE';
    try {
      await updateTradeMutation({ id: row.id, body: { status: newStatus } }).unwrap();
      setAlert({
        type: 'success',
        title: 'Status Updated',
        message: `Trade status has been successfully updated to ${newStatus}.`,
      });
    } catch (error: any) {
      const source = error?.data?.message || error?.message || 'Failed to update trade status';
      setAlert({
        type: 'error',
        title: 'Update Failed',
        message: toAlertMessage(source),
      });
    }
  };

  // Filter trades based on search term
  const filteredTrades = tradeRows.filter(trade => 
    trade.trade_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update serial numbers after filtering
  const displayTrades = filteredTrades.map((trade, index) => ({
    ...trade,
    serial_no: String(index + 1).padStart(2, '0'),
  }));

  // Table skeleton component
  const TableSkeleton = () => (
    <div className="space-y-4">
      {/* Table Header Skeleton */}
      <div className="flex gap-4 pb-4 border-b border-[#E9E9EA]">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
      </div>
      
      {/* Table Rows Skeleton */}
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex gap-4 py-4 border-b border-[#E9E9EA] last:border-0">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      ))}
    </div>
  );

  // Determine what to show in the table section
  const renderTableContent = () => {
    // Show skeleton only during initial load or refresh
    if (isLoadingTrades && !hasLoadedOnce) {
      return <TableSkeleton />;
    }

    // Show empty state when no trades exist
    if (!isLoadingTrades && hasLoadedOnce && tradeRows.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-2">No trades found</p>
          <p className="text-gray-400 text-sm">Create your first trade above</p>
        </div>
      );
    }

    // Show no search results message
    if (!isLoadingTrades && hasLoadedOnce && tradeRows.length > 0 && displayTrades.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-2">No results found</p>
          <p className="text-gray-400 text-sm">Try adjusting your search terms</p>
        </div>
      );
    }

    // Show the table with data
    return (
      <DynamicTable 
        data={displayTrades} 
        columns={TradeColumn({ 
          onView: handleView, 
          onEdit: handleEdit, 
          onDelete: handleDelete,
          onStatusChange: handleStatusChange 
        })} 
        showPagination={false} 
      />
    );
  };

  return (
    <div className='mt-8'>
      {alert && (
        <div className={`p-4 sm:p-6 border rounded-[12px] ${alert.type === 'success' ? 'border-[#11B0C1] bg-[#E6F6F4]' : 'border-[#F5B9B9] bg-[#FDECEC]'}`}>
          <div className='flex items-center gap-1.5'>
            {alert.type === 'success' ? <SuccessTik /> : <CrossIcon />}
            <h3 className='text-lg text-[#1D1F2C] font-semibold'>{alert.title}</h3>
          </div>
          <p className='text-sm text-[#06030C] mt-4'>{alert.message}</p>
        </div>
      )}
      
      <div className='p-4 sm:p-6 border border-[#D2D2D5] rounded-[8px] mt-8'>
        <h3 className='text-xl sm:text-2xl text-[#111827] font-medium'>Create a Trade</h3>
        <form onSubmit={handleCreateTrade}>
          <div className='flex flex-col gap-1.5 py-6'>
            <label htmlFor="trade">Trade</label>
            <input
              type="text"
              id="trade"
              value={tradeName}
              onChange={(e) => setTradeName(e.target.value)}
              className='px-2.5 py-2 border border-[#D2D2D5] rounded-[8px]'
              placeholder='Enter trade name'
              disabled={isSubmitting}
            />
          </div>
          <button
            type='submit'
            disabled={isSubmitting}
            className='bg-[#0b7680] text-white py-4 w-full rounded-[8px] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </>
            ) : (
              'Create Trade'
            )}
          </button>
        </form>
      </div>

      <div className='p-4 sm:p-6 border border-[#D2D2D5] rounded-[8px] mt-14'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
          <h3 className='text-xl sm:text-2xl text-[#111827] font-medium'>See All Created Trades</h3>
          <div className='w-full sm:w-auto'>
            <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2'>
              <div className='relative w-full sm:w-auto'>
                <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />
                <input 
                  type="text" 
                  className='bg-[#e9e9ea] py-2 pl-12 pr-4 rounded-[10px] w-full sm:w-[315px] outline-none focus:ring-1 focus:ring-blue-500' 
                  placeholder='Search trades here' 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={isLoadingTrades}
                />
              </div>
              <button 
                className='flex items-center gap-2 p-2.5 cursor-pointer hover:bg-gray-100 rounded-lg w-full sm:w-auto justify-center'
                disabled={isLoadingTrades}
              >
                <FilterIcon />
                <span className='hidden sm:inline'>Filter</span>
              </button>
            </div>
          </div>
        </div>
        <div className='mt-4 overflow-x-auto'>
          {renderTableContent()}
        </div>
      </div>
    </div>
  )
}