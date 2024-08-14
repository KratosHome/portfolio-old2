'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { sendEmailTokenServer } from '@/server/auth/confirm-email.server'
import { toast } from 'react-toastify'

const Page = () => {
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendEmailTokenServer(params.token)
      if (response.success) {
        toast.success('Email token sent successfully!')
        router.push('/')
      } else {
        toast.error('Failed to send email token.')
        router.push('/')
      }
    }

    fetchData()
  }, [params.token])

  return <div />
}

export default Page
