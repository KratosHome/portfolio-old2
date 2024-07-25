import { auth } from '@/server/auth/auth'
import { redirect } from 'next/navigation'
import ForgotPassword from '@/components/auth/forgot-password/forgot-password'

export default async function Page({ params: { locale } }: any) {
  const session = await auth()

  if (session?.user) {
    redirect(`/${locale}/admin`)
  }
  return (
    <>
      <ForgotPassword />
    </>
  )
}
