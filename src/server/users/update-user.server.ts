'use server'
import { connectToDb } from '@/server/connectToDb'
import { User } from '@/server/users/user-schema'

export const updateUser = async (formData: any) => {
  try {
    const { id, name, email } = formData

    console.log('formData', formData)
    const updatedData = {
      name,
      email,
    }
    await connectToDb()
    const user = await User.findByIdAndUpdate(id, updatedData)
    if (!user) return { success: false }

    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
