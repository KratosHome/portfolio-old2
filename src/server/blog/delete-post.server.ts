'use server'
import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/blog/blog-schema'

export const deletePostServer = async (postId: string) => {
  try {
    await connectToDb()

    const post = await Post.findById(postId)

    if (!post) {
      return { success: false, message: 'Post not found' }
    }

    await Post.deleteOne({ _id: postId })

    return { success: true }
  } catch (err) {
    return { success: false, message: err }
  }
}
