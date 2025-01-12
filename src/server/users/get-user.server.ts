'use server'
import { unstable_noStore as noStore } from 'next/cache'
import { connectToDb } from '@/server/connectToDb'
import { User } from '@/server/users/user-schema.server'

export const getUser = async (email: string) => {
  'use server'
  noStore()
  try {
    await connectToDb()
    const user = await User.findOne({ email: email }).lean<IUser | null>()

    if (!user) return { success: false, error: 'User not found', user: null }

    return {
      success: true,
      user: user,
    }
  } catch (err) {
    return { success: false, error: err, user: null }
  }
}
