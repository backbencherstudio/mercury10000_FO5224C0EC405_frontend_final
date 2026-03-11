import SettingsNav from '@/components/Admin/settings/SettingsNav'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <SettingsNav/>
        {children}
    </div>
  )
}
