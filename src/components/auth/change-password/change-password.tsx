'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocale } from 'use-intl'
import { Input } from '@/components/input/input'

interface changePasswordFormValues {
  password: string
  repeatPassword: string
}

const ChangePassword = () => {
  const locale = useLocale()
  const t = useTranslations('page.login')
  const params = useParams()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<changePasswordFormValues>()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [loading, setIsLoading] = useState(false)
  const [errorAction, setErrorAction] = useState<null | string>(null)

  const onSubmit: SubmitHandler<changePasswordFormValues> = async (data) => {
    setIsSubmitting(true)
    setIsLoading(true)

    if (data.password !== data.repeatPassword) {
      setErrorAction(t('Passwords do not match'))
      setIsLoading(false)
      return
    }

    fetch('/api/users/new-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: params.token,
        password: data.password,
        repeatPassword: data.repeatPassword,
      }),
    })
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) {
          setErrorAction(data.error)
          setSubmitSuccess(false)
        } else {
          setSubmitSuccess(true)
        }
      })
      .catch((error) => {
        console.log('error', error)
        setSubmitSuccess(false)
        //  serError(true);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        router.push(`/${locale}/login`)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [submitSuccess])

  return (
    <div>
      <div>
        <h1>{t('forgotPassword')}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Input
            type={'password'}
            placeholder={t('repeatPassword')}
            name={'repeatPassword'}
            register={{
              ...register('repeatPassword', {
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
          <button disabled={isSubmitting}>{t('submit')}</button>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
