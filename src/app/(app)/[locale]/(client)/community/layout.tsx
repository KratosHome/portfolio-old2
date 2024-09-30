import { ReactNode } from 'react'
import { CommunityDashboard } from '@/components/client/community-dashboard/community-dashboard'
import { projectsDashboardData } from '@/data/users/OlegTkach/projects-dashboard'

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: LanguageProps }
}) {
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
