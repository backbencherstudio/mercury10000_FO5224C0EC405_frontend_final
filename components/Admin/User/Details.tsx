import React from 'react'
import { AllUsersData } from '@/public/demoData/AllUsersData'
import { useParams } from 'next/navigation'
import SecretaryDetails from '@/components/Admin/User/SecretaryDetails'
import UserDetails from '@/components/Admin/User/UserDetails'

export default function Details() {

const params = useParams()
const userId = params.id as string;

const user = AllUsersData.find(u => u.id === userId) as any
  return (
    <div>
          {
        user?.role==='Secretary'? <SecretaryDetails user={user}/> : <UserDetails user={user}/>
      }
    </div>
  )
}
