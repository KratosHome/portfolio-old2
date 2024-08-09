'use server'
import { connectToDb } from '@/server/connectToDb'
import { Reviews } from '@/server/reviws/reviewsSchema'

export const getReviewAction = async () => {
  try {
    await connectToDb()
    const reviews = await Reviews.find({ isPublic: true }).lean()
    const convertedReviews = reviews.map((review: any) => ({
      ...review,
      _id: review._id.toString(),
    }))

    return new Response(JSON.stringify(convertedReviews), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    throw new Error('error get reviewers')
  }
}
