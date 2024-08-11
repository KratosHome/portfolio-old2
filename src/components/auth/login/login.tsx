'use client'
import { useState } from 'react'
import { loginAction } from '@/server/auth/login.server'
import { useLocale } from 'use-intl'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { GitHub } from '@/components/auth/git-hub/git-hub'
import { Google } from '@/components/auth/google/google'
import { BigLuna } from '@/components/UI/big-luna/big-luna'
import { Input } from '@/components/UI/input/input'
import { ButtonCircle } from '@/components/UI/button-circle/button-circle'
import Link from 'next/link'

interface LoginFormValues {
  email: string
  password: string
}

const Login = () => {
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations('login')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormValues>()
  const password = watch('password')

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
    <div className="relative mx-auto max-w-[1442px] px-[24px]">
      <button onClick={() => router.back()}>назад</button>
      <div className="relative mt-[139px]">
        <BigLuna />
        <div className="flex flex-col items-center justify-center pt-[67px]">
          <h1 className="text-[60px] font-light">{t('signNow')}</h1>
          <div className="mt-[40px] flex gap-[26px] text-[21px] font-bold">
            <GitHub />
            <Google />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-[40px] gap-[24px]"
          >
            <Input
              type={'text'}
              label={t('email')}
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
            <span className="mt-[24px] block" />
            <Input
              type={'password'}
              label={t('password')}
              placeholder={t('password')}
              name={'password'}
              value={password}
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

            <div className="mt-[48px] flex w-full items-center justify-center">
              <ButtonCircle title={t('sign-in')} />
            </div>
          </form>
          <div className="mt-[70px] text-[20px]">
            <div>
              <span className="mr-[12px] text-[20px]">{t('have-account')}</span>
              <Link
                href={'sign-up'}
                className="text-blue-700 duration-300 hover:underline"
              >
                {t('sign-up')}
              </Link>
            </div>
            <Link
              href={'forgot-password'}
              className="text-blue-700 duration-300 hover:underline"
            >
              {t('forgot-password')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
