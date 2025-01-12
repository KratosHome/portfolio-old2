'use server'
import { signIn } from '@/server/auth/auth.server'

export const loginAction = async (data: {
  email: string
  password: string
}) => {
  try {
    await signIn('credentials', {
      email: data.email.toLowerCase(),
      password: data.password,
      redirect: false,
    })

    return {
      success: true,
      error: false,
    }
  } catch (err) {
    return { error: true, success: false, message: err }
  }
}
