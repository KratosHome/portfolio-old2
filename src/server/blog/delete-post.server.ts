'use server'
import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/blog/blog-schema'

export const deletePostServer = async (postId: any) => {
  // Виправлено назву функції
  try {
    await connectToDb()

    const post = await Post.findById(postId)
    console.log(post)

    if (!post) {
      return { success: false, message: 'Post not found' }
    }

    await Post.deleteOne({ _id: postId })

    return { success: true }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
