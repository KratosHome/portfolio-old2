'use server'
import { signIn } from '@/server/auth/auth'

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
  } catch (e) {
    console.log('vfsvdfvdsfvsdfvd', e)
    return { error: true }
  }
}
