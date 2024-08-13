'use client'
import { useState } from 'react'
import { Input } from '@/components/UI/input/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { messageMe } from '@/server/telegram/message-me.server'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'

const Page = () => {
  const t = useTranslations('footer')

  const [loading, setLoading] = useState<boolean | undefined>(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>()

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    setLoading(true)

    setLoading(false)
  }

  return (
    <div className="mx-auto h-full w-full p-5">
      <h1 className="text-center text-[50px] font-light">
        Personal information
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-[50px]">
        <div>Avatar</div>
        <div>Is email validate</div>
        <Input
          label={t('name')}
          type={'text'}
          placeholder={t('name')}
          name={'name'}
          register={{
            ...register('name', {
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
          error={errors.name?.message}
        />
        <div>Роль</div>
        <div>tehnologis</div>
        <div>telegramLink</div>
        <div>gitHubLink</div>
        <div>resume</div>
        <div>protfolio</div>
      </form>
    </div>
  )
}

export default Page
