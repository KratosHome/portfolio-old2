'use server'
import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/blog/blog-schema'

export const publicPost = async (postId: IPost, isPublished: boolean) => {
  try {
    await connectToDb()

    const result = await Post.updateMany(
      { postId: postId },
      { $set: { isPublished: isPublished } },
    )

    return { success: result.modifiedCount > 0 }
  } catch (err) {
    return { success: false, message: err }
  }
}
