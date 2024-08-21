'use client'

import { teamStore } from '@/store/team'
import { useEffect, useState } from 'react'
import { TeamItem } from '@/components/admin/team-item/team-item'
import { useStore } from '@/store/user'
import Link from 'next/link'

const Page = () => {
  const [activeTab, setActiveTab] = useState('0')
  const { team } = teamStore()
  const { user } = useStore()

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  useEffect(() => {
    setActiveTab(team[0]?._id)
  }, [team])

  return (
    <div className="h-full">
      {team.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="text-2xl">
            Доєднайтесь до проєкту що б побачити команду
          </h1>
          <Link href={'/mentoring'} className="text-2xl text-blue-700">
            доєднатись
          </Link>
        </div>
      )}
      {user.isEmailVerified && (
        <>
          <div className="my-4 flex space-x-4">
            {team.map((project) => (
              <button
                key={project._id}
                className={`rounded px-4 py-2 ${activeTab === project._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                onClick={() => handleTabChange(project._id)}
              >
                {project.name}
              </button>
            ))}
          </div>
          <div>
            {team.map(
              (item) =>
                activeTab === item._id && (
                  <TeamItem key={item._id} item={item} />
                ),
            )}
          </div>
        </>
      )}
      {!user.isEmailVerified && (
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Підтвердіть пошту</h1>
          <p>Для перегляду команди підтвердіть свій імейл</p>
          <Link href={'/admin/user'} className="text-blue-700">
            перейти до профайлу
          </Link>
        </div>
      )}
    </div>
  )
}

export default Page
