'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { projectStore } from '@/store/project'
import { ProjectItem } from '@/components/admin/project-item/project-item'
import { useStore } from '@/store/user'

const Page = () => {
  const { user } = useStore()
  const { projects } = projectStore()

  const isInProject = projects.length > 0

  const [activeTab, setActiveTab] = useState('0')

  useEffect(() => {
    if (projects.length) {
      setActiveTab(projects[0]._id)
    }
  }, [projects])

  return (
    <div className="px-2">
      <h1 className="text-center text-[50px] font-light">Проєкт</h1>
      <button
        className={`rounded px-4 py-2 ${activeTab === 'створити-проєкт' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
        onClick={() => setActiveTab('створити-проєкт')}
      >
        Створити проєкт
      </button>
      {activeTab === 'створити-проєкт' && (
        <ProjectItem project={[]} isCrate={true} />
      )}
      {projects.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="text-2xl">
            Доєднайтесь до проєкту що б побачити проєкти
          </h1>
          <Link href={'/mentoring'} className="text-2xl text-blue-700">
            доєднатись
          </Link>
        </div>
      )}
      {user.isEmailVerified && (
        <>
          {isInProject && (
            <div className="h-full px-8">
              <div className="my-4 flex space-x-4">
                {projects.map((project) => (
                  <button
                    key={project._id}
                    className={`rounded px-4 py-2 ${activeTab === project._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                    onClick={() => setActiveTab(project._id)}
                  >
                    {project.name}
                  </button>
                ))}
              </div>
              {projects.map(
                (project) =>
                  activeTab === project._id && (
                    <ProjectItem key={project._id} project={project} />
                  ),
              )}
              {activeTab === 'створити-проєкт' && (
                <ProjectItem project={[]} isCrate={true} />
              )}
            </div>
          )}
        </>
      )}
      {!user.isEmailVerified && (
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Підтвердіть пошту</h1>
          <p>Для перегляду проєктів підтвердіть свій імейл</p>
          <Link href={'/admin/user'} className="text-blue-700">
            перейти до профайлу
          </Link>
        </div>
      )}
    </div>
  )
}

export default Page
