import { unstable_noStore as noStore } from 'next/cache'
import { connectToDb } from '@/server/connectToDb'
import { Project } from '@/server/project/project-scheme.server'
import { User } from '@/server/users/user-schema.server'

export const getProjects = async (
  page: number = 1,
  limit: number = 10,
  isPublic: boolean = true,
  technologies: any = [],
) => {
  'use server'
  noStore()
  try {
    await connectToDb()

    const uniqueTechnologies = await Project.distinct('technologies')

    const formattedTechnologies = uniqueTechnologies.map(
      (technology: string) => ({
        id: technology,
        label: `${technology.charAt(0).toUpperCase() + technology.slice(1)}`,
      }),
    )

    let query: any = { isPublic }

    if (technologies.length > 0) {
      let resultFilters: string[] = []

      if (typeof technologies === 'string') {
        resultFilters = technologies.split(',')
      } else if (Array.isArray(technologies)) {
        resultFilters = technologies
      }

      query.technologies = { $in: resultFilters }
    }

    const totalPosts = await Project.countDocuments(query)
    const totalPages = Math.ceil(totalPosts / limit)

    const projects = await Project.find(query)
      .lean()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)

    const updatedProjects = await Promise.all(
      projects.map(async (project: any) => {
        if (!project.teams || !Array.isArray(project.teams)) {
          project.teams = []
        }

        const updatedTeams = await Promise.all(
          project.teams.map(async (team: any) => {
            if (team.userId) {
              const user = await User.findOne({ _id: team.userId }).lean()
              return { ...team, user }
            }
            return team
          }),
        )
        project.teams = updatedTeams
        return project
      }),
    )

    return {
      success: true,
      projects: updatedProjects,
      currentPage: page,
      technologies: formattedTechnologies,
      totalPages: totalPages,
    }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
