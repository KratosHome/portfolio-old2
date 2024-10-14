import { useEffect, useState } from 'react'
import { getUser } from '@/server/users/get-user.server'

const useFetchUser = (session: any) => {
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    if (session?.user.email) {
      const fetchData = async () => {
        const data = await getUser(session?.user.email)
        setUserData(data)
      }
      fetchData()
    }
  }, [session])

  return userData
}

export default useFetchUser
