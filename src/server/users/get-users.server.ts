'use server'
import { unstable_noStore as noStore } from 'next/cache'
import { connectToDb } from '@/server/connectToDb'
import { User } from '@/server/users/user-schema'

export const getUser = async (email: any) => {
  noStore()
  try {
    await connectToDb()
    const user = await User.findOne({ email: email.toLowerCase() })

    return {
      success: true,
      user,
    }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
