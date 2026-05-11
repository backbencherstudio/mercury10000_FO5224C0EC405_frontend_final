"use client";

import { useGetAuthmeQuery, useUpdateUserProfileMutation } from '@/redux/features/auth/authApi';
import React, { useState, useEffect } from 'react'

interface EditableField {
  name: string;

  email: string;
}

export default function SettingsHome() {
  const [isEditing, setIsEditing] = useState<{
    name: boolean;

    email: boolean;
  }>({
    name: false,

    email: false
  });

  const { data: authData, isLoading: isAuthLoading, error: authError } = useGetAuthmeQuery({})

  // Extract user data safely
  const user = authData?.data

  console.log(authData, "authdataauthdatadatadatadatadatadatadatadata")

  // Handle loading and error states
  useEffect(() => {
    if (authError) {
      console.error("Failed to fetch auth data:", authError)
    }
  }, [authError])

  const [formData, setFormData] = useState<EditableField>({
    name: "",

    email: ""
  });

  const [tempData, setTempData] = useState<EditableField>({
    name: "",

    email: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || ""
      });
      setTempData({
        name: user.name || "",
        email: user.email || ""
      });
    }
  }, [user]);

  const [updateUserProfile, { isError }] = useUpdateUserProfileMutation()

  const handleEdit = (field: keyof EditableField) => {
    setTempData(prev => ({ ...prev, [field]: formData[field] }));
    setIsEditing(prev => ({ ...prev, [field]: true }));
  };

  const handleSave = async (field: keyof EditableField) => {
    const updated = { ...formData, [field]: tempData[field] };
    setFormData(updated);
    setIsEditing(prev => ({ ...prev, [field]: false }));

    const bodyMap: Record<keyof EditableField, string> = {
      name: 'name',
      email: 'email',
    };

    await updateUserProfile({
      id: user?.id,
      body: { [bodyMap[field]]: tempData[field] }
    });
  };

  const handleCancel = (field: keyof EditableField) => {
    setTempData(prev => ({ ...prev, [field]: formData[field] }));
    setIsEditing(prev => ({ ...prev, [field]: false }));
  };

  const handleChange = (field: keyof EditableField, value: string) => {
    setTempData(prev => ({ ...prev, [field]: value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: keyof EditableField) => {
    if (e.key === 'Enter') {
      handleSave(field);
    } else if (e.key === 'Escape') {
      handleCancel(field);
    }
  };

  return (
    <div className='mt-12 space-y-6'>
      <h2 className='text-[26px] text-[#161721] font-medium'>Your Details</h2>

      {/* Name Field */}
      <div className='flex items-end justify-between border-b border-[#E9E9EA] pb-2'>
        <div className='flex-1'>
          <h3 className='text-lg text-[#1D1F2C] font-semibold'>Name</h3>
          {isEditing.name ? (
            <input
              type="text"
              value={tempData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'name')}
              className='mt-1.5 w-full bg-transparent text-base text-[#777980] border-0 outline-none p-0'
              autoFocus
            />
          ) : (
            <p className='mt-1.5 text-base text-[#777980]'>{formData.name}</p>
          )}
        </div>
        {isEditing.name ? (
          <div className='flex gap-2 ml-4'>
            <button
              onClick={() => handleSave('name')}
              className='text-base text-[#0E93A1] cursor-pointer hover:text-[#0C7A85]'
            >
              Save
            </button>
            <button
              onClick={() => handleCancel('name')}
              className='text-base text-[#777980] cursor-pointer hover:text-[#5A5B65]'
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleEdit('name')}
            className='text-base text-[#777980] cursor-pointer hover:text-[#0E93A1]'
          >
            Edit
          </button>
        )}
      </div>

      {/* Location Field */}
      {/* <div className='flex items-end justify-between border-b border-[#E9E9EA] pb-2'>
        <div className='flex-1'>
          <h3 className='text-lg text-[#1D1F2C] font-semibold'>Location</h3>
          {isEditing.address ? (
            <input
              type="text"
              value={tempData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'address')}
              className='mt-1.5 w-full bg-transparent text-base text-[#777980] border-0 outline-none p-0'
              autoFocus
            />
          ) : (
            <p className='mt-1.5 text-base text-[#777980]'>{formData.address}</p>
          )}
        </div>
        {isEditing.address ? (
          <div className='flex gap-2 ml-4'>
            <button
              onClick={() => handleSave('address')}
              className='text-base text-[#0E93A1] cursor-pointer hover:text-[#0C7A85]'
            >
              Save
            </button>
            <button
              onClick={() => handleCancel('address')}
              className='text-base text-[#777980] cursor-pointer hover:text-[#5A5B65]'
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleEdit('address')}
            className='text-base text-[#777980] cursor-pointer hover:text-[#0E93A1]'
          >
            Edit
          </button>
        )}
      </div> */}

      {/* Email Field */}
      <div className='flex items-end justify-between border-b border-[#E9E9EA] pb-2'>
        <div className='flex-1'>
          <h3 className='text-lg text-[#1D1F2C] font-semibold'>Email</h3>
          {isEditing.email ? (
            <input
              type="email"
              value={tempData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'email')}
              className='mt-1.5 w-full bg-transparent text-base text-[#777980] border-0 outline-none p-0'
              autoFocus
            />
          ) : (
            <p className='mt-1.5 text-base text-[#777980]'>{formData.email}</p>
          )}
        </div>
        {isEditing.email ? (
          <div className='flex gap-2 ml-4'>
            <button
              onClick={() => handleSave('email')}
              className='text-base text-[#0E93A1] cursor-pointer hover:text-[#0C7A85]'
            >
              Save
            </button>
            <button
              onClick={() => handleCancel('email')}
              className='text-base text-[#777980] cursor-pointer hover:text-[#5A5B65]'
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleEdit('email')}
            className='text-base text-[#777980] cursor-pointer hover:text-[#0E93A1]'
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}