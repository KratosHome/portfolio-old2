'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/UI/sidebar'
import Link from 'next/link'
import { ComponentType } from 'react'
import Image from 'next/image'
import { useStore } from '@/store/user'
import { RxAvatar } from 'react-icons/rx'
import LogOut from '@/components/client/auth/log-out/log-out'
import { adminDashboardData } from '@/data/admin-dashboard'
import { useLocale } from 'use-intl'

interface SidebarItem {
  id: string | number
  link: string
  title: string
  icon: ComponentType
  roles: string[]
  isRelisted?: boolean
}

export function AppSidebar() {
  const { user } = useStore()
  const locale = useLocale() as ILocale

  const dashboard: SidebarItem[] = adminDashboardData[locale].filter(
    (item) =>
      item.roles.includes('all') ||
      (user.isAdmin && item.roles.includes('admin')),
  )

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-16">
              <Link
                href={`/${locale}/admin/user`}
                className="z-10 mb-4 transition-all duration-300 ease-in-out hover:scale-105 hover:text-blue-500"
              >
                {user.userLogo ? (
                  <Image
                    src={user.userLogo}
                    alt={`user logo ${user.username}`}
                    width={48}
                    height={48}
                    className="size-12 rounded-full"
                  />
                ) : (
                  <RxAvatar className="size-12" />
                )}
              </Link>
              {dashboard.map((item: SidebarItem) => (
                <SidebarMenuButton key={item.id} asChild>
                  <SidebarMenuItem>
                    {item.isRelisted ? (
                      <Link
                        href={item.link}
                        className={`flex items-center space-x-2 transition-all duration-300 ${item.isRelisted ? 'text-green-500' : 'text-gray-500'} hover:scale-105`}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    ) : (
                      <div
                        className={`flex items-center space-x-2 transition-all duration-300 ${item.isRelisted ? 'text-green-500' : 'text-gray-500'} hover:scale-105`}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </div>
                    )}
                  </SidebarMenuItem>
                </SidebarMenuButton>
              ))}
              <LogOut />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
