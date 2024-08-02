import { Analytics } from '@vercel/analytics/react'
import { ReactNode } from 'react'

export const dynamic = 'force-dynamic'

export default async function LocaleLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html suppressHydrationWarning={true}>
      <body className="max-w-screen relative overflow-x-hidden bg-white font-sansation dark:bg-black">
        {children}
      </body>
      <Analytics />
    </html>
  )
}
