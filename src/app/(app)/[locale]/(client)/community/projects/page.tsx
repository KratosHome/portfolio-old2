import { ButtonBeck } from '@/components/UI/button-beck/button-beck'
import { getProjects } from '@/server/project/get-projects.server'

import { ProjectItem } from '@/components/client/project-item/project-item'
import { FilterItems } from '@/components/filter-items/filter-items'
import { getTranslations } from 'next-intl/server'

const Page = async () => {
  const t = await getTranslations('post-client')

  const data: any = await getProjects(true)

  return (
    <div>
      <div className="flex justify-end">
        <h1 className="mt-[70px] text-right text-[#0B66F5] lg:w-[70%]">
          This page showcases projects that are currently in development. You
          can explore the progress of these projects, and if you&apos;re
          interested, there&apos;s an opportunity to join the project team and
          contribute.
        </h1>
      </div>
      <div className="mt-[136px]">
        <div className="flex flex-wrap sm:gap-9">
          <FilterItems
            title={t('All filters')}
            url={'technologies'}
            filters={['All filters']}
          />
          <FilterItems
            title={t('All authors')}
            url={'workExperience'}
            filters={['All authors']}
          />
        </div>
        {data.projects.map((project: ProjectTypes, index: number) => (
          <ProjectItem key={project._id} project={project} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Page
