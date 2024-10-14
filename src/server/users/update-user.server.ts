'use server'
import { connectToDb } from '@/server/connectToDb'
import { User } from '@/server/users/user-schema.server'
import cloudinary from '@/server/cloudinaryConfig'

export const updateUser = async (id: string, sendData: any) => {
  try {
    await connectToDb()

    if (sendData.userLogo) {
      const uploadLogo = await cloudinary.uploader.upload(sendData.userLogo, {
        folder: 'avatars',
      })
      sendData.userLogo = uploadLogo.secure_url
    }

    const user = await User.findByIdAndUpdate(id, sendData, { new: true })
    if (!user) return { success: false }

    return { success: true }
  } catch (error) {
    console.error('Помилка при оновленні користувача:', error)
    return { success: false }
  }
}
