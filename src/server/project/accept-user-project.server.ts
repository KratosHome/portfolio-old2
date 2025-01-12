'use server'
import { unstable_noStore as noStore } from 'next/cache'
import { connectToDb } from '@/server/connectToDb'
import { Project } from '@/server/project/project-scheme.server'

export const acceptUserProject = async (projectId: string, userId: string) => {
  noStore()
  try {
    await connectToDb()

    const project = await Project.findById(projectId)
    if (!project) return { success: false, message: 'Проект не знайдено' }

    project.newUsers = project.newUsers.filter((id: string) => id !== userId)

    if (!project.teams.some((team: IProject) => team._id === userId)) {
      project.teams.push({
        userId: userId,
        role: 'member',
        rating: 0,
        percentageWorkProject: 0,
      })
    }

    await project.save()

    return { success: true }
  } catch (err) {
    return { success: false, message: err }
  }
}
