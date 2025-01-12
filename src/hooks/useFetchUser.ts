import { useEffect, useState } from 'react'
import { getUser } from '@/server/users/get-user.server'

const useFetchUser = (session: ISession) => {
  const [userData, setUserData] = useState<IUser | null>(null)

  useEffect(() => {
    if (session?.user.email) {
      const fetchData = async () => {
        const data = await getUser(session?.user.email)

        setUserData(data.user)
      }

      fetchData()
    }
  }, [session])

  return userData
}

export default useFetchUser
