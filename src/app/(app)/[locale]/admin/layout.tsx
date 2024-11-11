import { ReactNode } from 'react'
import { adminDashboardData } from '@/data/admin-dashboard'
import { redirect } from 'next/navigation'
import { auth } from '@/server/auth/auth.server'
import { createUsers } from '@/server/users/create-user.server'
import 'react-quill/dist/quill.snow.css'
import { Dashboard } from '@/components/admin/dashboard/dashboard'

export default async function LocaleLayout(props: {
  children: ReactNode
  params: Promise<{ locale: LanguageProps }>
}) {
  const params = await props.params

  const { locale } = params

  const { children } = props

  const dashboard: any = adminDashboardData[locale]

  const session = await auth()

  if (!session) redirect('/')
  if (session.user) await createUsers(session)
  return (
    <>
      <div className="relative mx-auto flex max-w-[1442px] rounded-lg bg-neutral-800">
        <Dashboard dashboard={dashboard} />
        <main className="z-20 min-h-[90svh] w-full">{children}</main>
      </div>
    </>
  )
}
