'use server'
import { connectToDb } from '@/server/connectToDb'
import { User } from '@/server/users/user-schema'

export const updateUser = async (formData: any) => {
  try {
    await connectToDb()
    const id = formData.get('id')
    const username = formData.get('username')

    const updatedData = {
      username,
    }
    const user = await User.findByIdAndUpdate(id, updatedData)
    if (!user) return { success: false }

    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
