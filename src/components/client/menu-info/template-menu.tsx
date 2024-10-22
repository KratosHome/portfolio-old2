import React from 'react'
import { usePathname } from 'next/navigation'
import { useLocale } from 'use-intl'
import MenuInfoCodeCraft from '@/components/client/menu-info/menu-info-code-craft'
import { MenuInfoUser } from '@/components/client/menu-info/menu-info-user'
import MenuInfoOlegTkach from '@/components/UI/client/menu-info-oleg-tkach/menu-info-oleg-tkach'
import Header from '@/components/layout/header/header'

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
