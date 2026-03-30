import SecretaryLeadNav from '@/components/secretary-dashboard/lead-history/SecretaryLeadNav'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <SecretaryLeadNav/>
       {children}
    </div>
  )
}
