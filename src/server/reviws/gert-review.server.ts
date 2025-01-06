'use server'
import { connectToDb } from '@/server/connectToDb'
import { Reviews } from '@/server/reviws/reviewsSchema'

export const getReviewAction = async () => {
  try {
    await connectToDb()
    const reviews = await Reviews.find({ isPublic: true }).lean()

    return {
      success: true,
      reviews: reviews,
    }
  } catch (error) {
    return {
      success: false,
      message: error,
      reviews: [],
    }
  }
}
