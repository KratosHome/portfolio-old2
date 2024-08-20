import { auth } from '@/server/auth/auth.server'
import { redirect } from 'next/navigation'
import Login from '@/components/client/auth/login/login'

export default async function page({ params: { locale } }: PageProps) {
  const session = await auth()
  if (session?.user) redirect('/admin/user')
  return <Login />
}
