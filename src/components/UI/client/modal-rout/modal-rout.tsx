'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export function ModalRout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const handleOpenChange = () => {
    router.back()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={handleOpenChange}
      ></div>
      <div className="relative z-10 w-full max-w-lg overflow-y-hidden rounded-lg bg-white p-6 shadow-lg">
        {children}
      </div>
    </div>
  )
}
