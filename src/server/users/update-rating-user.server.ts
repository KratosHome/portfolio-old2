'use server'
import { connectToDb } from '@/server/connectToDb'
import { User } from '@/server/users/user-schema.server'

export const updateRatingUsers = async (
  userId: string,
  sendData: {
    rating: number
    projects: { id: string; percentageWorkProject: number }
  },
) => {
  'use server'
  try {
    await connectToDb()
    const user = await User.findById(userId)

    if (!user) return { success: false, message: 'User not found' }

    user.rating = sendData.rating

    const project = user.projects.find(
      (project: any) => project.id.toString() === sendData.projects.id,
    )

    if (project) {
      project.percentageWorkProject = sendData.projects.percentageWorkProject
    } else {
      return { success: false, message: 'Project not found' }
    }

    await user.save()

    return { success: true }
  } catch (err) {
    console.log('err updateRatingUsers', err)
    return { success: false }
  }
}
