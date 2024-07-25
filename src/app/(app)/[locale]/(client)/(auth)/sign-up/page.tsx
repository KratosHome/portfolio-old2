import { auth } from '@/server/auth/auth'
import { redirect } from 'next/navigation'
import Login from '@/components/auth/login/login'

export default async function page({ params: { locale } }: PageProps) {
  const session = await auth()

  if (session?.user) {
    redirect(`/${locale}/admin`)
  }
  return (
    <>
      <Login />
    </>
  )
}
