'use server'
import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/blog/blog-schema'
import { revalidatePath } from 'next/cache'
import { v4 as uuidv4 } from 'uuid'
import cloudinary from '@/server/cloudinaryConfig'

export const createPostServer = async (data: IPost, image: string) => {
  'use server'

  try {
    await connectToDb()
    const postId = uuidv4()
    let imageUrl = ''

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: 'posts222',
      })

      imageUrl = uploadResponse.secure_url
    }

    const savedPosts = await Promise.all(
      Object.entries(data).map(async ([locale, localizedData]) => {
        if (typeof localizedData !== 'object' || localizedData === null) {
          throw new Error(`Invalid data for locale ${locale}`)
        }

        const newPost = {
          ...localizedData,
          postId,
          img: imageUrl,
        }

        const savedPost = await new Post(newPost).save()

        return savedPost
      }),
    )

    if (savedPosts.length === Object.keys(data).length) {
      revalidatePath('/blog')
      revalidatePath('/admin')
    }

    return { success: true }
  } catch (err) {
    return { success: false, message: err }
  }
}
