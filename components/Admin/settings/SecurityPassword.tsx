import React from 'react'

export default function SecurityPassword() {
  return (
    <div className=' mt-[70px]'>

         <h2 className='text-[26px] text-[#161721] font-medium'>Notification Preferences</h2>
         <form action="" className=' mt-6'>
            <div className=' space-y-6'>
            <div className=' flex flex-col  gap-2'>
                <label htmlFor="password" className=' text-lg text-[#1D1F2C] font-medium'>Change Password</label>
                <input type="password" name="" id="password" className=' border border-[#777980] py-2 px-2.5 rounded-[8px]' value='00000000000' />
            </div>
            <div className=' flex flex-col  gap-2'>
                <label htmlFor="confirm-password" className=' text-lg text-[#1D1F2C] font-medium'>Confirm New Password</label>
                <input type="password" name="" id="password" className=' border border-[#777980] py-2 px-2.5 rounded-[8px]' value='00000000000' />
            </div>

            </div>
            <ul className=' list-disc pl-5 mt-1'>
                <li className=' text-sm text-[#777980] '>special character</li>
                <li className=' text-sm text-[#777980] '>numeric</li>
                <li className=' text-sm text-[#777980] '>uppercase, and lowercase</li>
               
            </ul>
            <button className=' py-4 w-[230px] bg-[#0b7680] rounded-[8px] text-white text-base mt-12 cursor-pointer'>Update</button>
         </form>
    </div>
  )
}
