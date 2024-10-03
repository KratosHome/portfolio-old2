'usce client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { useLocale } from 'use-intl'
import { Header } from '@/components/header/header'
import MenuInfoOlegTkach from '@/components/users/OlegTkach/menu-info-oleg-tkach'
import MenuInfoCodeCraft from '@/components/client/menu-info/menu-info-code-craft'
import { MenuInfoUser } from '@/components/client/menu-info/menu-info-user'

const TemplateMenu = () => {
  const path = usePathname()
  const locale = useLocale()
  const userId = path[4]

  const userInfoComponentsMap: { [key: string]: JSX.Element } = {
    [`/${locale}`]: <Header userInfo={<MenuInfoOlegTkach />} />,
    [`/${locale}/blog`]: <Header userInfo={<MenuInfoCodeCraft />} />,
    [`/${locale}/community/projects`]: (
      <Header userInfo={<MenuInfoCodeCraft />} />
    ),
    [`/${locale}/community/members`]: (
      <Header userInfo={<MenuInfoCodeCraft />} />
    ),
    [`/${locale}/community/members/${userId}`]: (
      <Header userInfo={<MenuInfoUser title={'user?.user?.username'} />} />
    ),
  }

  const userInfoComponent = userInfoComponentsMap[path] || null

  return <div>{userInfoComponent}</div>
}

export default TemplateMenu
