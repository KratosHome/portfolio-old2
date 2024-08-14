'use server'
import { signIn } from '@/server/auth/auth.server'
import { connectToDb } from '@/server/connectToDb'

export const loginGitHubAction = async () => {
  await signIn('gitHub')
}
