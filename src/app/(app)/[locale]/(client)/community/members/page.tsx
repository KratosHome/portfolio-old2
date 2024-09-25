import { getUserClient } from '@/server/users/get-users-client.server'
import MembersItem from '@/components/client/members-item/members-item'
import { Pagination } from '@/components/pagination/pagination'
import { getTranslations } from 'next-intl/server'
import { FilterItems } from '@/components/filter-items/filter-items'

export default async function Page({ params: { locale }, searchParams }: any) {
  const t = await getTranslations('page.users')
  const page = searchParams['page'] ?? '1'
  const technologies = searchParams['technologies']
  const workExperience = searchParams['workExperience']
  const users: any = await getUserClient(
    true,
    page,
    10,
    technologies,
    workExperience,
  )
  const totalPages = users.totalPages

  return (
    <div>
      <div className="flex justify-end">
        <h1 className="mt-[70px] text-right text-[#0B66F5] lg:w-[70%]">
          Explore this page to meet the project participants and learn more
          about their skills, expertise, experience, and the technologies they
          use
        </h1>
      </div>
      <div className="mt-[136px]">
        <div className="flex flex-wrap sm:gap-9">
          <FilterItems
            title={t('All filters')}
            url={'technologies'}
            filters={users.technologies}
          />
          <FilterItems
            title={t('All authors')}
            url={'workExperience'}
            filters={users.workExperience}
          />
        </div>
        {users.users.map((item: any) => (
          <MembersItem item={item} key={item.id} />
        ))}
      </div>
      <div className="mt-[100px]">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
