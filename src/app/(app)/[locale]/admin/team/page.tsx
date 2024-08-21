'use client'

import { teamStore } from '@/store/team'
import { useEffect, useState } from 'react'
import { ProjectItem } from '@/components/admin/project-item/project-item'
import { TeamItem } from '@/components/admin/team-item/team-item'

const Page = () => {
  const [activeTab, setActiveTab] = useState('0')
  const { team } = teamStore() // Цей рядок має бути всередині компонента

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  useEffect(() => {
    setActiveTab(team[0]?._id)
  }, [team])

  return (
    <div className="h-full">
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
            activeTab === item._id && <TeamItem key={item._id} item={item} />,
        )}
      </div>
    </div>
  )
}

export default Page
