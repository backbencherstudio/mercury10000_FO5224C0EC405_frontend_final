import WriteNoteHome from '@/components/secretary-dashboard/write-note/WriteNoteHome'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WriteNoteHome />
    </Suspense>
  )
}
