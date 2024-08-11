import { ReactNode } from 'react'
import { Dashboard } from '@/components/dashboard/dashboard'
import { adminDashboardData } from '@/data/admin-dashboard'

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: LanguageProps }
}) {
  const dashboard = adminDashboardData[locale]

  return (
    <>
      <div className="relative mx-auto flex max-w-[1442px] px-[24px]">
        <Dashboard dashboard={dashboard} />
        <main className="min-h-[100svh]">{children}</main>
      </div>
    </>
  )
}
