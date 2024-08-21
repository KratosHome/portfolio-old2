'use server'
import { unstable_noStore as noStore } from 'next/cache'
import { connectToDb } from '@/server/connectToDb'
import { Project } from '@/server/project/project-scheme.server'
import { User } from '@/server/users/user-schema'

export const getTeamProject = async (userId: string) => {
  noStore()
  try {
    await connectToDb()

    const projects = await Project.find({ team: { $in: [userId] } }).lean()

    const projectsWithUsers = await Promise.all(
      projects.map(async (project) => {
        const teamUsers = await User.find({ _id: { $in: project.team } })
          .select('-password -isEmailVerifiedToken -isEmailVerified -isAdmin')
          .lean()

        const newUsersList = await User.find({ _id: { $in: project.newUsers } })
          .select('-password -isEmailVerifiedToken -isEmailVerified -isAdmin')
          .lean()

        return {
          _id: project._id,
          name: project.name,
          team: teamUsers,
          newUsers: newUsersList,
        }
      }),
    )

    return {
      success: true,
      team: projectsWithUsers,
    }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
