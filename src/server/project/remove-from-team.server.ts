'use server'
import { connectToDb } from '@/server/connectToDb'
import { Project } from '@/server/project/project-scheme.server'
import { User } from '@/server/users/user-schema.server'

export const removeFromTeamServer = async (
  userId: string,
  projectId: string,
) => {
  try {
    await connectToDb()

    const project = await Project.findById(projectId)
    if (!project) return { success: false, message: 'Проект не знайдено' }

    project.teams = project.teams.filter(
      (item: ITeamMember) => item.userId !== userId,
    )
    await project.save()

    const user = await User.findById(userId)
    if (!user) return { success: false, message: 'Користувача не знайдено' }

    user.projects = user.projects.filter(
      (project: IProject) => project._id !== projectId,
    )
    await user.save()

    return { success: true }
  } catch (error) {
    return { success: false, message: error }
  }
}
