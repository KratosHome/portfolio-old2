import { useEffect, useState } from 'react'
import { getProject } from '@/server/project/get-project.server'

const useFetchProject = (userData: any) => {
  const [projectData, setProjectData] = useState<any>(null)

  useEffect(() => {
    console.log('userData', userData)
    if (userData?.user._id) {
      const fetchData = async () => {
        const data = await getProject(userData?.user._id)
        setProjectData(data)
      }
      fetchData()
    }
  }, [userData])

  return projectData
}

export default useFetchProject
