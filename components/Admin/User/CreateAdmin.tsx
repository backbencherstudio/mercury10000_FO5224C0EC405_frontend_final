"use client";

import { useState } from "react";
import FilterIcon from '@/components/icons/admin/FilterIcon';
import SearchIcon from '@/components/icons/admin/SearchIcon';
import SuccessTik from '@/components/icons/admin/SuccessTik';
import DynamicTable from '@/components/reusable/DynamicTable';
import { AllAdminData } from '@/public/demoData/AllAdminData';
import { AllAdminColumn } from '@/components/columns/AllAdminColumn';

export default function CreateAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = AllAdminData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = AllAdminData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className='p-4 sm:p-6 border border-[#11B0C1] bg-[#E6F6F4] rounded-[12px]'>
        <div className=' flex items-center gap-1.5'>
          <SuccessTik />
          <h3 className=' text-2xl text-[#111827] font-medium'>Secretary/Admin Created</h3>
        </div>
        <p className=' text-sm text-[#06030C] mt-4'>Secretary/Admin has been created successfully!  </p>
      </div>

      <div className='p-4 sm:p-6 border border-[#D2D2D5] rounded-[8px] mt-8 w-full'>
        <h3 className='text-xl font-semibold mb-6'>Create a Secretary/Admin</h3>
        <form className='space-y-6'>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor='name' className='text-base text-[#1D1F2C]'>Secretary/Admin Name</label>
            <input
              id='name'
              type='text'
              className='py-2 px-2.5 rounded-[8px] border border-[#D2D2D5] w-full text-base text-[#161721]'
              placeholder='Enter name'
            />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor='phone' className='text-base text-[#1D1F2C]'>Phone No.</label>
            <input
              id='phone'
              type='text'
              className='py-2 px-2.5 rounded-[8px] border border-[#D2D2D5] w-full text-base text-[#161721]'
              placeholder='Enter phone number'
            />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor='password' className='text-base text-[#1D1F2C]'>Password</label>
            <input
              id='password'
              type='password'
              className='py-2 px-2.5 rounded-[8px] border border-[#D2D2D5] w-full text-base text-[#161721]'
              placeholder='Enter password'
            />
          </div>
          <button
            type='submit'
            className='bg-[#0b7680] w-full text-white py-4 rounded-[8px] cursor-pointer text-base font-medium mt-4'
          >
            Create Secretary/Admin
          </button>
        </form>
      </div>

      <div className='p-4 sm:p-6 border border-[#D2D2D5] rounded-[8px] mt-8 w-full'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
          <h3 className='text-xl sm:text-2xl text-[#111827] font-medium'>See All Secretary/Admin</h3>
          <div className='w-full sm:w-auto'>
            <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2'>
              <div className='relative w-full sm:w-auto'>
                <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4' />
                <input type="text" className='bg-[#e9e9ea] py-2 pl-12 pr-4 rounded-[10px] w-full sm:w-[315px] outline-none focus:ring-1 focus:ring-blue-500' placeholder='Search user here' />
              </div>
              <button className='flex items-center gap-2 p-2.5 cursor-pointer hover:bg-gray-100 rounded-lg w-full sm:w-auto justify-center'>
                <FilterIcon />
                <span className='hidden sm:inline'>Filter</span>
              </button>
            </div>
          </div>
        </div>
        <div className='mt-8 overflow-x-auto'>
          <DynamicTable
            columns={AllAdminColumn({})}
            data={currentData}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalpage={totalPages}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
            showPagination={true}
            noDataMessage="No admins found"
            loading={false}
          />
        </div>
      </div>
    </div>
  );
}
