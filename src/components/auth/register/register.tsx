'use client'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '@/components/input/input'

interface registerFormValues {
  username: string
  email: string
  password: string
  passwordRepeat: string
}

const RegisterForm = () => {
  const t = useTranslations('page.login')
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<registerFormValues>()
  const password = watch('password')
  const passwordRepeat = watch('passwordRepeat')

  const [errorAction, setErrorAction] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean | undefined>(false)

  const onSubmit: SubmitHandler<registerFormValues> = async (data) => {
    setLoading(true)
    if (password !== passwordRepeat) {
      setErrorAction(t('Passwords do not match'))
      setLoading(false)
      return
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await res.json()

    if (!res.ok) {
      setErrorAction(result.error || 'An error occurred.')
      setLoading(false)
      return
    }

    setErrorAction(null)
    setLoading(false)
  }

  const getPasswordStrength = (password: string) => {
    if (!password) return 0
    if (password.length < 6) return 1
    if (
      password.length >= 6 &&
      /\d+/.test(password) &&
      /[a-zA-Z]+/.test(password)
    )
      return 2
    if (
      password.length >= 8 &&
      /\d+/.test(password) &&
      /[a-zA-Z]+/.test(password) &&
      /[^a-zA-Z\d]+/.test(password)
    )
      return 3
    return 0
  }

  const passwordStrengthLevel = getPasswordStrength(password)

  const renderPasswordStrengthBar = (level: number) => {
    return (
      <div>
        <div
          style={{ backgroundColor: level >= 1 ? 'lightgrey' : 'red' }}
        ></div>
        <div
          style={{ backgroundColor: level >= 2 ? 'lightgrey' : 'red' }}
        ></div>
        <div
          style={{ backgroundColor: level >= 3 ? 'lightgrey' : 'red' }}
        ></div>
      </div>
    )
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type={'text'}
            placeholder={t('username')}
            name={'username'}
            register={{
              ...register('username', {
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
            error={errors.username?.message}
          />
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
          {renderPasswordStrengthBar(passwordStrengthLevel)}
          <Input
            type={'password'}
            placeholder={t('repeatPassword')}
            name={'passwordRepeat'}
            register={{
              ...register('passwordRepeat', {
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
            error={errors.passwordRepeat?.message}
          />
          <button>{t('submit')}</button>
        </form>
      </div>
    </>
  )
}

export default RegisterForm
