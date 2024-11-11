import { ReactNode } from 'react'
import { CommunityDashboard } from '@/components/client/community-dashboard/community-dashboard'
import { projectsDashboardData } from '@/data/projects-dashboard'

export default async function LocaleLayout(props: {
  children: ReactNode
  params: Promise<{ locale: ILocale }>
}) {
  const params = await props.params

  const { locale } = params

  const { children } = props

  const data = projectsDashboardData[locale]

  return (
    <>
      <main className="mx-auto max-w-[1442px] px-[12px] lg:px-[24px]">
        <CommunityDashboard data={data} />
        {children}
      </main>
    </>
  )
}
