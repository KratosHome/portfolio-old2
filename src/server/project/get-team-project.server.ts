'use server'
import { unstable_noStore as noStore } from 'next/cache'
import { connectToDb } from '@/server/connectToDb'
import { Project } from '@/server/project/project-scheme.server'
import { User } from '@/server/users/user-schema.server'

export const getTeamProject = async (userId: string) => {
  noStore()
  try {
    await connectToDb()

    const projects: any = await Project.find({ team: { $in: [userId] } }).lean()

    const projectsWithUsers = await Promise.all(
      projects.map(async (project: any) => {
        const teamUsers: any = await User.find({ _id: { $in: project.team } })
          .select('-password -isEmailVerifiedToken -isEmailVerified -isAdmin')
          .lean()

        const newUsersList = await User.find({ _id: { $in: project.newUsers } })
          .select('-password -isEmailVerifiedToken -isEmailVerified -isAdmin')
          .lean()

        const teamUsersWithRoles = teamUsers.map((user: any) => {
          const teamInfo = project.teams.find(
            (teamMember: any) => teamMember.userId === user._id.toString(),
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
    console.log(err)
    return { success: false }
  }
}
