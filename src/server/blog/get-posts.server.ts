import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/blog/blog-schema'

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

    return {
      success: true,
      posts,
      currentPage: page,
      totalPages,
    }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
