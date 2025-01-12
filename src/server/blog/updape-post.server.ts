'use server'
import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/blog/blog-schema'
import { revalidatePath } from 'next/cache'
import cloudinary from '@/server/cloudinaryConfig'

interface UpdatePostServerParams {
  postId: string
  data: IPost
  image?: string
}

export const updatePostServer = async ({
  postId,
  data,
  image,
}: UpdatePostServerParams) => {
  'use server'

  try {
    await connectToDb()
    let imageUrl = ''

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: 'posts222',
      })

      imageUrl = uploadResponse.secure_url
    }

    const updatedPosts = await Promise.all(
      Object.entries(data).map(async ([local, localizedData]) => {
        if (typeof localizedData !== 'object' || localizedData === null) {
          throw new Error(`Invalid data for locale ${local}`)
        }

        const updateData: IPost = {
          ...localizedData,
          img: imageUrl || localizedData.img,
        }

        const updatedPost: IPost | null = await Post.findOneAndUpdate(
          { postId, local },
          updateData,
          { new: true },
        )

        return updatedPost
      }),
    )

    if (updatedPosts.length === Object.keys(data).length) {
      revalidatePath('/blog')
      revalidatePath('/admin')
    }

    return { success: true }
  } catch (err) {
    return { success: false, message: err }
  }
}
