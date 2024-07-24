'use server'
import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/post/postSchema'
import { revalidatePath } from 'next/cache'
import { User } from '@/server/users/userSchema'

export const getPosts = async (
  page: string = '1',
  limit: number = 10,
  lang: string,
  userId?: string,
) => {
  'use server'
  try {
    await connectToDb()
    const matchQuery = userId
      ? { local: lang, userId: userId }
      : { isPublished: true, local: lang }
    const total = await Post.countDocuments(matchQuery)
    const totalPages = Math.ceil(total / limit)
    const startIndex = (+page - 1) * limit

    const postsQuery = [
      { $match: matchQuery },
      { $limit: limit },
      { $skip: startIndex },
      {
        $project: {
          title: 1,
          img: 1,
          userId: 1,
          local: 1,
          subTitle: 1,
          isPublished: 1,
          createdAt: 1,
          postId: 1,
          url: 1,
        },
      },
      { $addFields: { convertedUserId: { $toObjectId: '$userId' } } },
      {
        $lookup: {
          from: 'users',
          localField: 'convertedUserId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      { $unwind: '$userDetails' },
      {
        $project: {
          title: 1,
          subTitle: 1,
          img: 1,
          userId: 1,
          postId: 1,
          local: 1,
          url: 1,
          isPublished: 1,
          createdAt: 1,
          userDetails: {
            email: '$userDetails.email',
            username: '$userDetails.username',
            img: '$userDetails.img',
          },
        },
      },
    ]

    const posts = await Post.aggregate(postsQuery)

    return {
      data: posts,
      total,
      currentPage: page,
      totalPages,
    }
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch posts!')
  }
}

export const getPost = async (postId: any, local: string) => {
  try {
    await connectToDb()
    const post: any = await Post.find({ postId: postId, local: local })
    return post
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch post!')
  }
}

export const getPostByUrl = async (url: any, local: string) => {
  try {
    await connectToDb()
    const post: any = await Post.find({ url: url, local: local })
    const user = await User.find(post.userId)
      .select('email username img')
      .lean()
    const resultUser = user[0]
    const resultPost = post[0]

    return { resultPost, resultUser }
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch post!')
  }
}

export const addPost = async (formData: any) => {
  'use server'
  const { title, desc, slug, userId } = Object.fromEntries(formData)

  try {
    await connectToDb()
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    })
    await newPost.save()

    revalidatePath('/blog')
    revalidatePath('/admin')
  } catch (err) {
    console.log(err)
    return { error: 'Something went wrong!' }
  }
}

export const deletePost = async (formData: any) => {
  'use server'
  const { id } = Object.fromEntries(formData)

  try {
    await connectToDb()

    await Post.findByIdAndDelete(id)
    revalidatePath('/blog')
    revalidatePath('/admin')
  } catch (err) {
    console.log(err)
    return { error: 'Something went wrong!' }
  }
}
