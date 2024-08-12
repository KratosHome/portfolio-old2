'use client'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '@/components/UI/input/input'

interface ForgotPasswordValues {
  email: string
}

const ForgotPassword = () => {
  const t = useTranslations('page.login')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>()

  // const {data, error, isLoading, fetchData} = useFetchData<{ error?: string }>();

  const onSubmit: SubmitHandler<ForgotPasswordValues> = (data) => {
    //   fetchData('/api/users/password-reset', data);
  }

  return (
    <div>
      <div>
        <h1>{t('forgotPassword')}</h1>
        <form
          className="login-form__container"
          onSubmit={handleSubmit(onSubmit)}
        >
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
          <button>{t('submit')}</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
