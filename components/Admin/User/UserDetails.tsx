import React, { useEffect, useState } from 'react'
import { FinancialActivityColumn } from '@/components/columns/FinancialActivityColumn'
import DynamicTable from '@/components/reusable/DynamicTable'
import { FinancialActivityData } from '@/public/demoData/FinancialActivityData'
import {   useParams, useRouter } from 'next/navigation'
import { useGetSingleUserDetailsQuery, useUpdateUserMutation } from '@/redux/features/dashboardOverview/dashboardOverView'
import { CloudCog } from 'lucide-react'

interface User {
  id: string;
  username: string;
  phone_number: string;
  city: string;
  role: 'user' | 'Secretary';
}

interface UserDetailsProps {
  user: User;
}
 

export default function UserDetails({ user }: UserDetailsProps) {


 const params = useParams();
const id = params?.id as string;

const { data, isLoading } = useGetSingleUserDetailsQuery(id, {
  skip: !id,
});

console.log("datasdfsdfsdfsd: ",data);
  

  // Editable state for each field
  const [editState, setEditState] = useState({
    user_name: false,
    id: false,
    phone_no: false,
    city: false,
    trade: false,
    role: false,
    work: false,
    qualify:false,
  conversion_fee:false,
  });
  // Local state for input values
 const [inputState, setInputState] = useState({
  username: '',
  id: '',
  phone_number: '',
  city: '',
  trade: '',
  role: '',
  work: '',
  qualify: '',
  conversion_fee: '',
});

useEffect(() => {
  if (data?.data) {
    setInputState({
      username: data.data.name,
      id: data.data.id,
      phone_number: data.data.phone_number,
      city: data.data.city,
      trade: data.data.trades || '',
      role: data.data.type,
      work: data.data.work || '',
      qualify: data.data.qualified_leads_fee || '',
      conversion_fee: data.data.conversion_fee || '',
    });
  }
}, [data]);

  // Check if any field is being edited
  const isAnyEditing = Object.values(editState).some(Boolean);

  const handleEdit = (field) => {
    setEditState((prev) => ({ ...prev, [field]: true }));
  };
  const handleInputChange = (field, value) => {
    setInputState((prev) => ({ ...prev, [field]: value }));
  };
 const [updateUser] = useUpdateUserMutation();

const handleSave = async () => {
  try {
    await updateUser({
      id,
      body: inputState,
    }).unwrap();

    setEditState({
      user_name: false,
      id: false,
      phone_no: false,
      city: false,
      trade: false,
      role: false,
      work: false,
      qualify:false,
      conversion_fee:false,
    });
  } catch (err) {
    console.error(err);
  }
};
  const handleView = () => {
    router.push(`/dashboard/user/all-users/${id}/monthly-details`);
  };

  return (
    <div className="border border-[#E9E9EA] p-4 sm:p-6 rounded-[12px] mt-6">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="flex-[3_3_0%] w-full p-4 sm:p-6 border border-[#E9E9EA] rounded-[8px]">
          <div className="p-4 border border-[#11B0C1] bg-[#E6F6F4] rounded-[12px]">
            <h3 className="text-lg text-[#1D1F2C] font-semibold">User Created</h3>
            <p className="text-base text-[#777980] mt-1.5">26 Feb, 2026</p>
          </div>
          <h2 className="text-2xl text-[#111827] font-medium mt-6">Basic Details</h2>
          <div className="mt-6 space-y-6">
            {/* User Name */}
            <div className="border-b pb-2 flex justify-between items-end">
              <div>
                <h3 className="text-lg text-[#1D1F2C] font-semibold">User Name</h3>
                {editState.user_name ? (
                  <input
                    className="text-base text-[#777980] mt-1.5 py-2 px-0 w-full border-0 border-b border-[#D2D2D5] focus:outline-none focus:border-[#0b7680] transition-colors"
                    value={inputState.username}
                    onChange={e => handleInputChange('user_name', e.target.value)}
                  />
                ) : (
                  <p className="text-base text-[#777980] mt-1.5 pb-2 min-h-[40px]">{inputState.username}</p>
                )}
              </div>
              {!editState.user_name && (
                <button className="text-base text-[#777980] cursor-pointer" onClick={() => handleEdit('user_name')}>Edit</button>
              )}
            </div>
            {/* User ID */}
            <div className="border-b pb-2 flex justify-between items-end">
              <div>
                <h3 className="text-lg text-[#1D1F2C] font-semibold">User ID</h3>
                {editState.id ? (
                  <input
                    className="text-base text-[#777980] mt-1.5 py-2 px-0 w-full bg-white border-0 border-b border-[#D2D2D5] focus:outline-none focus:border-[#0b7680] transition-colors"
                    value={inputState.id}
                    onChange={e => handleInputChange('id', e.target.value)}
                  />
                ) : (
                  <p className="text-base text-[#777980] mt-1.5 pb-2 min-h-[40px]">{inputState.id}</p>
                )}
              </div>
              {!editState.id && (
                <button className="text-base text-[#777980] cursor-pointer" onClick={() => handleEdit('id')}>Edit</button>
              )}
            </div>
            {/* Phone No. */}
            <div className="border-b pb-2 flex justify-between items-end">
              <div>
                <h3 className="text-lg text-[#1D1F2C] font-semibold">Phone No.</h3>
                {editState.phone_no ? (
                  <input
                    className="text-base text-[#777980] mt-1.5 py-2 px-0 w-full bg-white border-0 border-b border-[#D2D2D5] focus:outline-none focus:border-[#0b7680] transition-colors"
                    value={inputState.phone_number}
                    onChange={e => handleInputChange('phone_no', e.target.value)}
                  />
                ) : (
                  <p className="text-base text-[#777980] mt-1.5 pb-2 min-h-[40px]">{inputState.phone_number}</p>
                )}
              </div>
              {!editState.phone_no && (
                <button className="text-base text-[#777980] cursor-pointer" onClick={() => handleEdit('phone_no')}>Edit</button>
              )}
            </div>
            {/* City */}
            <div className="border-b pb-2 flex justify-between items-end">
              <div>
                <h3 className="text-lg text-[#1D1F2C] font-semibold">City</h3>
                {editState.city ? (
                  <input
                    className="text-base text-[#777980] mt-1.5 py-2 px-0 w-full bg-white border-0 border-b border-[#D2D2D5] focus:outline-none focus:border-[#0b7680] transition-colors"
                    value={inputState.city}
                    onChange={e => handleInputChange('city', e.target.value)}
                  />
                ) : (
                  <p className="text-base text-[#777980] mt-1.5 pb-2 min-h-[40px]">{inputState.city}</p>
                )}
              </div>
              {!editState.city && (
                <button className="text-base text-[#777980] cursor-pointer" onClick={() => handleEdit('city')}>Edit</button>
              )}
            </div>
            {/* Trade */}
            <div className="border-b pb-2 flex justify-between items-end">
              <div>
                <h3 className="text-lg text-[#1D1F2C] font-semibold">Trade</h3>
                {editState.trade ? (
                  <input
                    className="text-base text-[#777980] mt-1.5 py-2 px-0 w-full bg-white border-0 border-b border-[#D2D2D5] focus:outline-none focus:border-[#0b7680] transition-colors"
                    value={inputState.trade}
                    onChange={e => handleInputChange('trade', e.target.value)}
                  />
                ) : (
                  <p className="text-base text-[#777980] mt-1.5 pb-2 min-h-[40px]">{inputState.trade}</p>
                )}
              </div>
              {!editState.trade && (
                <button className="text-base text-[#777980] cursor-pointer" onClick={() => handleEdit('trade')}>Edit</button>
              )}
            </div>
            {/* Role */}
            <div className="border-b pb-2 flex justify-between items-end">
              <div>
                <h3 className="text-lg text-[#1D1F2C] font-semibold">Role</h3>
                {editState.role ? (
                  <input
                    className="text-base text-[#777980] mt-1.5 py-2 px-0 w-full bg-white border-0 border-b border-[#D2D2D5] focus:outline-none focus:border-[#0b7680] transition-colors"
                    value={inputState.role}
                    onChange={e => handleInputChange('role', e.target.value)}
                  />
                ) : (
                  <p className="text-base text-[#777980] mt-1.5 pb-2 min-h-[40px]">{inputState.role}</p>
                )}
              </div>
              {!editState.role && (
                <button className="text-base text-[#777980] cursor-pointer" onClick={() => handleEdit('role')}>Edit</button>
              )}
            </div>
            {/* Work at Company */}
            <div className="border-b flex justify-between items-end">
              <div>
                <h3 className="text-lg text-[#1D1F2C] font-semibold">Work at Company</h3>
                {editState.work ? (
                  <input
                    className="text-base text-[#777980] mt-1.5 py-2 px-0 w-full bg-white border-0 border-b border-[#D2D2D5] focus:outline-none focus:border-[#0b7680] transition-colors"
                    value={inputState.work}
                    onChange={e => handleInputChange('work', e.target.value)}
                  />
                ) : (
                  <p className="text-base text-[#777980] mt-1.5 pb-2 min-h-[40px]">{inputState.work}</p>
                )}
              </div>
              {!editState.work && (
                <button className="text-base text-[#777980] cursor-pointer" onClick={() => handleEdit('work')}>Edit</button>
              )}
            </div>
             <div className=" border-b flex justify-between items-end">
              <div>
                <h3 className="text-lg text-[#1D1F2C] font-semibold">Qualified Leads Fee</h3>
                {editState.qualify ? (
                  <input
                    className="text-base text-[#777980] mt-1.5 py-2 px-0 w-full bg-white border-0 border-b border-[#D2D2D5] focus:outline-none focus:border-[#0b7680] transition-colors"
                    value={inputState.qualify}
                    onChange={e => handleInputChange('qualify', e.target.value)}
                  />
                ) : (
                  <p className="text-base text-[#777980] mt-1.5 pb-2 min-h-[40px]">{inputState.qualify}</p>
                )}
              </div>
              {!editState.qualify && (
                <button className="text-base text-[#777980] cursor-pointer" onClick={() => handleEdit('qualify')}>Edit</button>
              )}
            </div>
             <div className=" border-b flex justify-between items-end">
              <div>
                <h3 className="text-lg text-[#1D1F2C] font-semibold">Qualified Leads Fee</h3>
                {editState.conversion_fee ? (
                  <input
                    className="text-base text-[#777980] mt-1.5 py-2 px-0 w-full bg-white border-0 border-b border-[#D2D2D5] focus:outline-none focus:border-[#0b7680] transition-colors"
                    value={inputState.conversion_fee}
                    onChange={e => handleInputChange('conversion_fee', e.target.value)}
                  />
                ) : (
                  <p className="text-base text-[#777980] mt-1.5 pb-2 min-h-[40px]">{inputState.conversion_fee}</p>
                )}
              </div>
              {!editState.conversion_fee && (
                <button className="text-base text-[#777980] cursor-pointer" onClick={() => handleEdit('conversion_fee')}>Edit</button>
              )}
            </div>
            {/* Save Changes Button */}
            <div className="pt-8">
              <button
                className={`bg-[#0b7680] w-full text-white py-4 rounded-[8px] cursor-pointer transition-opacity ${isAnyEditing ? 'opacity-100' : 'opacity-60 cursor-not-allowed'}`}
                disabled={!isAnyEditing}
                onClick={handleSave}
                type="button"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
        <div className='flex-[1_1_0%] w-full mt-6 lg:mt-0'>
        {/* <div className='  p-6 border border-[#E9E9EA] rounded-[8px]'>
           <h2 className=' text-2xl text-[#111827] font-medium'>Set Fee Rate</h2>
           <form action="" className=' space-y-6 mt-6'>
            <div className=' flex flex-col gap-1.5 '>
              <label htmlFor="leads_fee">Qualified Leads Fee</label>
              <input type="text" name="" id="leads_fee" className=' py-2 px-2.5 border rounded-[8px]' value='$ 100.0' />
            </div>
            <div className=' flex flex-col gap-1.5 '>
              <label htmlFor="leads_fee">Conversion Fee</label>
              <input type="text" name="" id="leads_fee" className=' py-2 px-2.5 border rounded-[8px]' value='$ 1,500' />
            </div>
            <button className=' bg-[#0b7680] py-4 w-full rounded-[8px] text-white text-base cursor-pointer'>Set New Fee</button>
           </form>
        </div> */}

        <div className='p-6 border border-[#E9E9EA] rounded-[8px]'>
              <h2 className=' text-2xl text-[#111827] font-medium'>Other Details</h2>
              <div className=' mt-8 space-y-6'>
                <div>
                  <h3 className=' text-lg font-semibold text-[#1D1F2C]'>Total Leads Sent To Us</h3>
                  <p className=' text-base text-[#777980] mt-1.5'> 20</p>
                </div>
                <div>
                  <h3 className=' text-lg font-semibold text-[#1D1F2C]'>Total Gifts</h3>
                  <p className=' text-base text-[#777980] mt-1.5'> 10</p>
                </div>
                <div>
                  <h3 className=' text-lg font-semibold text-[#1D1F2C]'>Total Connection fullfilled</h3>
                  <p className=' text-base text-[#777980] mt-1.5'> 4</p>
                </div>

              </div>
        </div>

        </div>
        </div>

        <div className='mt-8'>
          <h2 className='text-xl sm:text-2xl text-[#111827] font-medium mb-6'>Financial Activity Data</h2>
          <div className='overflow-x-auto'>
            <DynamicTable
              columns={FinancialActivityColumn({ onView: handleView })}
              data={FinancialActivityData}
              showPagination={false}
            />
          </div>
        </div>

    </div>
  )
}
