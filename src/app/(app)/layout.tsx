import { Analytics } from '@vercel/analytics/react'
import { ReactNode } from 'react'

export const dynamic = 'force-dynamic'

export default async function LocaleLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      {children}
      <Analytics />
    </>
  )
}
