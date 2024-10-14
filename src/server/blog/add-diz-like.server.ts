'use server'
import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/blog/blog-schema'
import { revalidatePath } from 'next/cache'

export const addDizLikeServer = async (userId: string, postId: string) => {
  'use server'
  try {
    await connectToDb()

    const post = await Post.findById(postId)
    if (!post) {
      return { success: false, message: 'Post not found' }
    }

    const userIndex = post.dizLikes.indexOf(userId)

    if (userIndex === -1) {
      post.dizLikes.push(userId)
    } else {
      post.dizLikes.splice(userIndex, 1)
    }

    await post.save()

    if (post) {
      revalidatePath('/blog')
    }

    return { success: true }
  } catch (err) {
    console.error(err)
    return { success: false }
  }
}
