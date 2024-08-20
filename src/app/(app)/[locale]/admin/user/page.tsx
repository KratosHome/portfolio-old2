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
import { useStore } from '@/store/user'
import { MdDelete } from 'react-icons/md'
import ReactQuill from 'react-quill'
import { CustomToolbarQuill } from '@/components/UI/custom-toolbar-quill/custom-toolbar-quill'

export interface UserTypes {
  _id: string
  isEmailVerified: boolean
  name?: string
  email?: string
}

const Page = () => {
  const roles = [
    'user',
    'frontend',
    'backend',
    'full stack',
    'tester',
    'designer',
    'devops',
    'data scientist',
    'project manager',
    'product manager',
    'qa engineer',
    'ui/ux designer',
    'mobile developer',
    'system administrator',
    'security analyst',
    'mentor',
  ]

  const { user } = useStore()
  const t = useTranslations('footer')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState<boolean | undefined>(false)
  const [image, setImage] = useState<any>(null)

  console.log('user', user)
  const [aboutMe, setAboutMe] = useState<string>('')

  const [technologyInput, setTechnologyInput] = useState<string>('')
  const [technologies, setTechnologies] = useState<string[]>(['NextJS'])

  const [portfolioInput, setPortfolioInput] = useState<string>('')
  const [portfolio, setPortfolio] = useState<string[]>(['vcdfsv'])
  const [selectedRoles, setSelectedRoles] = useState(status[0])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    defaultValues: {
      username: user?.username || '',
    },
  })

  const confirmEmail = async () => {
    setLoading(true)
    const data = {
      id: user?._id,
    }
    const sendToken = await sendEmailTokenServer(data)
    if (sendToken.success) {
      toast.success('Check your email')
    } else {
      toast.error('Error')
    }
    setLoading(false)
  }

  const handleChangeRole = (event: any) => {
    setSelectedRoles(event.target.value)
  }

  const handleAddTechnology = () => {
    if (technologyInput.trim() !== '') {
      setTechnologies([...technologies, technologyInput.trim()])
      setTechnologyInput('')
    }
  }
  const handleRemoveTechnology = (index: number) => {
    const updatedTechnologies = technologies.filter((_, i) => i !== index)
    setTechnologies(updatedTechnologies)
  }

  const handleAddPortfolio = () => {
    if (portfolioInput.trim() !== '') {
      setPortfolio([...portfolio, portfolioInput.trim()])
      setPortfolioInput('')
    }
  }
  const handleRemovePortfolio = (index: number) => {
    const updatedTechnologies = portfolio.filter((_, i) => i !== index)
    setPortfolio(updatedTechnologies)
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

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    setLoading(true)
    const formData = new FormData()

    const sendData = {
      username: data.username,
      aboutMe: aboutMe,
      technologies: technologies,
      gitHubLink: data.gitHubLink,
      role: selectedRoles,
      contactLink: data.contactLink,
      portfolioLinks: portfolio,
      workExperience: data.workExperience,
      // resume: resume,
      // userLogo: imageBase64,
    }

    const response = await updateUser(user._id, sendData)
    if (response.success) {
      toast.success('User updated')
      setLoading(false)
    } else {
      toast.error('User not updated')
    }

    setLoading(false)
  }

  if (!user) return null
  return (
    <div className="mx-auto h-full w-full p-5">
      <h1 className="text-center text-[50px] font-light">
        Personal information
      </h1>
      {!user?.isEmailVerified && (
        <div className="flex items-center gap-4">
          <div>Confirm your email:</div>
          <AdminButton disabled={loading} onClick={confirmEmail}>
            send a letter
          </AdminButton>
        </div>
      )}
      <div>додати аватар</div>
      <input
        className="file-input__create-post"
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageChange}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-[50px]">
        <Input
          type={'text'}
          placeholder={t('name')}
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
        <div className="min-h-[200px]">
          <CustomToolbarQuill />
          <ReactQuill
            theme="snow"
            placeholder={'Опис проєкту'}
            value={aboutMe}
            onChange={(value) => setAboutMe(value)}
            modules={{ toolbar: { container: '#toolbar' } }}
            style={{ height: '300px' }}
            className="min-h-[300px] w-full rounded-b-lg border-gray-300 bg-white p-2 text-black shadow-sm"
          />
        </div>
        <Input
          type={'number'}
          min={1}
          max={100}
          placeholder={'Досвід роботи'}
          name={'workExperience'}
          register={{
            ...register('workExperience', {
              required: `${t('This field is required')}`,
              minLength: {
                value: 1,
                message: `${t('Minimum number of characters')} 4`,
              },
              maxLength: {
                value: 50,
                message: `${t('Maximum number of characters')} 3`,
              },
            }),
          }}
          error={errors.workExperience?.message}
        />
        <select value={selectedRoles} onChange={handleChangeRole}>
          {roles.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div>
          <h2 className="text-2xl font-bold">Технології</h2>
          <div className="flex flex-wrap gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="flex max-w-max items-center rounded-lg bg-blue-500 p-2"
              >
                <p>{tech}</p>
                <AdminButton
                  className="ml-2"
                  onClick={() => handleRemoveTechnology(index)}
                >
                  <MdDelete />
                </AdminButton>
              </div>
            ))}
          </div>
          <Input
            type={'text'}
            placeholder={'Додати технологію'}
            value={technologyInput}
            onChange={(e) => setTechnologyInput(e.target.value)}
          />
          <AdminButton onClick={handleAddTechnology} className="mt-3">
            Додати технологію
          </AdminButton>
        </div>
        <Input
          type={'text'}
          placeholder={'контакт для звязку (telegram link)'}
          name={'contactLink'}
          register={{
            ...register('contactLink', {
              required: `${t('This field is required')}`,
              minLength: {
                value: 4,
                message: `${t('Minimum number of characters')} 4`,
              },
              maxLength: {
                value: 250,
                message: `${t('Maximum number of characters')} 250`,
              },
            }),
          }}
          error={errors.contactLink?.message}
        />
        <Input
          type={'text'}
          placeholder={'gitHub Link'}
          name={'gitHubLink'}
          register={{
            ...register('gitHubLink', {
              required: `${t('This field is required')}`,
              minLength: {
                value: 4,
                message: `${t('Minimum number of characters')} 4`,
              },
              maxLength: {
                value: 250,
                message: `${t('Maximum number of characters')} 250`,
              },
            }),
          }}
          error={errors.gitHubLink?.message}
        />
        <div>Додати резюме</div>
        <input
          className="file-input__create-post"
          type="file"
          ref={fileInputRef}
          accept="pdf/*"
        />
        <div>
          <h2 className="text-2xl font-bold">посилання на портфоліо</h2>
          <div className="flex flex-wrap gap-4">
            {portfolio.map((tech, index) => (
              <div
                key={index}
                className="flex max-w-max items-center rounded-lg bg-blue-500 p-2"
              >
                <p>{tech}</p>
                <AdminButton
                  className="ml-2"
                  onClick={() => handleRemovePortfolio(index)}
                >
                  <MdDelete />
                </AdminButton>
              </div>
            ))}
          </div>
          <Input
            type={'text'}
            placeholder={'Додати технологію'}
            value={portfolioInput}
            onChange={(e) => setPortfolioInput(e.target.value)}
          />
          <AdminButton onClick={handleAddPortfolio} className="mt-3">
            Додати порфтоліо
          </AdminButton>
        </div>
        <AdminButton type="submit">Save</AdminButton>
      </form>
    </div>
  )
}

export default Page
