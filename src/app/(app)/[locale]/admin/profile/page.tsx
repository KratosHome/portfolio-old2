'use client'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { updateUser } from '@/server/users/update-user.server'
import { useSession } from 'next-auth/react'
import { sendEmailTokenServer } from '@/server/auth/confirm-email.server'
import { useStore } from '@/store/user'
import { MdDelete } from 'react-icons/md'
import { convertToBase64 } from '@/utils/convertToBase64'
import { base64ToFile } from '@/utils/base64ToFile'
import { Checkbox } from '@/components/UI/checkbox'
import { Input } from '@/components/UI/input'
import { Label } from '@/components/UI/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/UI/avatar'
import { Button } from '@/components/UI/buttom/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/UI/select'
import { QuillEditor } from '@/components/admin/quill-editor/quill-editor'

interface FormData {
  username: string
  gitHubLink: string
  contactLink: string
  workExperience: number
  linkedinLink: string
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

  const levelExperience = [
    'pre junior',
    'junior',
    'strong junior',
    'middle',
    'strong middle',
    'senior',
    'lead',
  ]

  const { data: session } = useSession()
  const { user, fetchUser } = useStore()
  const t = useTranslations('footer')
  const fileAvatarRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState<boolean | undefined>(true)

  const resumeInputRef = useRef<HTMLInputElement>(null)

  const [selectedResume, setSelectedResume] = useState<File | null>(null)
  const [image, setImage] = useState<File | null>(null)

  const [aboutMe, setAboutMe] = useState<string>('')
  const [isPublic, setIsPublic] = useState<boolean>(false)

  const [technologyInput, setTechnologyInput] = useState<string>('')
  const [technologies, setTechnologies] = useState<string[]>(['NextJS'])

  const [portfolioInput, setPortfolioInput] = useState<string>('')
  const [portfolio, setPortfolio] = useState<string[]>(['vcdfsv'])
  const [selectedRoles, setSelectedRoles] = useState(user.role || roles[0])

  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState(
    user.experienceLevel || levelExperience[0],
  )

