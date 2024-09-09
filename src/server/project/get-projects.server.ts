'use server'
import { unstable_noStore as noStore } from 'next/cache'
import { connectToDb } from '@/server/connectToDb'
import { Project } from '@/server/project/project-scheme.server'
import { User } from '@/server/users/user-schema.server'

export const getProjects = async (isPublic: boolean) => {
  'use server'
  noStore()
  try {
    await connectToDb()

    const projects = await Project.find({ isPublic: isPublic }).lean()

    const updatedProjects = await Promise.all(
      projects.map(async (project) => {
        const users = await User.find({ _id: { $in: project.teams } }).lean()

        project.teams = users

        return project
      }),
    )

    return {
      success: true,
      projects: updatedProjects,
    }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
