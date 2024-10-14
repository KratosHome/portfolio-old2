'use server'
import { unstable_noStore as noStore } from 'next/cache'
import { connectToDb } from '@/server/connectToDb'
import { Project } from '@/server/project/project-scheme.server'

export const joinProjects = async (idProject: string, idUser: string) => {
  'use server'
  noStore()
  try {
    await connectToDb()

    const project = await Project.findById(idProject)
    console.log('vsdfvsdfvsdfvdfs', project.newUsers)
    if (!project) return { success: false, message: 'Project not found' }

    if (project.newUsers.includes(idUser)) return { success: false }

    project.newUsers.push(idUser)
    await project.save()

    return {
      success: true,
    }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
