'use client'
import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { updateUser } from '@/server/users/update-user.server'
import { useSession } from 'next-auth/react'
import { sendEmailTokenServer } from '@/server/auth/confirm-email.server'
import { useStore } from '@/store/user'
import { MdDelete } from 'react-icons/md'
import ReactQuill from 'react-quill'
import { convertToBase64 } from '@/utils/convertToBase64'
import { base64ToFile } from '@/utils/base64ToFile'
import { AdminButton } from '@/components/UI/client/admin-button/admin-button'
import { CustomToolbarQuill } from '@/components/UI/client/custom-toolbar-quill/custom-toolbar-quill'
import { Checkbox } from '@/components/UI/checkbox'
import { Input } from '@/components/UI/input'
import { Label } from '@/components/UI/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/UI/avatar'

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

  const levelExperience = [
    'pre junior',
    'junior',
    'strong junior',
    'middle',
    'strong middle',
    'senior',
    'lead',
  ]

  const { data: session }: any = useSession()
  const { user, fetchUser } = useStore()
  const t = useTranslations('footer')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState<boolean | undefined>(true)

  const [selectedResume, setSelectedResume] = useState<any>(null)
  const [image, setImage] = useState<any>(null)

  const [aboutMe, setAboutMe] = useState<string>('')
  const [isPublic, setIsPublic] = useState<boolean>(false)

  const [technologyInput, setTechnologyInput] = useState<string>('')
  const [technologies, setTechnologies] = useState<string[]>(['NextJS'])

  const [portfolioInput, setPortfolioInput] = useState<string>('')
  const [portfolio, setPortfolio] = useState<string[]>(['vcdfsv'])
  const [selectedRoles, setSelectedRoles] = useState(roles[0])

  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState(
    levelExperience[0],
  )

  useEffect(() => {
    if (user.resume) {
      const pdfFile = base64ToFile(user.resume, `${user.username}.pdf`)
      setSelectedResume(pdfFile)
    }
  }, [user, loading])

  const handlePublicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked)
  }

  useEffect(() => {
    if (session?.user) {
      const fetchData = async () => {
        await fetchUser(session.user.email)
      }
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  useEffect(() => {
    reset({
      username: user.username,
      gitHubLink: user.gitHubLink,
      contactLink: user.contactLink,
      workExperience: user.workExperience,
      linkedinLink: user.linkedinLink,
    })
    setAboutMe(user.aboutMe)
    setIsPublic(user.isPublic)
    setSelectedRoles(user.role)
    setPortfolio(user.portfolioLinks ?? [])
    setTechnologies(user.technologies ?? [])
    setSelectedExperienceLevel(user.experienceLevel)
    // eslint-disable-next-line
  }, [user, session, loading])

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
  const handleChangeExperienceLevel = (event: any) => {
    setSelectedExperienceLevel(event.target.value)
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

  const handleResumeChange = (event: any) => {
    const file = event.target.files[0]

    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Будь ласка, виберіть PDF файл.')
        return
      }
      const maxSize = 60 * 1024 * 1024
      if (file.size > maxSize) {
        alert('Розмір файлу не повинен перевищувати 60 MB.')
        return
      }

      setSelectedResume(file)
    }
  }

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    setLoading(true)

    let imageBase64 = null
    if (image) {
      imageBase64 = await convertToBase64(image)
    }
    let selectedResumeBase64 = null
    if (selectedResume) {
      selectedResumeBase64 = await convertToBase64(selectedResume)
    }

    const sendData: any = {
      username: data.username,
      aboutMe: aboutMe,
      technologies: technologies,
      gitHubLink: data.gitHubLink,
      role: selectedRoles,
      contactLink: data.contactLink,
      portfolioLinks: portfolio,
      workExperience: +data.workExperience,
      linkedinLink: data.linkedinLink,
      isPublic: isPublic,
      experienceLevel: selectedExperienceLevel,
    }

    if (imageBase64) {
      sendData.userLogo = imageBase64
    }
    if (selectedResumeBase64) {
      sendData.resume = selectedResumeBase64
    }

    const response = await updateUser(user._id, sendData)
    if (response.success) {
      toast.success('User updated')
      await fetchUser(user.email)
      setLoading(false)
    } else {
      toast.error('User not updated')
    }

    setLoading(false)
  }

  const handleOpenPDF = () => {
    if (selectedResume) {
      const fileURL = URL.createObjectURL(selectedResume)
      window.open(fileURL, '_blank')
    } else {
      toast.error('Файл PDF не вибрано')
    }
  }

  if (!user) return null
  return (
    <div className="mx-auto h-full w-full p-5">
      <h1 className="text-center text-[50px] font-light">
        Персональна інформація
      </h1>
      <div className="flex gap-5">
        {!user?.isEmailVerified && (
          <div className="flex flex-col items-center">
            <div>Підтвердіть ваш імейл:</div>
            <AdminButton
              className="mt-1"
              disabled={loading}
              onClick={confirmEmail}
            >
              send a letter
            </AdminButton>
          </div>
        )}
        <div className="mt-4">
          <Avatar onClick={handleImageChange}>
            <AvatarImage src={user.userLogo} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="my-5 flex items-center space-x-2">
            <Checkbox
              id="isPublic"
              checked={isPublic}
              onCheckedChange={(checked) => setIsPublic(checked === true)}
            />
            <label
              htmlFor="isPublic"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {isPublic ? 'Публічний профіль' : 'Приватний профіль'}
            </label>
          </div>
        </div>

        <div className="flex flex-col items-start">
          <div>Додати резюме</div>
          <label
            htmlFor="resume-upload"
            className="mt-1 inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Вибрати файл
          </label>
          <input
            id="resume-upload"
            type="file"
            className="hidden"
            accept="application/pdf"
            onChange={handleResumeChange}
          />
        </div>
        {selectedResume && (
          <button
            className="mt-1 inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleOpenPDF}
          >
            Переглянути резюме
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type={'text'}
          placeholder={t('name')}
          {...register('username', {
            required: t('This field is required'),
            minLength: {
              value: 4,
              message: `${t('Minimum number of characters')} 4`,
            },
            maxLength: {
              value: 50,
              message: `${t('Maximum number of characters')} 50`,
            },
          })}
        />
        {errors.username?.message && (
          <p className="text-sm text-red-500">
            {errors.username.message.toString()}
          </p>
        )}
        <div className="mt-3 min-h-[200px]">
          <CustomToolbarQuill />
          ReactQuill
        </div>
        <Input
          type={'number'}
          min={1}
          max={100}
          placeholder={'Досвід роботи'}
          {...register('workExperience', {
            required: t('This field is required'),
            minLength: {
              value: 4,
              message: `${t('Minimum number of characters')} 4`,
            },
            maxLength: {
              value: 50,
              message: `${t('Maximum number of characters')} 50`,
            },
          })}
        />
        {errors.workExperience?.message && (
          <p className="text-sm text-red-500">
            {errors.workExperience.message.toString()}
          </p>
        )}
        <div className="mt-3">Оберіть роль</div>
        <select
          value={selectedRoles}
          onChange={handleChangeRole}
          className="my-1 w-full rounded-md border border-gray-300 bg-transparent px-5 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {roles.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="mt-3">Оберіть рівень досвіду</div>
        <select
          value={selectedExperienceLevel}
          onChange={handleChangeExperienceLevel}
          className="my-1 w-full rounded-md border border-gray-300 bg-transparent px-5 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {levelExperience.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div>
          <h2 className="mt-3 font-bold">Технології</h2>
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
          {...register('contactLink', {
            required: t('This field is required'),
            minLength: {
              value: 4,
              message: `${t('Minimum number of characters')} 4`,
            },
            maxLength: {
              value: 50,
              message: `${t('Maximum number of characters')} 50`,
            },
          })}
        />
        {errors.contactLink?.message && (
          <p className="text-sm text-red-500">
            {errors.contactLink.message.toString()}
          </p>
        )}
        <Input
          type={'text'}
          placeholder={'gitHub Link'}
          {...register('gitHubLink', {
            required: t('This field is required'),
            minLength: {
              value: 4,
              message: `${t('Minimum number of characters')} 4`,
            },
            maxLength: {
              value: 50,
              message: `${t('Maximum number of characters')} 50`,
            },
          })}
        />
        {errors.gitHubLink?.message && (
          <p className="text-sm text-red-500">
            {errors.gitHubLink.message.toString()}
          </p>
        )}
        <Input
          type={'text'}
          placeholder={'linked inLink'}
          {...register('gitHubLink', {
            required: t('This field is required'),
            minLength: {
              value: 4,
              message: `${t('Minimum number of characters')} 4`,
            },
            maxLength: {
              value: 50,
              message: `${t('Maximum number of characters')} 50`,
            },
          })}
        />
        {errors.linkedinLink?.message && (
          <p className="text-sm text-red-500">
            {errors.linkedinLink.message.toString()}
          </p>
        )}
        <div>
          <h2 className="mt-3 font-bold">посилання на портфоліо</h2>
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
            placeholder={'Додати посилання на портфоліо'}
            value={portfolioInput}
            onChange={(e) => setPortfolioInput(e.target.value)}
          />
          <AdminButton onClick={handleAddPortfolio} className="mt-3">
            Додати порфтоліо
          </AdminButton>
        </div>
        <AdminButton type="submit" className="mt-2">
          Save
        </AdminButton>
      </form>
    </div>
  )
}

export default Page
