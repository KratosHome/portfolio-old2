import { ReactNode } from 'react'
import { Dashboard } from '@/components/dashboard/dashboard'
import { adminDashboardData } from '@/data/admin-dashboard'
import { redirect } from 'next/navigation'
import { auth } from '@/server/auth/auth.server'

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: LanguageProps }
}) {
  const dashboard = adminDashboardData[locale]
  const session = await auth()

  return (
    <>
      <div className="relative mx-auto flex max-w-[1442px] rounded-lg bg-neutral-800">
        <Dashboard dashboard={dashboard} />
        <main className="min-h-[90svh] w-full">{children}</main>
      </div>
    </>
  )
}
