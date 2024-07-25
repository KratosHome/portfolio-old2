'use server'

import { signIn } from '@/server/auth/auth'

export const loginGitHubAction = async () => {
  await signIn('gitHub')
}
