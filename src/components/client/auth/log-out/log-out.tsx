'use client'
import { FormEvent } from 'react'
import { logoutAction } from '@/server/auth/logoutAction.server'
import { redirect } from 'next/navigation'
import { IoIosLogOut } from 'react-icons/io'
import { useStore } from '@/store/user'
import { projectStore } from '@/store/project'
import { teamStore } from '@/store/team'

export default function LogOut() {
  const clearUserData = useStore((state) => state.clearUser)
  const clearProjectData = projectStore((state) => state.clearProjects)
  const clearTeamData = teamStore((state) => state.clearTeam)

  const handleLogout = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await logoutAction()
    clearUserData()
    clearProjectData()
    clearTeamData()
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
