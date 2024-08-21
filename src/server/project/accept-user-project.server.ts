'use server'
import { unstable_noStore as noStore } from 'next/cache'
import { connectToDb } from '@/server/connectToDb'
import { Project } from '@/server/project/project-scheme.server'
import { User } from '@/server/users/user-schema.server'

export const acceptUserProject = async (projectId: string, userId: string) => {
  noStore()
  try {
    await connectToDb()

    const project = await Project.findById(projectId)

    if (!project) return { success: false, message: 'Проект не знайдено' }

    project.newUsers = project.newUsers.filter((id: string) => id !== userId)

    if (!project.team.includes(userId)) project.team.push(userId)

    const user = await User.findById(userId)

    user.projects.push({
      id: projectId,
      percentageWorkProject: 0,
    })

    await project.save()

    return { success: true }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
