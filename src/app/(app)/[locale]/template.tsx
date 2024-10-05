'use client'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/header/header'
import { MenuInfoUser } from '@/components/client/menu-info/menu-info-user'
import MenuInfoCodeCraft from '@/components/client/menu-info/menu-info-code-craft'
import MenuInfoOlegTkach from '@/components/users/OlegTkach/menu-info-oleg-tkach'
import { useLocale } from 'use-intl'
import { useEffect, useState } from 'react'
import { getUser } from '@/server/users/get-user.server'
import Error from 'next/error'

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
    path.startsWith('/admin/')
  ) {
    userInfoComponent = <Header userInfo={<MenuInfoCodeCraft />} />
  } else if (path === `/${locale}/community/members/${userId}`) {
    userInfoComponent = (
      <Header userInfo={<MenuInfoUser title={user?.user?.username} />} />
    )
  }

  return (
    <div>
      {userInfoComponent}
      {children}
    </div>
  )
}
