import { ButtonBeck } from '@/components/UI/button-beck/button-beck'
import { getProjects } from '@/server/project/get-projects.server'

import { ProjectItem } from '@/components/client/project-item/project-item'

const Page = async () => {
  const data: any = await getProjects()

  return (
    <div className="mx-auto max-w-[1442px] px-[24px]">
      <h1 className="">
        This page showcases projects that are currently in development. You can
        explore the progress of these projects, and if you're interested,
        there's an opportunity to join the project team and contribute.
      </h1>
      {data.projects.map((project: ProjectTypes, index: number) => (
        <ProjectItem key={project._id} project={project} index={index} />
      ))}
    </div>
  )
}

export default Page
