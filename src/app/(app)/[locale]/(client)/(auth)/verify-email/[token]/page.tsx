'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { confirmEmailToken } from '@/server/auth/confirm-email.server'
import { toast } from 'react-toastify'
import { useStore } from '@/store/user'

const Page = () => {
  const { token } = useParams()
  const router = useRouter()
  const { user } = useStore()


  useEffect(() => {
    if (user._id && token) {
      const fetchData = async () => {
        const response = await confirmEmailToken(user._id, token.toString())
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user])

  return <div />
}

export default Page
