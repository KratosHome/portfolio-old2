'use server'
import { connectToDb } from '@/server/connectToDb'
import { Post } from '@/server/blog/blog-schema'
import { revalidatePath } from 'next/cache'
import cloudinary from '@/server/cloudinaryConfig'

export const updatePostServer = async ({ data, image }: any) => {
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
      Object.entries(data).map(
        async ([locale, localizedData]: [string, any]) => {
          if (typeof localizedData !== 'object' || localizedData === null) {
            throw new Error(`Invalid data for locale ${locale}`)
          }

          // Знаходимо пост для оновлення за postId
          const existingPost = await Post.findOne({
            postId: localizedData.postId,
            locale,
          })

          if (!existingPost) {
            throw new Error(`Post not found for locale ${locale}`)
          }

          const updatedPostData = {
            ...localizedData,
            img: imageUrl || existingPost.img, // Якщо зображення не оновлюється, залишаємо попереднє
          }

          Object.assign(existingPost, updatedPostData)
          const updatedPost = await existingPost.save()
          console.log('updatedPost', updatedPost)

          return updatedPost
        },
      ),
    )

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
