'use server'
import { connectToDb } from '@/server/connectToDb'
import { Project } from '@/server/project/project-scheme.server'

export const updateProject = async (id: string, data: IProject) => {
  try {
    await connectToDb()

    const user = await Project.findByIdAndUpdate(id, data)
    if (!user) return { success: false }

    return { success: true }
  } catch (error) {
    return { success: false, message: error }
  }
}
