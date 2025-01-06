'use server'
import { unstable_noStore as noStore } from 'next/cache'
import { connectToDb } from '@/server/connectToDb'
import { Project } from '@/server/project/project-scheme.server'

export const getProject = async (userId: string) => {
  noStore()
  try {
    await connectToDb()

    const projects = await Project.find({ 'teams.userId': userId }).lean<
      IProject[]
    >()

    return {
      success: true,
      projects,
    }
  } catch (err) {
    return { success: false, projects: [], error: err }
  }
}
