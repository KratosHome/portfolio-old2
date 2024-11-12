'use client'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'
import { singUp } from '@/server/auth/sing-up.server'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { GitHub } from '@/components/client/auth/git-hub/git-hub'
import { Google } from '@/components/client/auth/google/google'
import { Loader } from '@/components/UI/client/loader/loader'
import { ButtonBeck } from '@/components/UI/client/button-beck/button-beck'
import { BigLuna } from '@/components/UI/client/big-luna/big-luna'
import { Input } from '@/components/UI/client/input/input'
import { Button } from '@/components/UI/buttom/button'

interface registerFormValues {
  username: string
  email: string
  password: string
  passwordRepeat: string
}

export const SignUp = () => {
  const router = useRouter()
  const t = useTranslations('auth')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<registerFormValues>()
  const password = watch('password')
  const passwordRepeat = watch('passwordRepeat')

  const [loading, setLoading] = useState<boolean | undefined>(false)

  const onSubmit: SubmitHandler<registerFormValues> = async (data) => {
    setLoading(true)
    if (password !== passwordRepeat) {
      toast(`${t('Passwords do not match!')}`, {
        type: 'error',
      })
      setLoading(false)
      return
    }
    const response = await singUp(data)

    if (response.success) {
      reset()
      toast(`${t('You have registered successfully!')}`, {
        type: 'success',
      })
      setLoading(false)
      router.push('/login')
      return
    }

    setLoading(false)
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="animate-scale-in-out absolute left-[75vw] top-[805px] -z-20 hidden size-[200px] -translate-x-1/2 bg-group-pattern opacity-[0.1] lg:-bottom-[220px] lg:right-0 lg:block lg:size-[300px]" />
      <div className="absolute -top-[600px] left-[200px] -z-20 hidden h-[1900px] w-[1900px] transform bg-hero-pattern lg:block" />
      <div className="absolute -right-[400px] -top-[400px] -z-20 hidden h-[1900px] w-[1900px] transform bg-hero-pattern lg:-top-[100px] lg:right-[200px] lg:block" />
      <div className="relative mx-auto max-w-[1442px] overflow-hidden px-[5px] pb-[350px] lg:mb-0 lg:overflow-visible lg:px-[24px]">
        <div className="animate-scale-in-out absolute bottom-0 left-[75vw] -z-20 size-[200px] -translate-x-1/2 bg-group-pattern opacity-[0.1] lg:-bottom-[220px] lg:right-0 lg:top-[805px] lg:hidden lg:size-[300px]" />
        <div className="login-sercel absolute -left-[150px] bottom-0 size-[318px] rounded-[318px] border border-stone-500/30 bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] backdrop-blur-[12.5px] lg:-bottom-[200px]" />
        <div className="mt-[100px]">
          <ButtonBeck />
        </div>
        <div className="relative mt-[139px]">
          <BigLuna className={'lg:size-[1000px]'} />
          <div className="flex flex-col items-center justify-center pt-[67px]">
            <h1 className="text-[40px] font-light uppercase lg:text-[60px] lg:capitalize">
              {t('sign up now')}
            </h1>
            <div className="mt-[40px] flex gap-[26px] text-[21px] font-bold">
              <GitHub />
              <Google />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-[40px] gap-[24px]"
            >
              <Input
                label={t('name')}
                className="mx-5 w-[300px]"
                type={'text'}
                placeholder={t('name')}
                name={'name'}
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
              <span className="mt-[24px] block" />
              <Input
                className="mx-5 w-[300px]"
                type={'text'}
                label={t('email')}
                placeholder={t('email')}
                name={'email'}
                register={{
                  ...register('email', {
                    required: `${t('This field is required')}`,
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: `${t('This is not an email')}`,
                    },
                  }),
                }}
                error={errors.email?.message}
              />
              <span className="mt-[24px] block" />
              <Input
                className="mx-5 w-[300px]"
                type={'password'}
                label={t('password')}
                placeholder={t('password')}
                name={'password'}
                password={password}
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
                className="mx-5 w-[300px]"
                type={'password'}
                label={t('Confirm password')}
                placeholder={t('Confirm password')}
                name={'password'}
                password={password}
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
              <div className="mt-[48px] flex w-full items-center justify-center">
                <Button variant="circle" className="capitalize">
                  {t('sign-in')}
                </Button>
              </div>
            </form>
            <div className="mt-[70px] flex flex-col items-center text-[20px] lg:items-start">
              <div>
                <span className="mr-[12px] text-[20px]">
                  {t('Already have an account?')}
                </span>
                <Link
                  href={'login'}
                  className="text-blue-700 duration-300 hover:underline"
                >
                  {t('Sign In')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
