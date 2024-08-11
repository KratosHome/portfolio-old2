import { auth } from '@/server/auth/auth'
import { redirect } from 'next/navigation'

export default async function Page({ params: { locale } }: PageProps) {
  const session = await auth()

  /*
  if (session === null) {
    redirect(`/${locale}`)
  }
 */
  return <main>admin</main>
}
