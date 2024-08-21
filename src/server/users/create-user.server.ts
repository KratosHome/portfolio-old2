'use server'
import { connectToDb } from '@/server/connectToDb'
import { User } from '@/server/users/user-schema.server'

export const createUsers = async (session: any) => {
  'use server'
  try {
    await connectToDb()
    const user = await User.findOne({ email: session.user.email.toLowerCase() })
    if (!user) {
      const newUser = new User({
        username: session.user.name,
        email: session.user.email.toLowerCase(),
        userLogo: session.user.image,
        isEmailVerified: true,
        role: 'user',
      })

      console.log('newUser', newUser)
      await newUser.save()
      return { success: true }
    }
  } catch (err) {
    console.log('err createUsers', err)
    return { success: false }
  }
}
