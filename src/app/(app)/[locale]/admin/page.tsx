import { auth } from '@/server/auth/auth.server'
import { redirect } from 'next/navigation'

export default async function Page({ params: { locale } }: PageProps) {
  const session = await auth()

  if (session === null) {
    redirect(`/${locale}`)
  }
  return <main>admin</main>
}
