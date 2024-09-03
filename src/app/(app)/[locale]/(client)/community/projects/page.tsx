import { ButtonBeck } from '@/components/UI/button-beck/button-beck'
import { getProjects } from '@/server/project/get-projects.server'

import { ProjectItem } from '@/components/client/project-item/project-item'

const Page = async () => {
  const data: any = await getProjects()

  return (
    <div className="mx-auto max-w-[1442px] px-[24px]">
      <div className="flex justify-end">
        <h1 className="mt-[70px] text-right text-[#0B66F5] lg:w-[70%]">
          This page showcases projects that are currently in development. You
          can explore the progress of these projects, and if you're interested,
          there's an opportunity to join the project team and contribute.
        </h1>
      </div>
      <div className="mt-[136px]">
        {data.projects.map((project: ProjectTypes, index: number) => (
          <ProjectItem key={project._id} project={project} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Page
