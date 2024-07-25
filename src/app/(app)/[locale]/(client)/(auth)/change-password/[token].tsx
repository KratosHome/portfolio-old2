import { auth } from '@/server/auth/auth'
import { redirect } from 'next/navigation'
import ChangePassword from '@/components/auth/change-password/change-password'

export default async function Page({ params: { locale } }: any) {
  const session = await auth()

  if (session?.user) {
    redirect(`/${locale}/profile`)
  }
  return (
    <>
      <ChangePassword />
    </>
  )
}
