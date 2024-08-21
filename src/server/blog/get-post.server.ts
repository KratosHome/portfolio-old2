import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/blog/blog-schema'
import { User } from '@/server/users/user-schema.server'

export const getPost = async (url: any, local: string) => {
  try {
    await connectToDb()
    const post = await Post.find({ url: `${url}-${local}`, local: local })
    const user = await User.findById(post[0].authorId).select(
      'username userLogo',
    )

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
