import { useEffect, useState } from 'react'
import { getProject } from '@/server/project/get-project.server'

const useFetchProject = (id: string) => {
  const [projectData, setProjectData] = useState<IProject[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProject(id)
      setProjectData(data.projects)
    }
    fetchData()
  }, [id])

  return projectData
}

export default useFetchProject
