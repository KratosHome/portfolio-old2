'use server'
import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/blog/blog-schema'
import { revalidatePath } from 'next/cache'
import cloudinary from '@/server/cloudinaryConfig'

export const updatePostServer = async ({ postId, data, image }: any) => {
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

    console.log('postId', postId)

    const updatedPosts = await Promise.all(
      Object.entries(data).map(
        async ([local, localizedData]: [string, any]) => {
          if (typeof localizedData !== 'object' || localizedData === null) {
            throw new Error(`Invalid data for locale ${local}`)
          }
          console.log('locale', local)
          const updateData = {
            ...localizedData,
            img: imageUrl || localizedData.img,
          }
          console.log('updateData', updateData)

          const updatedPost = await Post.findOneAndUpdate(
            { postId, local },
            updateData,
            { new: true },
          )
          console.log('updatedPost', updatedPost)

          return updatedPost
        },
      ),
    )
    console.log('postId', postId)

    console.log('updatedPosts', updatedPosts)
    if (updatedPosts.length === Object.keys(data).length) {
      revalidatePath('/blog')
      revalidatePath('/admin')
    }

    return { success: true }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
