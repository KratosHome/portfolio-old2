'use server'
import { connectToDb } from '@/server/connectToDb'
import { User } from '@/server/users/user-schema'

export const updateUser = async (id: string, sendData: any) => {
  try {
    await connectToDb()

    console.log('id', id)
    console.log('sendData', sendData)
    const user = await User.findByIdAndUpdate(id, sendData, { new: true })
    console.log('user', user)
    if (!user) return { success: false }

    return { success: true }
  } catch (error) {
    console.error('Error updating user:', error)
    return { success: false }
  }
}
