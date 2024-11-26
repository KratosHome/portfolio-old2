import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/server/auth/auth.server'
import { createUsers } from '@/server/users/create-user.server'
import 'react-quill/dist/quill.snow.css'
import { SidebarProvider, SidebarTrigger } from '@/components/UI/sidebar'
import { AppSidebar } from '@/components/admin/app-sidebar/app-sidebar'

export default async function LocaleLayout(props: {
  children: ReactNode
  params: Promise<{ locale: ILocale }>
}) {
  const { children } = props

  const session = await auth()

  if (!session) redirect('/')
  if (session.user) await createUsers(session)
  return (
    <>
      <SidebarProvider>
        <div>
          <AppSidebar />
        </div>
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </>
  )
}
