'use server'

import { signOut } from '@/server/auth/auth.server'

export async function logoutAction() {
  'use server'
  await signOut()
}
