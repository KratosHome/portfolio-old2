'use server'
import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/blog/blog-schema'

export const publicPost = async (postId: any, isPublished: boolean) => {
  try {
    await connectToDb()

    const result = await Post.updateMany(
      { postId: postId },
      { $set: { isPublished: isPublished } },
    )

    return { success: result.modifiedCount > 0 }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
