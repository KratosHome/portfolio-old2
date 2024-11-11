'use server'
import { unstable_noStore as noStore } from 'next/cache'
import { connectToDb } from '@/server/connectToDb'
import { Project } from '@/server/project/project-scheme.server'

export const getProject = async (userId: string) => {
  'use server'
  noStore()
  try {
    await connectToDb()
    const projects = await Project.find({ 'teams.userId': userId }).lean()

    return {
      success: true,
      projects,
    }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
