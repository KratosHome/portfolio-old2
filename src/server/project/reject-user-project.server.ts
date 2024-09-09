'use server'
import { unstable_noStore as noStore } from 'next/cache'
import { connectToDb } from '@/server/connectToDb'
import { Project } from '@/server/project/project-scheme.server'

export const rejectUserProject = async (projectId: string, userId: string) => {
  noStore()
  try {
    await connectToDb()
    console.log('projectId', projectId)
    const project = await Project.findById(projectId)
    console.log('project', project)

    if (!project) return { success: false, message: 'Проект не знайдено' }

    project.newUsers = project.newUsers.filter((id: string) => id !== userId)

    await project.save()

    return { success: true }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
