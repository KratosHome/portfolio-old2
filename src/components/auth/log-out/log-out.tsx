import { FormEvent } from 'react'
import st from './logOut.module.scss'
import { logoutAction } from '@/server/auth/logoutAction.server'
import { redirect } from 'next/navigation'

export default function LogOut() {
  const handleLogout = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await logoutAction()
    redirect('/')
  }

  return (
    <form onSubmit={handleLogout} className={st.container}>
      <button>log out</button>
    </form>
  )
}
