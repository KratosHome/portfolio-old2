'use client'
import { useState } from 'react'
import { loginAction } from '@/server/auth/login.server'
import { useLocale } from 'use-intl'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { loginGitHubAction } from '@/server/auth/loginGitHub.server'
import GitHub from '@/components/auth/git-hub/git-hub'

interface LoginFormValues {
  email: string
  password: string
}

const Login = () => {
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations('page.login')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormValues>()

  const [errorAction, setErrorAction] = useState<boolean | undefined>(false)
  const [loading, setLoading] = useState<boolean | undefined>(false)
  const [success, setSuccess] = useState<boolean | undefined>(false)

  const onSubmit: SubmitHandler<LoginFormValues> = async (data: any) => {
    setLoading(true)
    const result = await loginAction(data)
    setLoading(false)
    setErrorAction(result?.error)
    setSuccess(result?.success)

    if (result?.success) {
      router.refresh()
    }
  }

  return (
    <div>
      <GitHub />
      <form onSubmit={handleSubmit(onSubmit)}>
        <button>submit</button>
      </form>
    </div>
  )
}

export default Login
