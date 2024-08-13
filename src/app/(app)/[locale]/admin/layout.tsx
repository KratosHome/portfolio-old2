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

  console.log('session', session?.user)

  if (session?.user === undefined) {
    redirect(`/${locale}`)
  }
  return (
    <>
      <div className="relative mx-[24px] mx-auto flex max-w-[1442px] border border-red-400 bg-neutral-700">
        <Dashboard dashboard={dashboard} />
        <main className="min-h-[100svh] w-full">{children}</main>
      </div>
    </>
  )
}
