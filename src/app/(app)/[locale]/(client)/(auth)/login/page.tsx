import { auth } from '@/server/auth/auth.server'
import { redirect } from 'next/navigation'
import Login from '@/components/client/auth/login/login'
type Params = Promise<{ locale: ILocale }>

export default async function page({ params }: { params: Params }) {
  const { locale } = await params

  const session = await auth()
  if (session?.user) redirect(`/${locale}/admin/user`)
  return <Login />
}
