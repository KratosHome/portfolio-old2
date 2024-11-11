import { getProjects } from '@/server/project/get-projects.server'
import { ProjectItem } from '@/components/client/project-item/project-item'
import { getTranslations } from 'next-intl/server'
import { Pagination } from '@/components/UI/client/pagination/pagination'
import { FilterItems } from '@/components/UI/client/filter-items/filter-items'

export default async function Page({ searchParams }: { searchParams: any }) {
  const { page } = searchParams
  console.log('page', page)

  const t = await getTranslations('projects-client')
  const technologies = searchParams['technologies']

  const data: any = await getProjects(1, 5, true, technologies)
  const totalPages = data.totalPages

  return (
    <>
      <div className="flex justify-end">
        <h1 className="mt-[70px] text-right text-[#0B66F5] lg:w-[70%]">
          {t('h1')}
        </h1>
      </div>
      <div className="mt-[136px]">
        <div className="flex flex-wrap sm:gap-9">
          <FilterItems
            title={t('All technologies')}
            url={'technologies'}
            filters={data.technologies}
          />
        </div>
        {data.projects.map((project: IProject, index: number) => (
          <ProjectItem key={project._id} project={project} index={index} />
        ))}
        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}
