'use client'
import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/UI/input/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { updateUser } from '@/server/users/update-user.server'
import { useSession } from 'next-auth/react'
import { AdminButton } from '@/components/UI/admin-button/admin-button'
import { sendEmailTokenServer } from '@/server/auth/confirm-email.server'
import useFetchUser from '@/hooks/useFetchUser'

export interface UserTypes {
  _id: string
  isEmailVerified: boolean
  name?: string
  email?: string
}

const Page = () => {
  const { data: session }: any = useSession()
  const userData = useFetchUser(session)

  const t = useTranslations('footer')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState<boolean | undefined>(false)
  const [image, setImage] = useState<any>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    defaultValues: {
      username: userData?.user.username || '',
    },
  })

  console.log('userData', userData)
  useEffect(() => {
    if (userData?.user.username) {
      reset({ username: userData.user.username })
    }
  }, [userData, reset])

  const confirmEmail = async () => {
    setLoading(true)
    const data = {
      id: userData?.user._id,
    }
    const sendToken = await sendEmailTokenServer(data)
    if (sendToken.success) {
      toast.success('Check your email')
    } else {
      toast.error('Error')
    }
    setLoading(false)
  }

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    setLoading(true)
    const formData = new FormData()

    formData.append('id', userData?.user?._id)
    formData.append('username', data.username)
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
        fileInputRef.current.value = ''
      }
    }
  }

  if (!userData) return null
  return (
    <div className="mx-auto h-full w-full p-5">
      <h1 className="text-center text-[50px] font-light">
        Personal information
      </h1>
      {!userData?.user?.isEmailVerified && (
        <div className="flex items-center gap-4">
          <div>Confirm your email:</div>
          <AdminButton disabled={loading} onClick={confirmEmail}>
            send a letter
          </AdminButton>
        </div>
      )}
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
