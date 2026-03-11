import React from 'react'
import UserNav from '@/components/Admin/User/UserNav'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
     <UserNav/>
        {children}
    </div>
  )
}
