'use server'
import { signIn } from '@/server/auth/auth.server'

export const loginGitHubAction = async () => {
  await signIn('gitHub')
}
