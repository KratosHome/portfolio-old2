import { FormEvent } from 'react'
import { logoutAction } from '@/server/auth/logoutAction.server'
import { redirect } from 'next/navigation'
import { IoIosLogOut } from 'react-icons/io'

export default function LogOut() {
  const handleLogout = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await logoutAction()
    redirect('/')
  }

  return (
    <form onSubmit={handleLogout}>
      <button>
        <IoIosLogOut className="size-12 duration-300 ease-in-out hover:scale-105 hover:text-blue-500" />
      </button>
    </form>
  )
}
