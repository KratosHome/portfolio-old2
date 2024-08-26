'use server'
import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/blog/blog-schema'
import { User } from '@/server/users/user-schema.server'

export const getAllPosts = async (locale: string) => {
  try {
    await connectToDb()

    const posts = await Post.find({ local: locale }).sort({ isPublished: 1 })

    const postsWithUserDetails = await Promise.all(
      posts.map(async (post) => {
        const user = await User.findById(post.authorId).select(
          'username userLogo',
        )
        return {
          ...post.toObject(),
          authorId: user?._id,
          authorUsername: user?.username,
          authorUserLogo: user?.userLogo,
        }
      }),
    )

    return {
      success: true,
      posts: postsWithUserDetails,
    }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
