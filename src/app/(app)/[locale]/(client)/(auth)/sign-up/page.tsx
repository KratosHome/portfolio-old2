import { auth } from '@/server/auth/auth.server'
import { redirect } from 'next/navigation'
import { SignUp } from '@/components/auth/sign-up/sign-up'

export default async function page({ params: { locale } }: PageProps) {
  const session = await auth()

  if (session?.user) {
    redirect(`/${locale}/admin`)
  }
  return (
    <>
      <SignUp />
    </>
  )
}
