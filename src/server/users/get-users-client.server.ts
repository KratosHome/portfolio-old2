import { unstable_noStore as noStore } from 'next/cache'
import { connectToDb } from '@/server/connectToDb'
import { User } from '@/server/users/user-schema.server'
import { Project } from '@/server/project/project-scheme.server' // Додано імпорт Project

interface IFormattedData {
  id: string
  label: string
}

interface IUserQuery {
  isPublic: boolean
  technologies?: { $in: string[] }
  workExperience?: { $in: string[] }
}

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

    const formattedWorkExperience: IFormattedData[] = uniqueWorkExperience.map(
      (exp) => ({
        id: exp,
        label:
          typeof exp === 'string'
            ? `${exp.charAt(0).toUpperCase() + exp.slice(1)}`
            : String(exp),
      }),
    )

    const formattedTechnologies: IFormattedData[] = uniqueTechnologies.map(
      (tech) => ({
        id: tech,
        label:
          typeof tech === 'string'
            ? `${tech.charAt(0).toUpperCase() + tech.slice(1)}`
            : String(tech),
      }),
    )

    const skip = (page - 1) * limit

    const query: IUserQuery = { isPublic }

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
    return {
      success: false,
      message: err,
      technologies: [],
      workExperience: [],
      users: [],
      totalUsers: 0,
      totalPages: 0,
      currentPage: 0,
      perPage: 0,
    }
  }
}
