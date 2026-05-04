"use client";

import { useState } from "react";
import FilterIcon from '@/components/icons/admin/FilterIcon';
import SearchIcon from '@/components/icons/admin/SearchIcon';
import SuccessTik from '@/components/icons/admin/SuccessTik';
import DynamicTable from '@/components/reusable/DynamicTable';
import { AllAdminColumn } from '@/components/columns/AllAdminColumn';
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import { toast } from 'react-hot-toast';
import { useGetAllscrateryQuery } from "@/redux/features/user/user";
import { CloudCog } from "lucide-react";

export default function CreateAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    email: ''
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  // 1. Hooks MUST be called at the top level
  const [registerAdmin, { isLoading }] = useRegisterMutation();
  const { data: allSecretary, refetch, isLoading: allScrateryLoading } = useGetAllscrateryQuery(undefined);

  // 2. Derive data from the query results
  const allSecretaryData = allSecretary?.data || [];
  console.log(allSecretaryData,'ddddddddd')

  // 3. Setup pagination variables based on the fetched data
  const totalItems = allSecretaryData?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // ensure currentPage valid থাকে
  const safeCurrentPage = Math.min(currentPage, totalPages || 1);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;

  const currentData = allSecretaryData?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // 4. Input Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (fieldErrors[id as keyof typeof formData]) {
      setFieldErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextFieldErrors: Partial<Record<keyof typeof formData, string>> = {};

    if (!formData.name) nextFieldErrors.name = "Name is required";
    if (!formData.phone) nextFieldErrors.phone = "Phone number is required";
    if (!formData.password) nextFieldErrors.password = "Password is required";
    if (!formData.email) nextFieldErrors.email = "Email is required";
    
    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      return;
    }

    setFieldErrors({});

    const payload = {
      username: formData.name.trim(),
      phone_number: formData.phone.trim(),
      password: formData.password,
      email: formData.email.trim(),
      type: "SECRETARY",
    };

    try {
      const res = await registerAdmin(payload).unwrap();
      toast.success(res?.message || "Secretary/Admin created successfully");
      setShowSuccess(true);
      setFormData({ name: '', phone: '', password: '', email: '' });
      refetch(); // Automatically refetch table data so the new admin appears!
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error: any) {
      const message = error?.data?.message || error?.message || "Failed to create admin";
      toast.error(message);
    }
  };

  return (
    <div>
      {showSuccess && (
        <div className='p-4 sm:p-6 border border-[#11B0C1] bg-[#E6F6F4] rounded-[12px]'>
          <div className=' flex items-center gap-1.5'>
            <SuccessTik />
            <h3 className=' text-2xl text-[#111827] font-medium'>Secretary/Admin Created</h3>
          </div>
          <p className=' text-sm text-[#06030C] mt-4'>Secretary/Admin has been created successfully!  </p>
        </div>
      )}

      <div className='p-4 sm:p-6 border border-[#D2D2D5] rounded-[8px] mt-8 w-full'>
        <h3 className='text-xl font-semibold mb-6'>Create a Secretary/Admin</h3>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor='name' className='text-base text-[#1D1F2C]'>Secretary/Admin Name</label>
            <input
              id='name'
              type='text'
              className='py-2 px-2.5 rounded-[8px] border border-[#D2D2D5] w-full text-base text-[#161721]'
              placeholder='Enter name'
              value={formData.name}
              onChange={handleInputChange}
            />
            {fieldErrors.name && <span className='text-red-600 text-sm'>{fieldErrors.name}</span>}
          </div>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor='phone' className='text-base text-[#1D1F2C]'>Phone No.</label>
            <input
              id='phone'
              type='text'
              className='py-2 px-2.5 rounded-[8px] border border-[#D2D2D5] w-full text-base text-[#161721]'
              placeholder='Enter phone number'
              value={formData.phone}
              onChange={handleInputChange}
            />
            {fieldErrors.phone && <span className='text-red-600 text-sm'>{fieldErrors.phone}</span>}
          </div>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor='password' className='text-base text-[#1D1F2C]'>Password</label>
            <input
              id='password'
              type='password'
              className='py-2 px-2.5 rounded-[8px] border border-[#D2D2D5] w-full text-base text-[#161721]'
              placeholder='Enter password'
              value={formData.password}
              onChange={handleInputChange}
            />
            {fieldErrors.password && <span className='text-red-600 text-sm'>{fieldErrors.password}</span>}
          </div>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor='email' className='text-base text-[#1D1F2C]'>Email</label>
            <input
              id='email'
              type='email'
              className='py-2 px-2.5 rounded-[8px] border border-[#D2D2D5] w-full text-base text-[#161721]'
              placeholder='Enter email'
              value={formData.email}
              onChange={handleInputChange}
            />
            {fieldErrors.email && <span className='text-red-600 text-sm'>{fieldErrors.email}</span>}
          </div>
          <button
            type='submit'
            disabled={isLoading}
            className='bg-[#0b7680] w-full text-white py-4 rounded-[8px] cursor-pointer text-base font-medium mt-4 disabled:opacity-70 disabled:cursor-not-allowed'
          >
            {isLoading ? 'Creating...' : 'Create Secretary/Admin'}
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
            loading={allScrateryLoading}
          />
        </div>
      </div>
    </div>
  );
}
