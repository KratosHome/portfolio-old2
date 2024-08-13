'use client'
import { FC, useRef, useEffect } from 'react'
import Link from 'next/link'
import { RxAvatar } from 'react-icons/rx'
import { MdOutlineWorkHistory } from 'react-icons/md'
import { FaTasks } from 'react-icons/fa'
import { GrBlog } from 'react-icons/gr'
import { PiStudentBold } from 'react-icons/pi'
import { FaUserSecret } from 'react-icons/fa'
import { useLocale } from 'use-intl'
import LogOut from '@/components/auth/log-out/log-out'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const icons = {
  MdOutlineWorkHistory,
  FaTasks,
  GrBlog,
  PiStudentBold,
  FaUserSecret,
}

type DashboardItem = {
  id: number
  icon: keyof typeof icons
  link: string
  title: string
  tabs: any
}

interface DashboardProps {
  dashboard: DashboardItem[]
}

export const Dashboard: FC<DashboardProps> = ({ dashboard }) => {
  const locale = useLocale()
  const dashboardRef = useRef<HTMLDivElement>(null)
  const { contextSafe } = useGSAP()

  const handleMouseEnter = contextSafe(() => {
    if (dashboardRef.current) {
      gsap.to(dashboardRef.current, { width: '300px', duration: 0.5 })
    }
  })

  const handleMouseLeave = contextSafe(() => {
    if (dashboardRef.current) {
      gsap.to(dashboardRef.current, { width: '80px', duration: 0.5 })
    }
  })

  return (
    <div
      ref={dashboardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex w-[80px] flex-col items-start justify-between overflow-hidden rounded-r-3xl rounded-bl-xl border border-neutral-600 pl-3"
    >
      <ul className="mt-5">
        {dashboard.map((item, index) => {
          const IconComponent = icons[item.icon]
          return (
            <li key={index}>
              <Link
                href={`/${locale}/admin/${item.link}`}
                className="mb-6 flex items-center transition-all duration-300 ease-in-out hover:scale-105 hover:text-blue-500"
              >
                {IconComponent && <IconComponent className="size-12" />}
                <span className="ml-5 block text-[20px]">{item.title}</span>
              </Link>
            </li>
          )
        })}
        <li>
          <LogOut />
        </li>
      </ul>
      <Link
        href={`/${locale}/admin/user`}
        className="z-10 mb-4 transition-all duration-300 ease-in-out hover:scale-105 hover:text-blue-500"
      >
        <RxAvatar className="size-12" />
      </Link>
    </div>
  )
}
