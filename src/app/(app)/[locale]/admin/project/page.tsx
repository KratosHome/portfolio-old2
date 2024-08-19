'use client'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'
import { Input } from '@/components/UI/input/input'
import { useTranslations } from 'next-intl'
import { AdminButton } from '@/components/UI/admin-button/admin-button'
import { MdDelete } from 'react-icons/md'
import { Donat } from '@/components/UI/donat/donat'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Loader } from '@/components/UI/loader/loader'
import { createProject } from '@/server/project/create-project.server'
import { updateProject } from '@/server/project/update-project.server'
import { convertToBase64 } from '@/utils/convertToBase64'
import { useSession } from 'next-auth/react'
import useFetchUser from '@/hooks/useFetchUser'
import useFetchProject from '@/hooks/useFetchProject'

interface PlanItem {
  text: string
  completed: boolean
}

const Page = () => {
  const t = useTranslations('footer')
  // const { data: session }: any = useSession()
  // const userData: any = useFetchUser(session)
  // const projects: any = useFetchProject(session)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>()

  const isInProject = true
  const isSuperAdmin = true

  const [activeTab, setActiveTab] = useState('1')
  const [loading, setLoading] = useState<boolean | undefined>(false)
  const [image, setImage] = useState<File | null>(null)

  const [planInput, setPlanInput] = useState<string>('')
  const [workPlan, setWorkPlanPlan] = useState<PlanItem[]>([
    { text: 'міавмва', completed: false },
  ])

  const [technologyInput, setTechnologyInput] = useState<string>('')
  const [technologies, setTechnologies] = useState<string[]>(['NextJS'])

  const [lookingInTeamInput, setLookingInTeamInput] = useState<string>('')
  const [lookingInTeam, setLookingInTeam] = useState<string[]>(['NextJS'])

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
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

  const onSubmit: SubmitHandler<any> = async (data: any, event: any) => {
    setLoading(true)
    const action = event.nativeEvent.submitter.name
    const id = '1'

    let imageBase64 = null
    if (image) {
      imageBase64 = await convertToBase64(image)
    }

    const sendData = {
      name: data.name,
      description: data.description,
      technologies: technologies,
      workPlan: workPlan,
      lookingInTeam: lookingInTeam,
      percentageProjectCompletion: +data.percentageProjectCompletion,
      deployLink: data.deployLink,
      groupLink: data.groupLink,
      // logo: imageBase64,
    }

    console.log('sendData', sendData)

    let result
    if (action === 'create') {
      result = await createProject(sendData)
    } else if (action === 'update') {
      result = await updateProject({ id, ...sendData })
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
    <div className="h-full">
      {loading && <Loader />}
      {isInProject ? (
        <div className="h-full px-8">
          <div className="my-4 flex space-x-4">
            <button
              className={`rounded px-4 py-2 ${activeTab === 'newPost' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
              onClick={() => setActiveTab('1')}
            >
              name
            </button>
            <button
              className={`rounded px-4 py-2 ${activeTab === 'myPosts' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
              onClick={() => setActiveTab('2')}
            >
              Назва проект
            </button>
            <button
              className={`rounded px-4 py-2 ${activeTab === 'myPosts' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
              onClick={() => setActiveTab('4')}
            >
              Назва проект
            </button>
          </div>
          <h1 className="text-center text-[50px] font-light">Проєкт</h1>
          {activeTab === '1' && (
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
              <Input
                type={'textarea'}
                placeholder={'Опис проєкту'}
                name={'description'}
                register={{
                  ...register('description', {
                    required: `${t('This field is required')}`,
                    minLength: {
                      value: 4,
                      message: `${t('Minimum number of characters')} 4`,
                    },
                    maxLength: {
                      value: 950,
                      message: `${t('Maximum number of characters')} 50`,
                    },
                  }),
                }}
                error={errors.description?.message}
              />

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
                placeholder={'Посилання на делой'}
                name={'deployLink'}
                register={{
                  ...register('deployLink', {
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
                error={errors.deployLink?.message}
              />
              <Input
                type={'text'}
                placeholder={'Посилання на гітхаб'}
                name={'githubLink'}
                register={{
                  ...register('githubLink', {
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
                error={errors.githubLink?.message}
              />
              <Input
                type={'text'}
                placeholder={'Группа для участі: посилання (телеграм)'}
                name={'groupLink'}
                register={{
                  ...register('groupLink', {
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
                error={errors.groupLink?.message}
              />

              <input
                className="file-input__create-post"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <div>Зміни може вносити: засновник, ментор, менеджер</div>
              <AdminButton type={'submit'} name="update">
                Save
              </AdminButton>
              {isSuperAdmin && (
                <AdminButton type={'submit'} name="create">
                  Create project
                </AdminButton>
              )}
            </form>
          )}
          {activeTab !== '1' && (
            <div>
              <div className="text-center text-2xl">
                Поки доступинйи один проект
              </div>
              <Donat />
            </div>
          )}
        </div>
      ) : (
        <>
          <div>
            <h1>Ви не доєднані до жодного проекту</h1>
            <Link href="/mentoring">Доєднатись до проєкту</Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Page
