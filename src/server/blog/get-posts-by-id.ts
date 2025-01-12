'use server'
import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/blog/blog-schema'
import { User } from '@/server/users/user-schema.server'

export const getPostsById = async (postId: string) => {
  try {
    await connectToDb()
    const post = await Post.find({ postId: postId })
    const user = await User.findById(post[0].authorId).select(
      'username userLogo',
    )

    return {
      success: true,
      post,
      user,
    }
  } catch (err) {
    return { success: false, message: err }
  }
}
