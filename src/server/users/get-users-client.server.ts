import { unstable_noStore as noStore } from 'next/cache'
import { connectToDb } from '@/server/connectToDb'
import { User } from '@/server/users/user-schema.server'
import { Project } from '@/server/project/project-scheme.server' // Додано імпорт Project

export const getUserClient = async (
  isPublic: boolean,
  page = 1,
  limit = 10,
  technologies: string = '',
  workExperience: string = '',
) => {
  noStore()
  try {
    await connectToDb()

    const uniqueTechnologies = await User.distinct('technologies')
    const uniqueWorkExperience = await User.distinct('workExperience')

    const formattedWorkExperience = uniqueWorkExperience.map((exp: any) => ({
      id: exp,
      label:
        typeof exp === 'string'
          ? `${exp.charAt(0).toUpperCase() + exp.slice(1)}`
          : String(exp),
    }))

    const formattedTechnologies = uniqueTechnologies.map((tech: any) => ({
      id: tech,
      label:
        typeof tech === 'string'
          ? `${tech.charAt(0).toUpperCase() + tech.slice(1)}`
          : String(tech),
    }))

    const skip = (page - 1) * limit

    let query: any = { isPublic }

    if (technologies.length > 0) {
      const resultFilters = technologies.split(',')
      query.technologies = { $in: resultFilters }
    }

    if (workExperience.length > 0) {
      const resultFilters = workExperience.split(',')
      query.workExperience = { $in: resultFilters }
    }

    const users = await User.find(query).skip(skip).limit(limit).lean()

    const usersWithProjects = await Promise.all(
      users.map(async (user) => {
        const projects = await Project.find({ 'teams.userId': user._id }).lean()
        return {
          ...user,
          projects,
        }
      }),
    )

    const totalUsers = await User.countDocuments(query)
    const totalPages = Math.ceil(totalUsers / limit)

    return {
      success: true,
      technologies: formattedTechnologies,
      workExperience: +formattedWorkExperience,
      users: usersWithProjects,
      totalUsers,
      totalPages,
      currentPage: page,
      perPage: limit,
    }
  } catch (err) {
    console.error('Помилка:', err)
    return { success: false }
  }
}
