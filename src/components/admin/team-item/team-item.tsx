'use client'
import { FC } from 'react'
import { AdminButton } from '@/components/UI/admin-button/admin-button'
import { acceptUserProject } from '@/server/project/accept-user-project.server'
import { toast } from 'react-toastify'
import { rejectUserProject } from '@/server/project/reject-user-project.server'
import { useStore } from '@/store/user'
import { projectStore } from '@/store/project'
import { Input } from '@/components/UI/input/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { updateRatingUsers } from '@/server/users/update-rating-user.server'
import { removeFromTeamServer } from '@/server/project/remove-from-team.server'

export const TeamItem: FC<any> = ({ item }) => {
  const { user, fetchUser } = useStore()
  const { fetchProjects } = projectStore()
  const t = useTranslations('footer')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>()

  console.log(item)
  const accept = async (userId: string) => {
    const accept = await acceptUserProject(item._id, userId)
    if (accept.success) {
      await fetchProjects(user._id)
      await fetchUser(user)
      toast.success('Користувача успішно додано до проєкту')
    } else {
      toast.error('Помилка при додаванні користувача до проєкту')
    }
  }

  const reject = async (userId: string) => {
    const accept = await rejectUserProject(item._id, userId)
    if (accept.success) {
      toast.success('Користувача успішно відхилено від проєкту')
    } else {
      toast.error('Помилка при відхиленні користувача від проєкту')
    }
  }

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    const sendData = {
      rating: data.rating,
      projects: {
        id: item._id,
        percentageWorkProject: data.percentageProjectCompletion,
      },
    }
    const updateRating = await updateRatingUsers(user._id, sendData)
    if (updateRating.success) {
      toast.success('Рейтинг користувача успішно оновлено')
    } else {
      toast.error('Помилка при оновленні рейтингу користувача')
    }
  }

  const removeFromTeam = async () => {
    const remove = await removeFromTeamServer(user._id, item._id)

    if (remove.success) {
      await fetchProjects(user._id)
      await fetchUser(user.email)
      toast.success('Користувача успішно видалено з проєкту')
    } else {
      toast.error('Помилка при видаленні користувача з проєкту')
    }
  }
  return (
    <div className="rounded-md p-4 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">{item.name}</h2>
      {item.newUsers.length > 0 && (
        <>
          <h3 className="mb-2 text-center text-xl font-semibold">
            Запрос на участь в проєкті
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {item.newUsers.map((user: UserTypes) => (
              <div
                key={user._id}
                className="max-w-max rounded-md border border-amber-800 p-4 shadow-sm"
              >
                <div className="mb-2 grid grid-cols-2 gap-2">
                  <div className="font-semibold">Імя:</div>
                  <div>{user.username}</div>
                  <div className="font-semibold">Роль:</div>
                  <div>{user.role}</div>
                  <div className="font-semibold">Контакт:</div>
                  <div>{user.contactLink}</div>
                  <div className="font-semibold">Email:</div>
                  <div>{user.email}</div>
                  <div className="font-semibold">GitHub:</div>
                  <div>{user.gitHubLink}</div>
                  <div className="font-semibold">Про мене:</div>
                  <div>{user.aboutMe}</div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <div className="font-semibold">Технології:</div>
                  <div className="flex flex-wrap gap-2">
                    {user.technologies.map((tech) => (
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
                    {user.portfolioLinks.map((link) => (
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
                <div className="flex justify-between">
                  <AdminButton onClick={() => accept(user._id)}>
                    Прийняти
                  </AdminButton>
                  <AdminButton onClick={() => reject(user._id)}>
                    Відхилити
                  </AdminButton>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {item.team.length > 0 && (
        <div>
          <h3 className="mb-2 text-center text-xl font-semibold">
            Моя команда
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {item.newUsers.map((user: UserTypes) => (
              <div
                key={user._id}
                className="relative max-w-max rounded-md border p-4 shadow-sm"
              >
                <div className="mb-2 grid grid-cols-2 gap-2">
                  <div className="font-semibold">Імя:</div>
                  <div>{user.username}</div>
                  <div className="font-semibold">Роль:</div>
                  <div>{user.role}</div>
                  <div className="font-semibold">Контакт:</div>
                  <div>{user.contactLink}</div>
                  <div className="font-semibold">Email:</div>
                  <div>{user.email}</div>
                  <div className="font-semibold">GitHub:</div>
                  <div>{user.gitHubLink}</div>
                  <div className="font-semibold">Про мене:</div>
                  <div>{user.aboutMe}</div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <div className="font-semibold">Технології:</div>
                  <div className="flex flex-wrap gap-2">
                    {user.technologies.map((tech) => (
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
                    {user.portfolioLinks.map((link) => (
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
                    type={'number'}
                    placeholder={'Рейтинг'}
                    name={'rating'}
                    min={1}
                    max={5}
                    register={{
                      ...register('rating', {
                        required: `${t('This field is required')}`,
                        minLength: {
                          value: 1,
                          message: `${t('Minimum number of characters')} 1`,
                        },
                        maxLength: {
                          value: 1,
                          message: `${t('Maximum number of characters')} 1`,
                        },
                      }),
                    }}
                    error={errors.rating?.message}
                  />
                  <AdminButton className="mt-2">Зберігти</AdminButton>
                </form>
                <AdminButton
                  className="absolute bottom-3 right-4"
                  onClick={removeFromTeam}
                >
                  Видалити
                </AdminButton>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
