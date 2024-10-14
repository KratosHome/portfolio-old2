import { Reviews } from './reviewsSchema'
import { connectToDb } from '../connectToDb'

export const fetchReviews = async () => {
  try {
    await connectToDb()
    return await Reviews.find({ isPublic: true }).lean()
  } catch (error) {
    throw new Error('fetchReviews:' + error)
  }
}
