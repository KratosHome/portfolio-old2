'use client'
import { FC, useEffect, useRef } from 'react'
import Link from 'next/link'
import { RxAvatar } from 'react-icons/rx'
import { MdOutlineWorkHistory } from 'react-icons/md'
import { FaCalendarAlt, FaTasks } from 'react-icons/fa'
import { GrAnnounce, GrBlog } from 'react-icons/gr'
import { PiStudentBold } from 'react-icons/pi'
import { FaUserSecret } from 'react-icons/fa'
import { useLocale } from 'use-intl'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { IoDocuments } from 'react-icons/io5'
import { RiTeamLine } from 'react-icons/ri'
import { FcStatistics } from 'react-icons/fc'
import LogOut from '@/components/client/auth/log-out/log-out'
import { AiOutlineWechat } from 'react-icons/ai'

const icons = {
  MdOutlineWorkHistory,
  FaTasks,
  GrBlog,
  PiStudentBold,
  FaUserSecret,
  GrAnnounce,
  IoDocuments,
  RiTeamLine,
  FcStatistics,
  AiOutlineWechat,
  FaCalendarAlt,
}

type IconKey = keyof typeof icons

interface DashboardItem {
  id: number
  title: string
  link: string
  icon: IconKey
  roles: string[]
  tabs?: any
  isInProject: boolean
}

interface DashboardProps {
  dashboard: DashboardItem[]
}

export const Dashboard: FC<DashboardProps> = ({ dashboard }) => {
  const locale = useLocale()
  const dashboardRef = useRef<HTMLDivElement>(null)
  const { contextSafe } = useGSAP()
  const animationDelay = 500 // затримка у мілісекундах
  let enterTimeout: ReturnType<typeof setTimeout> | null = null

  const handleMouseEnter = contextSafe(() => {
    enterTimeout = setTimeout(() => {
      if (dashboardRef.current) {
        gsap.to(dashboardRef.current, {
          width: '300px',
          duration: 0.5,
        })
      }
    }, animationDelay)
  })

  const handleMouseLeave = contextSafe(() => {
    if (enterTimeout) {
      clearTimeout(enterTimeout)
      enterTimeout = null
    }
    if (dashboardRef.current) {
      gsap.to(dashboardRef.current, {
        width: '80px',
        duration: 0.5,
      })
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
                {IconComponent && (
                  <IconComponent
                    className={`size-12 ${item.isInProject ? 'text-red-300' : 'text-white'}`}
                  />
                )}

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
