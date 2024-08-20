'use server'
import { unstable_noStore as noStore } from 'next/cache'
import { connectToDb } from '@/server/connectToDb'
import { Project } from '@/server/project/project-scheme.server'

export const getProjects = async () => {
  'use server'
  noStore()
  try {
    await connectToDb()

    const projects = await Project.find({ isPublic: true }).lean()

    return {
      success: true,
      projects,
    }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
