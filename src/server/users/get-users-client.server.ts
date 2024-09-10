'use server'
import { unstable_noStore as noStore } from 'next/cache'
import { connectToDb } from '@/server/connectToDb'
import { User } from '@/server/users/user-schema.server'

export const getUserClient = async (
  isPublic: boolean,
  page = 1,
  limit = 10,
) => {
  noStore()
  try {
    await connectToDb()

    const skip = (page - 1) * limit

    const users = await User.find({ isPublic }).skip(skip).limit(limit).lean()

    const totalUsers = await User.countDocuments({ isPublic })
    const totalPages = Math.ceil(totalUsers / limit)

    return {
      success: true,
      users,
      totalUsers,
      totalPages,
      currentPage: page,
      perPage: limit,
    }
  } catch (err) {
    return { success: false }
  }
}
