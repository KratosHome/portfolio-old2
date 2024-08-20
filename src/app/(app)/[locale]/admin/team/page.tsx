'use client'

import { Donat } from '@/components/UI/donat/donat'
import { useEffect, useState } from 'react'
import { getTeamProject } from '@/server/project/get-team-project.server'
import { useStore } from '@/store/user'

const Page = () => {
  const { user } = useStore()
  const [teamProject, setTeamProject] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTeamProject(user._id)
      setTeamProject(data)
    }
    fetchData()
  }, [user])

  console.log('teamProject', teamProject.projects)
  return (
    <div className="h-full">
      <Donat />
      <div>fff</div>
    </div>
  )
}

export default Page
