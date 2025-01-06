'use server'
import { connectToDb } from '@/server/connectToDb'
import { Project } from '@/server/project/project-scheme.server'

interface UpdateProjectUserData {
  teams: {
    rating: number
    percentageWorkProject: number
  }
}

export const updateProjectUser = async (
  userId: string,
  projectId: string,
  data: UpdateProjectUserData,
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
    return { success: false, message: error, updatedProject: null }
  }
}
