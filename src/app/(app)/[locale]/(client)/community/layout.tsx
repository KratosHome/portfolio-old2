import { ReactNode } from 'react'
import { CommunityDashboard } from '@/components/client/community-dashboard/community-dashboard'
import { projectsDashboardData } from '@/data/projects-dashboard'

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: LanguageProps }
}) {
  /*
    const data = projectsDashboardData[locale]
    <CommunityDashboard data={data} />
   */

  return (
    <>
      <main className="mx-auto max-w-[1442px] px-[12px] lg:px-[24px]">
        {children}
      </main>
    </>
  )
}
