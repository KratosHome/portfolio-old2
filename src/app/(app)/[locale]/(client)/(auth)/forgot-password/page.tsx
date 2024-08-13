import { auth } from '@/server/auth/auth.server'
import { redirect } from 'next/navigation'
import ForgotPassword from '@/components/auth/forgot-password/forgot-password'

export default async function Page({ params: { locale } }: any) {
  const session = await auth()

  return (
    <>
      <ForgotPassword />
    </>
  )
}
