'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { confirmEmailToken } from '@/server/auth/confirm-email.server'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'

const Page = () => {
  const params = useParams()
  const router = useRouter()
  const session: any = useSession()

  useEffect(() => {
    if (session.data?.user._id) {
      const fetchData = async () => {
        const response = await confirmEmailToken(
          session.data?.user._id,
          params.token.toString(),
        )
        if (response.success) {
          toast.success('Email token sent successfully!')
          router.push('/')
        } else {
          toast.error('Failed to send email token.')
          router.push('/')
        }
      }
      fetchData()
    }
  }, [params.token, session])

  return <div />
}

export default Page
