'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { projectStore } from '@/store/project'
import { ProjectItem } from '@/components/admin/project-item/project-item'
import { useStore } from '@/store/user'

const Page = () => {
  const t = useTranslations('footer')
  const { user } = useStore()
  const { projects } = projectStore()

  const isInProject = projects.length > 0
  const isSuperAdmin = user.isAdmin

  const [activeTab, setActiveTab] = useState('0')

  useEffect(() => {
    if (projects.length) {
      setActiveTab(projects[0]._id)
    }
  }, [projects])

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  return (
    <div className="h-full">
      {isInProject ? (
        <div className="h-full px-8">
          <div className="my-4 flex space-x-4">
            {projects.map((project) => (
              <button
                key={project._id}
                className={`rounded px-4 py-2 ${activeTab === project._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                onClick={() => handleTabChange(project._id)}
              >
                {project.name}
              </button>
            ))}
            <button
              className={`rounded px-4 py-2 ${activeTab === 'створити-проєкт' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
              onClick={() => handleTabChange('створити-проєкт')}
            >
              Створити проєкт
            </button>
          </div>
          <h1 className="text-center text-[50px] font-light">Проєкт</h1>
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
      ) : (
        <>
          <div>
            <h1>Ви не доєднані до жодного проекту</h1>
            <Link href="/mentoring">Доєднатись до проєкту</Link>
          </div>
          {activeTab === 'створити-проєкт' && (
            <ProjectItem project={[]} isCrate={true} />
          )}
        </>
      )}
    </div>
  )
}

export default Page
