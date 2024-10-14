import { auth } from '@/server/auth/auth.server'
import { redirect } from 'next/navigation'
import { SignUp } from '@/components/client/auth/sign-up/sign-up'

export default async function page({ params: { locale } }: PageProps) {
  const session = await auth()

  return (
    <>
      <SignUp />
    </>
  )
}
