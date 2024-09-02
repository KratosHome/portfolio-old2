'use client'
import { FC } from 'react'
import Link from 'next/link'
import { useLocale } from 'use-intl'
import './community-dashboard.scss'
import { ButtonBeck } from '@/components/UI/button-beck/button-beck'

interface CommunityDashboardProps {
  data: any
}

export const CommunityDashboard: FC<CommunityDashboardProps> = ({ data }) => {
  const locale = useLocale()

  return (
    <div className="flex flex-col justify-center">
      <ButtonBeck />
      <div className="text-right">Сhoose which section you want to look at</div>
      <div className="flex flex-wrap items-center justify-center">
        {data.map((item: any, index: number) => (
          <div
            key={item.name}
            className="flex cursor-pointer items-center text-[20px] lg:text-[64px]"
          >
            <Link
              href={`/${locale}/${item.link}`}
              className="community-dashboard-card group relative block overflow-hidden !rounded-full p-[24px] uppercase lg:p-[32px]"
            >
              <span className="duration-300 group-hover:text-[#0B66F5]">
                {item.name}
              </span>
            </Link>
            {index < data.length - 1 && <span className="block">/</span>}{' '}
          </div>
        ))}
      </div>
    </div>
  )
}
