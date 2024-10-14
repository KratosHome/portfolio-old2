'use client'
import { usePathname } from 'next/navigation'
import { MenuInfoUser } from '@/components/client/menu-info/menu-info-user'
import MenuInfoCodeCraft from '@/components/client/menu-info/menu-info-code-craft'
import { useLocale } from 'use-intl'
import { useEffect, useState } from 'react'
import { getUser } from '@/server/users/get-user.server'
import Error from 'next/error'
import { Header } from '@/components/layout/header/header'
import MenuInfoOlegTkach from '@/components/UI/client/menu-info-oleg-tkach/menu-info-oleg-tkach'

interface User {
  success: boolean
  user?: IUser
}

export default function Template({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const locale = useLocale()
  const split = path.split('/')
  const userId = split[4]

  const [user, setUser] = useState<User | null>(null)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      setLoader(true)
      const user: User = await getUser(userId)
      setUser(user)
      setLoader(false)
    }
    fetchUser()
  }, [userId])

  if (
    !loader &&
    !user?.success &&
    path === `/${locale}/community/members/${userId}`
  ) {
    return <Error statusCode={404} />
  }

  let userInfoComponent = null

  if (
    path === '/' ||
    path === `/${locale}` ||
    path === `/${locale}/privacy-policy`
  ) {
    userInfoComponent = <Header userInfo={<MenuInfoOlegTkach />} />
  } else if (
    path === `/${locale}/blog` ||
    path === `/${locale}/community/projects` ||
    path === `/${locale}/community/members` ||
    path.startsWith(`/${locale}/admin/`) ||
    path.startsWith('/admin/') // Додано цей рядок
  ) {
    userInfoComponent = <Header userInfo={<MenuInfoCodeCraft />} />
  } else if (path === `/${locale}/community/members/${userId}`) {
    userInfoComponent = (
      <Header userInfo={<MenuInfoUser title={user?.user?.username} />} />
    )
  }

  return (
    <>
      <Header userInfo={<MenuInfoOlegTkach />} />
      {children}
    </>
  )
}
