import { getUserClient } from '@/server/users/get-users-client.server'
import MembersItem from '@/components/client/members-item/members-item'
import { Pagination } from '@/components/pagination/pagination'
import { getTranslations } from 'next-intl/server'

export default async function Page({ params: { locale }, searchParams }: any) {
  const t = await getTranslations('page.users')
  const page = searchParams['page'] ?? '1'
  const users: any = await getUserClient(true, page, 10)
  const totalPages = users.totalPages

  return (
    <div>
      {users.users.map((item: any) => (
        <MembersItem item={item} key={item.id} />
      ))}
      <Pagination totalPages={totalPages} />
    </div>
  )
}
