'use client'
import { FC } from 'react'
import Link from 'next/link'
import { useLocale } from 'use-intl'
import { usePathname } from 'next/navigation'
import { ButtonBeck } from '@/components/UI/button-beck/button-beck'

interface CommunityDashboardProps {
  data: any
}

export const CommunityDashboard: FC<CommunityDashboardProps> = ({ data }) => {
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <div className="relative flex flex-col justify-center pt-[119px]">
      <div className="absolute -right-[500px] top-[300px] -z-10 mx-auto h-[769.29px] w-[769.29px] flex-shrink-0 rotate-[-89.637deg] rounded-full bg-[linear-gradient(223deg,_rgba(223,_223,_223,_0.20)_12.99%,_rgba(0,_0,_0,_0.20)_28.97%),_linear-gradient(265deg,_#666_-44.12%,_#262626_-21.9%,_#1C1C1C_4.39%,_#000_40.18%)]" />
      <div className="animate-scale-in-out absolute left-0 -z-20 size-[300px] -translate-x-1/2 bg-group-pattern-light dark:bg-group-pattern dark:opacity-[0.1] xl:size-[300px]" />
      <ButtonBeck />
      <div className="mt-[33px] text-right font-bold">
        Сhoose which section you want to look at
      </div>
      <div className="mt-[91px] flex items-center justify-center">
        {data.map((item: any, index: number) => {
          const isActive = pathname === `/${locale}/${item.link}`

          return (
            <div
              key={item.name}
              className="flex cursor-pointer items-center text-[20px] lg:text-[64px]"
            >
              <Link
                href={`/${locale}/${item.link}`}
                className={`background-item group relative block overflow-hidden !rounded-full p-[24px] uppercase lg:p-[32px] ${isActive ? 'active' : ''}`}
              >
                <span
                  className={`duration-300 group-hover:text-white dark:group-hover:text-[#0B66F5] ${isActive ? 'text-white' : ''} `}
                >
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
