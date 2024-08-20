import { ChangeEvent, FC, useEffect, useState } from 'react'
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

interface PlanItem {
  text: string
  completed: boolean
}

interface ProjectItemProps {
  project: ProjectTypes | any
  isCrate?: boolean
}

const CustomToolbar = () => (
  <div id="toolbar" className="flex space-x-2 rounded-t-lg !bg-gray-100 p-2">
    <button className="ql-bold">B</button>
    <button className="ql-italic">I</button>
    <button className="ql-underline">U</button>
    <button className="ql-list" value="ordered"></button>
    <button className="ql-list" value="bullet"></button>
    <select className="ql-header">
      <option value="1"></option>
      <option value="2"></option>
      <option value="3"></option>
      <option value="4"></option>
      <option value="5"></option>
      <option value="6"></option>
      <option value=""></option>
    </select>
    <button className="ql-image"></button>
  </div>
)

export const ProjectItem: FC<ProjectItemProps> = ({ project, isCrate }) => {
  const t = useTranslations('footer')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>()

  const [loading, setLoading] = useState<boolean | undefined>(false)
  const [image, setImage] = useState<File | null>(null)

  const [description, setDescription] = useState<string>('')

  const [technologyInput, setTechnologyInput] = useState<string>('')
  const [technologies, setTechnologies] = useState<string[]>(['NextJS'])

  const [lookingInTeamInput, setLookingInTeamInput] = useState<string>('')
  const [lookingInTeam, setLookingInTeam] = useState<string[]>(['NextJS'])

  const [planInput, setPlanInput] = useState<string>('')
  const [workPlan, setWorkPlanPlan] = useState<PlanItem[]>([
    { text: 'міавмва', completed: false },
  ])

  useEffect(() => {
    reset({
      name: project.name,
      percentageProjectCompletion: project.percentageProjectCompletion,
      deployLink: project.deployLink,
      contactGroupLink: project.contactGroupLink,
      gitHubLink: project.gitHubLink,
    })

    setDescription(project.description)
    setTechnologies(project.technologies ?? [])
    setWorkPlanPlan(project.workPlan ?? [])
    setLookingInTeam(project.lookingInTeam ?? [])
  }, [project])

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

  console.log('project', project)
  const onSubmit: SubmitHandler<any> = async (data: any, event: any) => {
    setLoading(true)
    const action = event.nativeEvent.submitter.name
    const id = project._id

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
      gitHubLink: data.githubLink,
      contactGroupLink: data.contactGroupLink,
      // logo: imageBase64,
    }

    let result
    if (action === 'create') {
      result = await createProject(sendData)
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

        <div className="min-h-[200px]">
          <CustomToolbar />
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
          name={'gitHubLink'}
          register={{
            ...register('gitHubLink', {
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
          error={errors.gitHubLink?.message}
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

        <input
          className="file-input__create-post"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <div>Зміни може вносити: засновник, ментор, менеджер</div>
        <AdminButton type="submit" name={isCrate ? 'create' : 'update'}>
          {isCrate ? 'Створити' : 'Save'}
        </AdminButton>
      </form>
    </div>
  )
}
