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
import { CloudCog, Eye, EyeOff, User, Mail, Phone, MapPin, Briefcase, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CreateAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    email: ''
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // 1. Hooks MUST be called at the top level
  const [registerAdmin, { isLoading }] = useRegisterMutation();
  const { data: allSecretary, refetch, isLoading: allScrateryLoading } = useGetAllscrateryQuery(undefined);

  const handleView = (admin: any) => {
    setSelectedAdmin(admin);
    setIsViewModalOpen(true);
  };

  // 2. Derive data from the query results
  const allSecretaryData = allSecretary?.data || [];
  console.log(allSecretaryData, 'ddddddddd')

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
            <label htmlFor='password' className='text-base text-[#1D1F2C]'>
              Password
            </label>

            <div className="relative">
              <input
                id='password'
                type={showPassword ? "text" : "password"}
                className='py-2 px-2.5 pr-10 rounded-[8px] border border-[#D2D2D5] w-full text-base text-[#161721]'
                placeholder='Enter password'
                value={formData.password}
                onChange={handleInputChange}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {fieldErrors.password && (
              <span className='text-red-600 text-sm'>
                {fieldErrors.password}
              </span>
            )}
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
            columns={AllAdminColumn({ onView: handleView })}
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

      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl border-none shadow-2xl p-0 overflow-hidden bg-white rounded-2xl">
          <DialogHeader className="bg-[#0b7680] p-6 text-white">
            <div className="flex items-center gap-4">

              <div>
                <DialogTitle className="text-2xl font-bold text-white">Secretary/Admin Details</DialogTitle>
                {/* <p className="text-white/80 text-sm mt-1">Full profile information and settings</p> */}
              </div>
            </div>
          </DialogHeader>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Basic Info */}
              <div className="space-y-6">
                <div>

                  <div className="space-y-4">
                    <div className="group transition-all">
                      <p className="text-sm text-gray-500 mb-1">Full Name</p>
                      <p className="text-lg font- text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100 group-hover:border-[#0b7680]/30 group-hover:bg-white transition-all">
                        {selectedAdmin?.name || "N/A"}
                      </p>
                    </div>
                    <div className="group transition-all">
                      <p className="text-sm text-gray-500 mb-1">Email Address</p>
                      <div className="flex items-center gap-2 text-lg font- text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100 group-hover:border-[#0b7680]/30 group-hover:bg-white transition-all">

                        {selectedAdmin?.email || "N/A"}
                      </div>
                    </div>
                    <div className="group transition-all">
                      <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                      <div className="flex items-center gap-2 text-lg font- text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100 group-hover:border-[#0b7680]/30 group-hover:bg-white transition-all">

                        {selectedAdmin?.phone_number || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Role & Location */}
              <div className="space-y-6">
                <div>

                  <div className="space-y-4">
                    <div className="group transition-all">
                      <p className="text-sm text-gray-500 mb-1">Role Type</p>
                      <p className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#0b7680]/10 text-[#0b7680] uppercase tracking-wide">
                        {selectedAdmin?.type || "SECRETARY"}
                      </p>
                    </div>
                    <div className="group transition-all">
                      <p className="text-sm text-gray-500 mb-1">Location</p>
                      <div className="flex items-center gap-2 text-lg  text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100 group-hover:border-[#0b7680]/30 group-hover:bg-white transition-all">

                        {selectedAdmin?.city || "N/A"}, {selectedAdmin?.country || "N/A"}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Trades Section if applicable */}
            {selectedAdmin?.trades && selectedAdmin.trades.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                  <Briefcase className="w-3 h-3" /> Assigned Trades
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAdmin.trades.map((trade: any, index: number) => (
                    <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200">
                      {trade?.name || trade}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 flex justify-end">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-8 py-3 bg-[#0b7680] text-white rounded-xl font-bold hover:bg-[#095f67] transition-all shadow-lg shadow-[#0b7680]/20"
              >
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
