'use server'
import { unstable_noStore as noStore } from 'next/cache'
import { connectToDb } from '@/server/connectToDb'
import { User } from '@/server/users/user-schema.server'

export const getUser = async (id: string) => {
  'use server'
  noStore()
  try {
    await connectToDb()
    const user = await User.findOne({ email: id })

    return {
      success: true,
      user,
    }
  } catch (err) {
    return { success: false, error: err }
  }
}
