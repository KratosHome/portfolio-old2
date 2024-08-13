import Login from '@/components/auth/login/login'
import { auth } from '@/server/auth/auth.server'
import { redirect } from 'next/navigation'

export default async function page({ params: { locale } }: PageProps) {
  const session = await auth()

  if (session?.user) {
    redirect(`/${locale}/admin`)
  }
  return <Login />
}
