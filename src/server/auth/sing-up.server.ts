'use server'
import bcrypt from 'bcryptjs'
import { connectToDb } from '@/server/connectToDb'
import { User } from '@/server/users/user-schema.server'

interface singUpData {
  username: string
  email: string
  password: string
  passwordRepeat: string
}

export const singUp = async (data: singUpData) => {
  try {
    await connectToDb()
    const { username, email, password, passwordRepeat } = data
    if (password !== passwordRepeat)
      return { success: false, message: 'password not alowd' }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'user',
    })

    await newUser.save()

    return {
      success: true,
    }
  } catch (e) {
    console.error('Error saving user:', e)
    return { success: false, message: 'Sumsing went wrong singUp' }
  }
}
