'use client'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ButtonBeck } from '@/components/UI/client/button-beck/button-beck'
import { BigLuna } from '@/components/UI/client/big-luna/big-luna'
import { Input } from '@/components/UI/client/input/input'
import { Button } from '@/components/UI/buttom/button'

interface ForgotPasswordValues {
  email: string
}

const ForgotPassword = () => {
  const t = useTranslations('auth')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>()

  const onSubmit: SubmitHandler<ForgotPasswordValues> = () => {}
  return (
    <div>
      <div className="animate-scale-in-out absolute left-[75vw] top-[805px] -z-20 hidden size-[200px] -translate-x-1/2 bg-group-pattern opacity-[0.1] lg:-bottom-[220px] lg:right-0 lg:block lg:size-[300px]" />
      <div className="absolute -top-[600px] left-[200px] -z-20 hidden h-[1900px] w-[1900px] transform bg-hero-pattern lg:block" />
      <div className="absolute -right-[400px] -top-[400px] -z-20 hidden h-[1900px] w-[1900px] transform bg-hero-pattern lg:-top-[100px] lg:right-[200px] lg:block" />
      <div className="relative mx-auto max-w-[1442px] overflow-hidden px-[5px] pb-[350px] lg:mb-0 lg:overflow-visible lg:px-[24px]">
        <div className="animate-scale-in-out absolute bottom-0 left-[75vw] -z-20 size-[200px] -translate-x-1/2 bg-group-pattern opacity-[0.1] lg:-bottom-[220px] lg:right-0 lg:top-[805px] lg:hidden lg:size-[300px]" />
        <div className="login-sercel absolute -left-[150px] bottom-0 size-[318px] rounded-[318px] border border-stone-500/30 bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] backdrop-blur-[12.5px] lg:-bottom-[200px]" />
        <div className="mt-[100px]">
          <ButtonBeck />
        </div>
        <div className="relative mt-[239px]">
          <BigLuna />
          <div className="flex flex-col items-center justify-center pt-[67px]">
            <h1 className="text-[40px] font-light uppercase text-[#0B66F5] lg:text-[60px] lg:capitalize">
              {t('forgot-password')}
            </h1>
            <div className="text-[20px]">
              {t('Enter your email account to reset your password')}
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-[40px] gap-[24px]"
            >
              <Input
                className="mx-5 w-[300px]"
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
              <span className="mt-[24px] block" />
              <div className="mt-[48px] flex w-full items-center justify-center">
                <Button variant="circle" className="capitalize">
                  {t('sign-in')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
