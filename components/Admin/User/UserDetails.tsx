import React from 'react'
import { FinancialActivityColumn } from '@/components/columns/FinancialActivityColumn'
import DynamicTable from '@/components/reusable/DynamicTable'
import { FinancialActivityData } from '@/public/demoData/FinancialActivityData'
import {   useRouter } from 'next/navigation'

interface User {
  id: string;
  user_name: string;
  phone_no: string;
  city: string;
  role: 'user' | 'Secretary';
}

interface UserDetailsProps {
  user: User;
}
 

export default function UserDetails({user}:UserDetailsProps) {

  const {user_name,id,phone_no,city,role}=user
  const router =useRouter()
 

  const handleView =( )=>{
     router.push(`/dashboard/user/all-users/${id}/monthly-details`)
        
  }
  return (
    <div className=' border border-[#E9E9EA] p-6 rounded-[12px] mt-8'>
        {/* {user.id} {user.role} */}
        <div className=' flex  gap-8'>
        <div className=' flex-1 p-6 border border-[#E9E9EA] rounded-[8px]'>
          <h2 className=' text-2xl text-[#111827] font-medium'>Basic Details</h2>
          <div className=' mt-6 space-y-6'>
            <div className=' p-4 border border-[#11B0C1] bg-[#E6F6F4] rounded-[12px]'>
              <h3 className=' text-lg text-[#1D1F2C] font-semibold'>User Created</h3>
              <p className=' text-base text-[#777980] mt-1.5'>26 Feb, 2026</p>
            </div>
            <div className=' border-b pb-2 flex justify-between items-end'>
              <div>
              <h3 className=' text-lg text-[#1D1F2C] font-semibold'>User Name</h3>
              <p className=' text-base text-[#777980] mt-1.5'>{user_name}</p>
              </div>
              <button className=' text-base text-[#777980] cursor-pointer'>Edit</button>

            </div>
            <div className=' border-b pb-2 flex justify-between items-end'>
              <div>
              <h3 className=' text-lg text-[#1D1F2C] font-semibold'>User ID</h3>
              <p className=' text-base text-[#777980] mt-1.5'>{id}</p>
              </div>
              <button className=' text-base text-[#777980] cursor-pointer'>Edit</button>

            </div>
            <div className=' border-b pb-2 flex justify-between items-end'>
              <div>
              <h3 className=' text-lg text-[#1D1F2C] font-semibold'>Phone No.</h3>
              <p className=' text-base text-[#777980] mt-1.5'>{phone_no}</p>
              </div>
              <button className=' text-base text-[#777980] cursor-pointer'>Edit</button>

            </div>
            <div className=' border-b pb-2 flex justify-between items-end'>
              <div>
              <h3 className=' text-lg text-[#1D1F2C] font-semibold'>City</h3>
              <p className=' text-base text-[#777980] mt-1.5'>{city}</p>
              </div>
              <button className=' text-base text-[#777980] cursor-pointer'>Edit</button>

            </div>
            <div className=' border-b pb-2 flex justify-between items-end'>
              <div>
              <h3 className=' text-lg text-[#1D1F2C] font-semibold'>Trade</h3>
              <p className=' text-base text-[#777980] mt-1.5'>Plumbing</p>
              </div>
              <button className=' text-base text-[#777980] cursor-pointer'>Edit</button>

            </div>
            <div className=' border-b pb-2 flex justify-between items-end'>
              <div>
              <h3 className=' text-lg text-[#1D1F2C] font-semibold'>Role</h3>
              <p className=' text-base text-[#777980] mt-1.5'>{role}</p>
              </div>
              <button className=' text-base text-[#777980] cursor-pointer'>Edit</button>

            </div>
            <div className='   flex justify-between items-end'>
              <div>
              <h3 className=' text-lg text-[#1D1F2C] font-semibold'>Work at Company</h3>
              <p className=' text-base text-[#777980] mt-1.5'>LMS</p>
              </div>
              <button className=' text-base text-[#777980] cursor-pointer'>Edit</button>

            </div>
          </div>
        </div>
        <div className=' flex-1'>
        <div className='  p-6 border border-[#E9E9EA] rounded-[8px]'>
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
        </div>

        <div className='  p-6 border border-[#E9E9EA] rounded-[8px] mt-3'>
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

        <div className=' mt-8'>
          <h2 className=' text-2xl text-[#111827] font-medium mb-6'>Financial Activity Data</h2>
          <DynamicTable
          columns={FinancialActivityColumn({onView:handleView})}
          data={FinancialActivityData}
           showPagination={false}
          />
        </div>

    </div>
  )
}
