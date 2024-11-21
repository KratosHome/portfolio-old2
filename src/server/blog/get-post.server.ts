import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/blog/blog-schema'
import { User } from '@/server/users/user-schema.server'

export const getPost = async (url: string, local: string) => {
  try {
    await connectToDb()

    // Знаходимо пост
    const post = await Post.findOne({ url: `${url}-${local}`, local: local })
    if (!post) {
      return { success: false, message: 'Post not found' }
    }

    const commetns = await Post.find({ postId: post.postId }).lean()
    const allComments = commetns.reduce((acc, post) => {
      return acc.concat(post.comments || [])
    }, [])

    post.read += 1
    await post.save()

    const postContent = await Post.findOne({
      url: `${url}-${local}`,
      local: local,
    }).lean()
    if (!postContent) {
      return { success: false, message: 'Post content not found' }
    }

    const user = await User.findById(post.authorId).select(
      'username userLogo linkedinLink gitHubLink',
    )

    return {
      success: true,
      post: postContent as any,
      user,
      comments: allComments,
    }
  } catch (err) {
    return {
      success: false,
      post: null,
      user: null,
      comments: [],
      message: 'Unexpected error',
    }
  }
}
