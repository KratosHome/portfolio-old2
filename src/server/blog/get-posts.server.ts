import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/blog/blog-schema'
import { User } from '@/server/users/user-schema'

export const getPosts = async (
  local: string,
  page: number = 1,
  limit: number = 10,
) => {
  try {
    await connectToDb()
    const skip = (page - 1) * limit

    const posts = await Post.find({ local: local }).skip(skip).limit(limit)
    const totalPosts = await Post.countDocuments({ local: local })

    const totalPages = Math.ceil(totalPosts / limit)

    const postsWithUserDetails = await Promise.all(
      posts.map(async (post) => {
        const user = await User.findById(post.authorId).select(
          'username userLogo',
        )
        return {
          ...post.toObject(),
          authorUsername: user?.username,
          authorUserLogo: user?.userLogo,
        }
      }),
    )

    return {
      success: true,
      posts: postsWithUserDetails,
      currentPage: page,
      totalPages,
    }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
