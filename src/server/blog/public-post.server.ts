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

    return { success: true }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
