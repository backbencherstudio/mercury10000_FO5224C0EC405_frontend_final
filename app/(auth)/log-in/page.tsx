import Login from '@/components/auth/Login'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  )
}
