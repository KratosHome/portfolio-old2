'use client'
import { useState } from 'react'
import { loginAction } from '@/server/auth/login.server'
import { useLocale } from 'use-intl'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import GitHub from '@/components/auth/git-hub/git-hub'
import { Input } from '@/components/input/input'

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
      <h1>{t('h1')}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type={'text'}
            placeholder={t('email')}
            name={'email'}
            register={{
              ...register('email', {
                required: `${t('This field is required')}`,
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: `${t('This is not an email')}`,
                },
              }),
            }}
            error={errors.email?.message}
          />
          <Input
            type={'password'}
            placeholder={t('password')}
            name={'password'}
            register={{
              ...register('password', {
                required: `${t('This field is required')}`,
                minLength: {
                  value: 4,
                  message: `${t('Minimum number of characters')} 4`,
                },
                maxLength: {
                  value: 50,
                  message: `${t('Maximum number of characters')} 50`,
                },
              }),
            }}
            error={errors.password?.message}
          />
        </div>
        <div>
          <button>{t('login')}</button>
        </div>
      </form>
    </div>
  )
}

export default Login
