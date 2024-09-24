import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/blog/blog-schema'
import { User } from '@/server/users/user-schema.server'

export const getPost = async (url: any, local: string) => {
  try {
    await connectToDb()

    const post = await Post.findOne({ url: `${url}-${local}`, local: local })
    if (!post) {
      return { success: false, message: 'Post not found' }
    }
    post.read += 1
    await post.save()

    const user = await User.findById(post.authorId).select('username userLogo')

    return {
      success: true,
      post,
      user,
    }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
