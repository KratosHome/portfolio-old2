'use client'
import React, { JSX } from 'react'
import { usePathname } from 'next/navigation'
import { MenuInfoUser } from '@/components/client/menu-info/menu-info-user'
import MenuInfoCodeCraft from '@/components/client/menu-info/menu-info-code-craft'
import { useLocale } from 'use-intl'
import { useEffect, useState } from 'react'
import { getUser } from '@/server/users/get-user.server'
import Error from 'next/error'
import MenuInfoOlegTkach from '@/components/UI/client/menu-info-oleg-tkach/menu-info-oleg-tkach'
import Header from '@/components/layout/header/header'
import { useStore } from '@/store/user'
import { useSession } from 'next-auth/react'

interface User {
  success: boolean
  user?: IUser
}

export default function Template({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const locale = useLocale()
  const split = path.split('/')
  const userId = split[4]

  const { data: session } = useSession()
  const { user, fetchUser } = useStore()

  const [userHeader, setUserHeader] = useState<User | null>(null)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    if (session?.user) {
      const fetchData = async () => {
        await fetchUser(session.user?.email)
      }
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  useEffect(() => {
    const fetchUser = async () => {
      setLoader(true)
      const user: User = await getUser(userId)
      setUserHeader(user)
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

  const userInfoComponentsMap: { [key: string]: JSX.Element } = {
    [`/`]: <Header userInfo={<MenuInfoOlegTkach />} />,
    [`/${locale}`]: <Header userInfo={<MenuInfoOlegTkach />} />,
    [`/${locale}/`]: <Header userInfo={<MenuInfoOlegTkach />} />,
    [`/${locale}/blog`]: <Header userInfo={<MenuInfoCodeCraft />} />,
    [`/${locale}/mentoring/projects`]: (
      <Header userInfo={<MenuInfoCodeCraft />} />
    ),
    [`/${locale}/mentoring/members`]: (
      <Header userInfo={<MenuInfoCodeCraft />} />
    ),
    [`/${locale}/community/projects`]: (
      <Header userInfo={<MenuInfoCodeCraft />} />
    ),
    [`/${locale}/community/members`]: (
      <Header userInfo={<MenuInfoCodeCraft />} />
    ),
    [`/${locale}/community/members/${userId}`]: (
      <Header userInfo={<MenuInfoUser title={userHeader?.user?.username} />} />
    ),
  }

  const userInfoComponent = userInfoComponentsMap[path] || null

  if (path.includes('/admin')) {
    return (
      <div>
        <Header userInfo={<MenuInfoUser title={''} />} />
        {children}
      </div>
    )
  }

  if (path.includes('/blog')) {
    return (
      <div>
        <Header userInfo={<MenuInfoCodeCraft />} />
        {children}
      </div>
    )
  }

  if (path.includes('/login')) {
    return (
      <div>
        <Header userInfo={<MenuInfoUser title={user?.user?.username} />} />
        {children}
      </div>
    )
  }

  return (
    <div>
      {userInfoComponent}
      {children}
    </div>
  )
}
