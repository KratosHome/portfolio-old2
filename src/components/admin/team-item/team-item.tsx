'use client'
import { FC, useEffect, useState } from 'react'
import { acceptUserProject } from '@/server/project/accept-user-project.server'
import { toast } from 'react-toastify'
import { rejectUserProject } from '@/server/project/reject-user-project.server'
import { projectStore } from '@/store/project'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { removeFromTeamServer } from '@/server/project/remove-from-team.server'
import { updateProjectUser } from '@/server/project/update-users-priject'
import { Loader } from '@/components/UI/client/loader/loader'
import { Input } from '@/components/UI/client/input/input'
import { AdminButton } from '@/components/UI/client/admin-button/admin-button'

export const TeamItem: FC<any> = ({ projectId, item, isNewUser }) => {
  const { fetchProjects } = projectStore()
  const t = useTranslations('footer')

  console.log('item', item)
  const [loading, setLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>()

  useEffect(() => {
    reset({
      percentageProjectCompletion: item.percentageWorkProject,
      rating: item.rating2,
    })
    // eslint-disable-next-line
  }, [item])

  const accept = async (userId: string) => {
    const accept = await acceptUserProject(projectId, userId)
    if (accept.success) {
      await fetchProjects(item._id)
      toast.success('Користувача успішно додано до проєкту')
    } else {
      toast.error('Помилка при додаванні користувача до проєкту')
    }
  }

  const reject = async (userId: string) => {
    const accept = await rejectUserProject(projectId, userId)
    if (accept.success) {
      toast.success('Користувача успішно відхилено від проєкту')
    } else {
      toast.error('Помилка при відхиленні користувача від проєкту')
    }
  }

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    setLoading(true)
    const sendData = {
      teams: {
        userId: item._id,
        rating: data.rating,
        percentageWorkProject: data.percentageProjectCompletion,
      },
    }
    const updateRating = await updateProjectUser(item._id, projectId, sendData)
    if (updateRating.success) {
      toast.success('Рейтинг користувача успішно оновлено')
    } else {
      toast.error('Помилка при оновленні рейтингу користувача')
    }
    setLoading(false)
  }

  const removeFromTeam = async () => {
    const remove = await removeFromTeamServer(item._id, projectId)

    if (remove.success) {
      await fetchProjects(item._id)
      toast.success('Користувача успішно видалено з проєкту')
    } else {
      toast.error('Помилка при видаленні користувача з проєкту')
    }
  }
  return (
    <div className="rounded-md p-4 shadow-md">
      {loading && <Loader />}
      <div className="grid grid-cols-1 gap-4">
        <div className="max-w-max rounded-md border border-amber-800 p-4 shadow-sm">
          <div className="mb-2 grid grid-cols-2 gap-2">
            <div className="font-semibold">Імя:</div>
            <div>{item.username}</div>
            <div className="font-semibold">Роль:</div>
            <div>{item.role}</div>
            <div className="font-semibold">Контакт:</div>
            <div>{item.contactLink}</div>
            <div className="font-semibold">Email:</div>
            <div>{item.email}</div>
            <div className="font-semibold">GitHub:</div>
            <div>{item.gitHubLink}</div>
            <div className="font-semibold">Про мене:</div>
            <div>{item.aboutMe}</div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="font-semibold">Технології:</div>
            <div className="flex flex-wrap gap-2">
              {item.technologies.map((tech: any) => (
                <span
                  key={tech}
                  className="rounded-md bg-blue-100 px-2 py-1 text-blue-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-2 grid grid-cols-1 gap-2">
            <div className="font-semibold">Портфоліо:</div>
            <div className="flex flex-wrap gap-2">
              {item.portfolioLinks.map((link: any) => (
                <a
                  key={link}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          {!isNewUser && (
            <div className="">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  type={'number'}
                  placeholder={'відсоток робіт над проєктом'}
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
                  placeholder={'Рейтинг'}
                  name={'rating'}
                  register={{
                    ...register('rating', {
                      required: `${t('This field is required')}`,
                      validate: {
                        isDecimal: (value) =>
                          !isNaN(value) &&
                          parseFloat(value) >= 1 &&
                          parseFloat(value) <= 5
                            ? true
                            : `${t('Please enter a valid rating between 1 and 5')}`,
                      },
                    }),
                  }}
                  error={errors.rating?.message}
                />
                <AdminButton className="mt-2" type={'submit'}>
                  Зберігти
                </AdminButton>
              </form>
              <AdminButton
                className="bottom-3 right-4"
                onClick={removeFromTeam}
              >
                Видалити
              </AdminButton>
            </div>
          )}
          {isNewUser && (
            <div className="flex justify-between">
              <AdminButton onClick={() => accept(item._id)}>
                Прийняти
              </AdminButton>
              <AdminButton onClick={() => reject(item._id)}>
                Відхилити
              </AdminButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
