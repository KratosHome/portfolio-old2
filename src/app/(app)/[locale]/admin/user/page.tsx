'use client'
import { useRef, useState } from 'react'
import { Input } from '@/components/UI/input/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { updateUser } from '@/server/users/update-user.server'
import { useSession } from 'next-auth/react'
import { AdminButton } from '@/components/UI/admin-button/admin-button'

export interface UserTypes {
  _id: string
  isEmailVerified: boolean
  name?: string
  email?: string
}

const Page = () => {
  const { data: session }: any = useSession()
  const t = useTranslations('footer')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState<boolean | undefined>(false)
  const [image, setImage] = useState<any>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>()

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    setLoading(true)
    const formData = new FormData()

    formData.append('id', session?.user?._id)
    formData.append('name', data.name)
    if (image) {
      formData.append('image', image)
    }

    const response = await updateUser(formData)
    if (response.success) {
      toast.success('User updated')
      setLoading(false)
    } else {
      toast.error('User not updated')
    }

    setLoading(false)
  }

  const handleImageChange = (e: any) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setImage(file)
    } else {
      toast.error(t('Only image files are allowed'))
      if (fileInputRef.current) {
        fileInputRef.current.value = '' // Скинути вибір файлу, якщо це не зображення
      }
    }
  }

  return (
    <div className="mx-auto h-full w-full p-5">
      <h1 className="text-center text-[50px] font-light">
        Personal information
      </h1>
      <div className="flex items-center gap-4">
        <div>{!session?.user?.isEmailVerified && <>Confirm your email:</>}</div>
        <AdminButton>send a letter</AdminButton>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-[50px]">
        <input
          className="file-input__create-post"
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageChange}
        />
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
        <AdminButton>Save</AdminButton>
      </form>
    </div>
  )
}

export default Page