  useEffect(() => {
    if (user.resume) {
      const pdfFile = base64ToFile(user.resume, `${user.username}.pdf`)
      setSelectedResume(pdfFile)
    }
  }, [user, loading])

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
  } = useForm<FormData>({
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

  const handleChangeRole = (event: string) => {
    setSelectedRoles(event)
  }
  const handleChangeExperienceLevel = (event: string) => {
    setSelectedExperienceLevel(event)
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setImage(file)
    } else {
      toast.error(t('Only image files are allowed'))
      if (fileAvatarRef.current) {
        fileAvatarRef.current.value = ''
      }
    }
  }

  const handleResumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true)

    let imageBase64 = null
    if (image) {
      imageBase64 = await convertToBase64(image)
    }
    let selectedResumeBase64 = null
    if (selectedResume) {
      selectedResumeBase64 = await convertToBase64(selectedResume)
    }

    const sendData: Partial<IUser> = {
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

  console.log('user >>>>>', user)
  return (
    <div className="mx-auto h-full w-full p-5">
      <h1 className="text-center text-[50px] font-light">Profile settings</h1>
      <div className="max-w-max">
        {!user?.isEmailVerified && (
          <div className="my-5 flex flex-col items-center justify-center">
            <div className="text-xl font-extrabold">Confirm your email</div>
            <Button className="mt-1" disabled={loading} onClick={confirmEmail}>
              send a letter
            </Button>
          </div>
        )}
      </div>
      <div className="flex gap-5">
        <div>
          <Avatar
            className="cursor-pointer"
            onClick={() => fileAvatarRef.current?.click()}
          >
            <AvatarImage src={user.userLogo} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <input
            type="file"
            accept="image/*"
            ref={fileAvatarRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />

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
        <Button onClick={() => resumeInputRef.current?.click()}>
          Add resume
        </Button>
        <input
          type="file"
          accept="application/pdf"
          ref={resumeInputRef}
          style={{ display: 'none' }}
          onChange={handleResumeChange}
        />

        {selectedResume && <Button onClick={handleOpenPDF}>Open resume</Button>}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 gap-3">
          <div>
            <Label htmlFor="name">{t('name')}</Label>
            <Input
              id="name"
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
          </div>
          <div>
            <Label htmlFor="Work experience">Work experience</Label>
            <Input
              id="Work experience"
              type={'number'}
              min={1}
              max={100}
              placeholder={'Work experience'}
              {...register('workExperience', {
                required: t('This field is required'),
                minLength: {
                  value: 1,
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
          </div>
          <Select
            onValueChange={(value) => handleChangeExperienceLevel(value)}
            value={selectedExperienceLevel}
          >
            <SelectTrigger className="mt-6 w-full rounded-md border border-gray-300 bg-transparent px-5 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Choose your experience level" />
            </SelectTrigger>
            <SelectContent>
              {levelExperience.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => handleChangeRole(value)}
            value={selectedRoles}
          >
            <SelectTrigger className="mt-6 w-full rounded-md border border-gray-300 bg-transparent px-5 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Choose a role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div>
            <Label htmlFor="contactCommunication">
              Contact for communication
            </Label>
            <Input
              id="contactCommunication"
              type={'text'}
              placeholder={'Contact for communication'}
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
          </div>
          <div>
            <Label htmlFor="GitHublink">GitHub link</Label>
            <Input
              id="GitHublink"
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
          </div>
          <div>
            <Label htmlFor="Linkedlink">Linked link</Label>
            <Input
              id="Linkedlink"
              type={'text'}
              placeholder={'linked link'}
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
          </div>
        </div>

        <div className="my-6">
          <span className="font-bold">
            {technologies.length <= 1 ? 'Add technologies' : 'Technologies:'}
          </span>
          <div className="mb-2 flex flex-wrap gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="flex max-w-max items-center gap-4 rounded-lg bg-gray-100 px-2 py-1 dark:bg-zinc-500"
              >
                <div>{tech}</div>
                <Button
                  variant="outline"
                  onClick={() => handleRemoveTechnology(index)}
                >
                  <MdDelete />
                </Button>
              </div>
            ))}
          </div>
          <Input
            type={'text'}
            placeholder={'Add technologies'}
            value={technologyInput}
            onChange={(e) => setTechnologyInput(e.target.value)}
          />
          <Button onClick={handleAddTechnology} className="mt-3">
            Add technology
          </Button>
        </div>

        <div className="mt-3 min-h-[200px]">
          <div className="mb-2 font-bold">About me</div>
          <QuillEditor
            placeholder="About me"
            value={aboutMe}
            onChange={(value) => setAboutMe(value)}
          />
        </div>

        <div className="mt-6">
          <span className="font-bold">
            {portfolio.length <= 1 ? 'Add portfolio link' : 'Portfolio link:'}
          </span>
          <div className="flex flex-wrap gap-4">
            {portfolio.map((tech, index) => (
              <div
                key={index}
                className="flex max-w-max items-center gap-4 rounded-lg bg-gray-100 px-2 py-1 dark:bg-zinc-500"
              >
                <p>{tech}</p>
                <Button
                  variant="outline"
                  onClick={() => handleRemovePortfolio(index)}
                >
                  <MdDelete />
                </Button>
              </div>
            ))}
          </div>
          <Input
            className="mt-2"
            type={'text'}
            placeholder={'Додати посилання на портфоліо'}
            value={portfolioInput}
            onChange={(e) => setPortfolioInput(e.target.value)}
          />
          <Button onClick={handleAddPortfolio} className="mt-3">
            Додати порфтоліо
          </Button>
        </div>
        <Button variant="success" type="submit" className="mt-2">
          Save
        </Button>
      </form>
    </div>
  )
}

export default Page
