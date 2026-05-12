"use client"

import React, { useEffect, useState } from 'react'
import { Switch } from "@/components/ui/switch"
import {
  useGetSettingNotificationQuery,
  useUpdateSettingNotificationMutation
} from '@/redux/features/settings/settings';
import toast from 'react-hot-toast';

export default function EmailNotification() {

  const { data, isLoading } = useGetSettingNotificationQuery({})

  const [update, { isLoading: updateLoading }] =
    useUpdateSettingNotificationMutation()

  const [settings, setSettings] = useState({
    new_leads: false,
    conection_req: false,
    reward_system: false,
    support_ticket: false
  })

  useEffect(() => {
    if (data?.data) {
      setSettings(data.data)
    }
  }, [data])

  if (isLoading) return <div>Loading...</div>

  const handleSave = async () => {
    try {

      const res = await update(settings).unwrap()

      // console.log(res)

      toast.success("Notification settings updated successfully")

    } catch (error: any) {

      console.log(error)

      toast.error(
        error?.data?.message || "Something went wrong"
      )
    }
  }

  return (
    <div className='mt-[70px]'>

      <h2 className='text-[26px] text-[#161721] font-medium'>
        Notification Preferences
      </h2>

      <div className='space-y-6'>

        {/* New Leads */}
        <div className='flex items-center justify-between mt-6 border-b border-[#E9E9EA] pb-2'>
          <div>
            <h3 className='text-lg text-[#1D1F2C] font-medium'>
              New Lead Submission Alert
            </h3>

            <p className='mt-1.5 text-[#777980] text-base'>
              Notify & Email me every time a new lead is submitted.
            </p>
          </div>

          <Switch
            checked={settings.new_leads}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({
                ...prev,
                new_leads: checked
              }))
            }
          />
        </div>

        {/* Connection */}
        <div className='flex items-center justify-between mt-6 border-b border-[#E9E9EA] pb-2'>
          <div>
            <h3 className='text-lg text-[#1D1F2C] font-medium'>
              Connection Management Alert
            </h3>

            <p className='mt-1.5 text-[#777980] text-base'>
              Notify the moment a partner clicks YES or NO.
            </p>
          </div>

          <Switch
            checked={settings.conection_req}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({
                ...prev,
                conection_req: checked
              }))
            }
          />
        </div>

        {/* Reward */}
        <div className='flex items-center justify-between mt-6 border-b border-[#E9E9EA] pb-2'>
          <div>
            <h3 className='text-lg text-[#1D1F2C] font-medium'>
              Reward System Alerts
            </h3>

            <p className='mt-1.5 text-[#777980] text-base'>
              Notify when a gift is expiring.
            </p>
          </div>

          <Switch
            checked={settings.reward_system}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({
                ...prev,
                reward_system: checked
              }))
            }
          />
        </div>

        {/* Support */}
        <div className='flex items-center justify-between mt-6 border-b border-[#E9E9EA] pb-2'>
          <div>
            <h3 className='text-lg text-[#1D1F2C] font-medium'>
              Support Notification
            </h3>

            <p className='mt-1.5 text-[#777980] text-base'>
              Get support notification.
            </p>
          </div>

          <Switch
            checked={settings.support_ticket}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({
                ...prev,
                support_ticket: checked
              }))
            }
          />
        </div>

      </div>

      <button
        onClick={handleSave}
        disabled={updateLoading}
        className='py-4 bg-[#0b7680] rounded-[8px] px-16 mt-12 text-white cursor-pointer hover:bg-[#0b7680]/90'
      >
        {updateLoading ? "Saving..." : "Save Changes"}
      </button>

    </div>
  )
}