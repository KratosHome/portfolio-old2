import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/blog/blog-schema'

export const getPost = async (url: any, local: string) => {
  try {
    await connectToDb()
    const post = await Post.find({ url: url, local: local })

    return {
      success: true,
      post,
    }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
