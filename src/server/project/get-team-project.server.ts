'use server'
import { unstable_noStore as noStore } from 'next/cache'
import { connectToDb } from '@/server/connectToDb'
import { Project } from '@/server/project/project-scheme.server'
import { User } from '@/server/users/user-schema.server'

export const getTeamProject = async (userId: string) => {
  noStore()
  try {
    await connectToDb()

    const projects = await Project.find({
      teams: {
        $elemMatch: { userId: userId },
      },
    }).lean<IProject[]>()

    const projectsWithUsers = await Promise.all(
      projects.map(async (project: IProject) => {
        const userIds = project.teams.map((teamMember) => teamMember.userId)

        const teamUsers = await User.find({ _id: { $in: userIds } })
          .select('-password -isEmailVerifiedToken -isEmailVerified -isAdmin')
          .lean<IUser[]>()

        const newUsersList = await User.find({ _id: { $in: project.newUsers } })
          .select('-password -isEmailVerifiedToken -isEmailVerified -isAdmin')
          .lean()

        const teamUsersWithRoles = teamUsers.map((user) => {
          const teamInfo = project.teams.find(
            (teamMember) => teamMember.userId === user._id.toString(),
          )
          return {
            ...user,
            role: teamInfo?.role || null,
            rating2: teamInfo?.rating || 0,
            percentageWorkProject: teamInfo?.percentageWorkProject || 0,
            isDeleted: teamInfo?.isDeleted || false,
            deletedAt: teamInfo?.deletedAt || null,
          }
        })

        return {
          _id: project._id,
          name: project.name,
          team: teamUsersWithRoles,
          newUsers: newUsersList,
        }
      }),
    )

    return {
      success: true,
      team: projectsWithUsers,
    }
  } catch (err) {
    return { success: false, message: err, team: [] }
  }
}
