import React from 'react'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"


export default function EmailNotification() {
  return (
    <div className=' mt-[70px]'>

        <h2 className='text-[26px] text-[#161721] font-medium'>Notification Preferences</h2>
        <div className=' space-y-6'>
            <div className=' flex items-center justify-between mt-6 border-b border-[#E9E9EA] pb-2'>
                <div>
                <h3 className=' text-lg text-[#1D1F2C] font-medium'>New Lead Submission Alert</h3>
                <p className=' mt-1.5 text-[#777980] text-base'>Notify & Email me every time a new lead is submitted.</p>
                </div>

                <Switch id="airplane-mode" />

            </div>
            <div className=' flex items-center justify-between mt-6 border-b border-[#E9E9EA] pb-2'>
                <div>
                <h3 className=' text-lg text-[#1D1F2C] font-medium'>Connection Management Alert</h3>
                <p className=' mt-1.5 text-[#777980] text-base'>Notify the moment a partner clicks YES or NO so you can call them immediately.</p>
                </div>

              <Switch id="airplane-mode" />

            </div>
            <div className=' flex items-center justify-between mt-6 border-b border-[#E9E9EA] pb-2'>
                <div>
                <h3 className=' text-lg text-[#1D1F2C] font-medium'>Reward System Alerts</h3>
                <p className=' mt-1.5 text-[#777980] text-base'>Notify when a gift is expiring.</p>
                </div>

              <Switch id="airplane-mode" />

            </div>
            <div className=' flex items-center justify-between mt-6 border-b border-[#E9E9EA] pb-2'>
                <div>
                <h3 className=' text-lg text-[#1D1F2C] font-medium'>Support Notification</h3>
                <p className=' mt-1.5 text-[#777980] text-base'>Get support notification.</p>
                </div>

                <Switch id="airplane-mode" />

            </div>

        </div>

        <button className=' py-4 bg-[#0b7680] rounded-[8px] px-16 mt-12 text-white cursor-pointer hover:bg-[#0b7680]/90 '>Save Changes</button>
        
    </div>
  )
}



