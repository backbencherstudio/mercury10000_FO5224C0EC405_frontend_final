import ConnectionNav from '@/components/Admin/connection/ConnectionNav'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <ConnectionNav/>
        {children}
    </div>
  )
}
