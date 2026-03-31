import React from 'react'

export default function SecretaryDetails({ user }) {
  const { user_name, id, phone_no, city, role } = user;
  return (
    <div className='border border-[#E9E9EA] p-4 sm:p-6 rounded-[12px] mt-8'>
      <div className='p-4 sm:p-6 border border-[#E9E9EA] rounded-[8px]'>
        <h2 className='text-xl sm:text-2xl text-[#111827] font-medium'>Basic Details</h2>
        <div className='mt-6 space-y-6'>
          <div className='p-4 border border-[#11B0C1] bg-[#E6F6F4] rounded-[12px]'>
            <h3 className='text-base sm:text-lg text-[#1D1F2C] font-semibold'>User Created</h3>
            <p className='text-sm sm:text-base text-[#777980] mt-1.5'>26 Feb, 2026</p>
          </div>
          {/* Responsive detail rows */}
          {[
            { label: 'User Name', value: user_name },
            { label: 'User ID', value: id },
            { label: 'Phone No.', value: phone_no },
            { label: 'City', value: city },
            { label: 'Trade', value: 'Plumbing' },
            { label: 'Role', value: role },
            { label: 'Work at Company', value: 'LMS' }
          ].map((item, idx) => (
            <div key={item.label} className={`border-b pb-2 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 ${idx === 6 ? 'border-b-0' : ''}`}>
              <div>
                <h3 className='text-base sm:text-lg text-[#1D1F2C] font-semibold'>{item.label}</h3>
                <p className='text-sm sm:text-base text-[#777980] mt-1.5'>{item.value}</p>
              </div>
              <button className='text-sm sm:text-base text-[#777980] cursor-pointer mt-2 sm:mt-0'>Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

