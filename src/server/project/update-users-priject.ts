'use server'
import { connectToDb } from '@/server/connectToDb'
import { Project } from '@/server/project/project-scheme.server'

export const updateProjectUser = async (
  userId: string,
  projectId: string,
  data: any,
) => {
  try {
    await connectToDb()

    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId, 'teams.userId': userId },
      {
        $set: {
          'teams.$.rating': data.teams.rating,
          'teams.$.percentageWorkProject': data.teams.percentageWorkProject,
        },
      },
      { new: true },
    ).lean()

    if (!updatedProject)
      return { success: false, message: 'Project or user not found' }

    return { success: true, updatedProject }
  } catch (error) {
    console.error(error)
    return { success: false, message: '' }
  }
}
