'use client'
import { FC } from 'react'
import Link from 'next/link'
import { useLocale } from 'use-intl'
import { usePathname } from 'next/navigation'
import './community-dashboard.scss'
import { ButtonBeck } from '@/components/UI/button-beck/button-beck'

interface CommunityDashboardProps {
  data: any
}

export const CommunityDashboard: FC<CommunityDashboardProps> = ({ data }) => {
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <div className="relative flex flex-col justify-center pt-[119px]">
      <div className="animate-scale-in-out absolute left-0 -z-10 hidden h-[300px] w-[300px] bg-group-pattern bg-cover bg-center opacity-[.1] lg:block" />
      <ButtonBeck />
      <div className="mt-[33px] text-right font-bold">
        Сhoose which section you want to look at
      </div>
      <div className="mt-[91px] flex flex-wrap items-center justify-center">
        {data.map((item: any, index: number) => {
          const isActive = pathname === `/${locale}/${item.link}`

          return (
            <div
              key={item.name}
              className="flex cursor-pointer items-center text-[20px] lg:text-[64px]"
            >
              <Link
                href={`/${locale}/${item.link}`}
                className={`community-dashboard-card group relative block overflow-hidden !rounded-full p-[24px] uppercase lg:p-[32px] ${isActive ? 'active' : ''}`}
              >
                <span className="duration-300 group-hover:text-[#0B66F5]">
                  {item.name}
                </span>
              </Link>
              {index < data.length - 1 && <span className="block">/</span>}{' '}
            </div>
          )
        })}
      </div>
    </div>
  )
}
