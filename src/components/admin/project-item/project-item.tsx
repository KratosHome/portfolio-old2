import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { Input } from '@/components/UI/input/input'
import { AdminButton } from '@/components/UI/admin-button/admin-button'
import { MdDelete } from 'react-icons/md'
import { SubmitHandler, useForm } from 'react-hook-form'
import { convertToBase64 } from '@/utils/convertToBase64'
import { createProject } from '@/server/project/create-project.server'
import { updateProject } from '@/server/project/update-project.server'
import { toast } from 'react-toastify'
import { Loader } from '@/components/UI/loader/loader'
import { useTranslations } from 'next-intl'
import ReactQuill from 'react-quill'
import { useStore } from '@/store/user'
import { CustomToolbarQuill } from '@/components/UI/custom-toolbar-quill/custom-toolbar-quill'
import Link from 'next/link'
import Image from 'next/image'
import { RxAvatar } from 'react-icons/rx'

interface PlanItem {
  text: string
  completed: boolean
}

interface ProjectItemProps {
  project: ProjectTypes | any
  isCrate?: boolean
}

export const ProjectItem: FC<ProjectItemProps> = ({ project, isCrate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const t = useTranslations('footer')
  const { user } = useStore()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>()

  const status = ['new', 'in progress', 'deploy', 'completed', 'archived']
  const isSuperAdmin = user.isAdmin

  const [loading, setLoading] = useState<boolean | undefined>(false)
  const [image, setImage] = useState<File | null>(null)

  const [description, setDescription] = useState<string>('')

  const [technologyInput, setTechnologyInput] = useState<string>('')
  const [technologies, setTechnologies] = useState<string[]>([''])

  const [lookingInTeamInput, setLookingInTeamInput] = useState<string>('')
  const [lookingInTeam, setLookingInTeam] = useState<string[]>(['NextJS'])

  const [planInput, setPlanInput] = useState<string>('')
  const [workPlan, setWorkPlanPlan] = useState<PlanItem[]>([
    { text: 'міавмва', completed: false },
  ])

  const [selectedStatus, setSelectedStatus] = useState(status[0])

  useEffect(() => {
    reset({
      name: project.name,
      percentageProjectCompletion: project.percentageProjectCompletion,
      deployLink: project.deployLink,
      contactGroupLink: project.contactGroupLink,
      gitHubLink: project.gitHubLink,
      designLink: project.designLink,
    })
    setSelectedStatus(project.status)
    setDescription(project.description)
    setTechnologies(project.technologies ?? [])
    setWorkPlanPlan(project.workPlan ?? [])
    setLookingInTeam(project.lookingInTeam ?? [])
    // eslint-disable-next-line
  }, [project])

  const handleLogoChange = (e: any) => {
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

  const handleAddPlanItem = () => {
    if (planInput.trim() !== '') {
      setWorkPlanPlan([
        ...workPlan,
        { text: planInput.trim(), completed: false },
      ])
      setPlanInput('')
    }
  }

  const handleRemovePlanItem = (index: number) => {
    const updatedPlan = workPlan.filter((_, i) => i !== index)
    setWorkPlanPlan(updatedPlan)
  }

  const handleToggleCompleted = (index: number) => {
    const updatedPlan = workPlan.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item,
    )
    setWorkPlanPlan(updatedPlan)
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

  const handleAddLookingInTeam = () => {
    if (lookingInTeamInput.trim() !== '') {
      setLookingInTeam([...lookingInTeam, lookingInTeamInput.trim()])
      setLookingInTeamInput('')
    }
  }

  const handleRemoveLookingInTeam = (index: number) => {
    const updatedTeam = lookingInTeam.filter((_, i) => i !== index)
    setLookingInTeam(updatedTeam)
  }

  const handleChangeStatus = (event: any) => {
    setSelectedStatus(event.target.value)
  }

  const onSubmit: SubmitHandler<any> = async (data: any, event: any) => {
    setLoading(true)
    const action = event.nativeEvent.submitter.name
    const id = project._id
    const userId = user._id
    const adminId = `${process.env.NEXT_PUBLIC_ADMIN_ID}`

    let imageBase64 = null
    if (image) {
      imageBase64 = await convertToBase64(image)
    }

    const sendData = {
      name: data.name,
      description: description,
      technologies: technologies,
      workPlan: workPlan,
      lookingInTeam: lookingInTeam,
      percentageProjectCompletion: +data.percentageProjectCompletion,
      deployLink: data.deployLink,
      gitHubLink: data.gitHubLink,
      designLink: data.designLink,
      contactGroupLink: data.contactGroupLink,
      status: selectedStatus,
      isPublic: isSuperAdmin,
      logo: imageBase64,
    }
    let result
    if (action === 'create') {
      result = await createProject(userId, adminId, sendData)
    } else if (action === 'update') {
      result = await updateProject(id, sendData)
    }
    if (result?.success) {
      toast('Повідомлення надіслано', {
        type: 'success',
      })
      reset()
    } else {
      toast('Щось трапилось, це сумно!', {
        type: 'error',
      })
    }
    setLoading(false)
  }

  return (
    <div>
      {loading && <Loader />}
      <div>Зміни може вносити: засновник, ментор</div>

      <div>
        <div className="z-10 mb-4 transition-all duration-300 ease-in-out">
          {project.logo ? (
            <Image
              src={project.logo}
              alt={`project logo  `}
              width={48}
              height={48}
              className="size-12 rounded-full"
            />
          ) : (
            <RxAvatar className="size-12" />
          )}
        </div>
        <div className="flex flex-col items-start">
          <div>{project.logo ? <>Змінити логотип</> : <>Додати логотип</>}</div>
          <label
            htmlFor="logo-upload"
            className="mt-1 inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Вибрати файл
          </label>
          <input
            id="logo-upload"
            type="file"
            className="hidden"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleLogoChange}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type={'text'}
          placeholder={'Назва проєкту'}
          name={'name'}
          register={{
            ...register('name', {
              required: `${t('This field is required')}`,
              minLength: {
                value: 4,
                message: `${t('Minimum number of characters')} 4`,
              },
              maxLength: {
                value: 250,
                message: `${t('Maximum number of characters')} 50`,
              },
            }),
          }}
          error={errors.name?.message}
        />

        <div className="mt-2">
          <CustomToolbarQuill />
          <ReactQuill
            theme="snow"
            placeholder={'Опис проєкту'}
            value={description}
            onChange={(value) => setDescription(value)}
            modules={{ toolbar: { container: '#toolbar' } }}
            style={{ height: '300px' }}
            className="min-h-[300px] w-full rounded-b-lg border-gray-300 bg-white p-2 text-black shadow-sm"
          />
        </div>

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

        <select
          value={selectedStatus}
          onChange={handleChangeStatus}
          className="my-1 w-full rounded-md border border-gray-300 bg-transparent px-5 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {status.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div>
          <h2 className="text-2xl font-bold">Недалекі плани</h2>
          <div className="flex flex-wrap gap-4">
            {workPlan.map((item, index) => (
              <div
                key={index}
                className="flex max-w-max items-center rounded-lg bg-blue-500 p-2"
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleToggleCompleted(index)}
                  className="mr-2"
                />
                <p className={item.completed ? 'line-through' : ''}>
                  {item.text}
                </p>
                <AdminButton
                  onClick={() => handleRemovePlanItem(index)}
                  className="ml-2"
                >
                  <MdDelete />
                </AdminButton>
              </div>
            ))}
          </div>
          <Input
            type={'text'}
            placeholder={'План розробки'}
            value={planInput}
            onChange={(e) => setPlanInput(e.target.value)}
          />
          <AdminButton onClick={handleAddPlanItem} className="mt-3">
            Додати до плану
          </AdminButton>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Шукаю в команду</h2>
          <div className="flex flex-wrap gap-4">
            {lookingInTeam.map((teamMember, index) => (
              <div
                key={index}
                className="flex max-w-max items-center rounded-lg bg-blue-500 p-2"
              >
                <p>{teamMember}</p>
                <AdminButton
                  className="ml-2"
                  onClick={() => handleRemoveLookingInTeam(index)}
                >
                  <MdDelete />
                </AdminButton>
              </div>
            ))}
          </div>
          <Input
            type={'text'}
            placeholder={'Додати новий запит для команди'}
            value={lookingInTeamInput}
            onChange={(e) => setLookingInTeamInput(e.target.value)}
          />
          <AdminButton onClick={handleAddLookingInTeam} className="mt-3">
            Додати запит
          </AdminButton>
        </div>

        <Input
          type={'number'}
          placeholder={'відсоток завершення проєкту'}
          name={'percentageProjectCompletion'}
          min={1}
          max={100}
          register={{
            ...register('percentageProjectCompletion', {
              required: `${t('This field is required')}`,
              minLength: {
                value: 1,
                message: `${t('Minimum number of characters')} 1`,
              },
              maxLength: {
                value: 3,
                message: `${t('Maximum number of characters')} 3`,
              },
            }),
          }}
          error={errors.percentageProjectCompletion?.message}
        />
        <Input
          type={'text'}
          placeholder={'Посилання на деплой'}
          name={'deployLink'}
          register={{
            ...register('deployLink', {
              minLength: {
                value: 1,
                message: `${t('Minimum number of characters')} 1`,
              },
              maxLength: {
                value: 350,
                message: `${t('Maximum number of characters')} 350`,
              },
            }),
          }}
          error={errors.deployLink?.message}
        />

        <Input
          type={'text'}
          placeholder={'Посилання на гітхаб'}
          name={'gitHubLink'}
          register={{
            ...register('gitHubLink', {
              minLength: {
                value: 1,
                message: `${t('Minimum number of characters')} 1`,
              },
              maxLength: {
                value: 350,
                message: `${t('Maximum number of characters')} 350`,
              },
            }),
          }}
          error={errors.gitHubLink?.message}
        />

        <Input
          type={'text'}
          placeholder={'Посилання на дизайн'}
          name={'designLink'}
          register={{
            ...register('designLink', {
              minLength: {
                value: 1,
                message: `${t('Minimum number of characters')} 1`,
              },
              maxLength: {
                value: 350,
                message: `${t('Maximum number of characters')} 350`,
              },
            }),
          }}
          error={errors.designLink?.message}
        />
        <Input
          type={'text'}
          placeholder={'Группа для участі: посилання (телеграм)'}
          name={'contactGroupLink'}
          register={{
            ...register('contactGroupLink', {
              required: `${t('This field is required')}`,
              minLength: {
                value: 1,
                message: `${t('Minimum number of characters')} 1`,
              },
              maxLength: {
                value: 350,
                message: `${t('Maximum number of characters')} 350`,
              },
            }),
          }}
          error={errors.contactGroupLink?.message}
        />
        <AdminButton type="submit" name={isCrate ? 'create' : 'update'}>
          {isCrate ? 'Створити' : 'Save'}
        </AdminButton>
      </form>
    </div>
  )
}
