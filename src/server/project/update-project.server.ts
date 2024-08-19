'use server'
import { connectToDb } from '@/server/connectToDb'
import { Project } from '@/server/project/project-scheme.server'

export const updateProject = async (formData: any) => {
  try {
    await connectToDb()
    const id = formData.get('id')
    const username = formData.get('username')

    const updatedData = {
      username,
    }
    const user = await Project.findByIdAndUpdate(id, updatedData)
    if (!user) return { success: false }

    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
