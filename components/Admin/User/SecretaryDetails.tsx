import React from 'react'

export default function SecretaryDetails({user}) {
   const {user_name,id,phone_no,city,role}=user
  return (
    <div className='  border border-[#E9E9EA] p-6 rounded-[12px] mt-8'>
      <div className='   p-6 border border-[#E9E9EA] rounded-[8px]'>
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
    </div>
  )
}
