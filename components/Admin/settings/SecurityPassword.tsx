"use client"
import { useGetAuthmeQuery, useUpdatePasswordMutation } from '@/redux/features/auth/authApi';
import { Eye, EyeOff } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function SecurityPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { data: authData, isLoading: isAuthLoading, error: authError } = useGetAuthmeQuery({})

  // Extract user data safely
  const user = authData?.data

  console.log(authData, "authdat")

  // Handle loading and error states
  useEffect(() => {
    if (authError) {
      console.error("Failed to fetch auth data:", authError)
    }
  }, [authError])

  const [passwordUpdate, { isLoading }] = useUpdatePasswordMutation();
  const [payload, setPayload] = useState({
    email: "",
    old_password: "",
    new_password: "",
  });

  useEffect(() => {
    if (user?.email) {
      setPayload((prev) => ({
        ...prev,
        email: user.email,
      }));
    }
  }, [user]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await passwordUpdate({ body: payload }).unwrap();

      if (res?.success === false) {
        toast.error(res?.message || "Invalid password");
        return;
      }

      toast.success("Password updated successfully");

      setPayload((prev) => ({
        ...prev,
        old_password: "",
        new_password: "",
      }));

    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update password");
    }
  };
  return (
    <div className=' mt-[70px]'>

      <h2 className='text-[26px] text-[#161721] font-medium'>Notification Preferences</h2>
      <form action="" className=' mt-6' onSubmit={handelSubmit}>

        {/* <div>
          <label htmlFor="email" className='text-lg text-[#1D1F2C] font-medium'>Email</label>
          <input type="email" id="email" onChange={handleChange} value={payload.email} name='email' className='border border-[#777980] py-2 px-2.5 rounded-[8px] w-full' />
        </div> */}
        <div className=' space-y-6'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="password" className='text-lg text-[#1D1F2C] font-medium'>
              Change Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={handleChange}
                value={payload.old_password}
                name='old_password'
                className='border border-[#777980] py-2 px-2.5 rounded-[8px] w-full'
                placeholder='•••••••••••'
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="confirm-password" className='text-lg text-[#1D1F2C] font-medium'>
              Confirm New Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                onChange={handleChange}
                value={payload.new_password}
                name='new_password'
                className='border border-[#777980] py-2 px-2.5 rounded-[8px] w-full'
                placeholder='••••••••••••'
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

        </div>
        <ul className=' list-disc pl-5 mt-1'>
          <li className=' text-sm text-[#777980] '>special character</li>
          <li className=' text-sm text-[#777980] '>numeric</li>
          <li className=' text-sm text-[#777980] '>uppercase, and lowercase</li>

        </ul>
        <button type='submit' disabled={isLoading} className=' py-4 w-[230px] bg-[#0b7680] rounded-[8px] text-white text-base mt-12 cursor-pointer'>{isLoading ? 'Updating...' : 'Update'}</button>
      </form>
    </div>
  )
}
