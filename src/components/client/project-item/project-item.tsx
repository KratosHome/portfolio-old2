'use client'
import { FC, useState, useEffect } from 'react'
import { Modal } from '@/components/UI/modal/modal'
import { useRouter, useSearchParams } from 'next/navigation'
import { marked } from 'marked'
import { ButtonCircle } from '@/components/UI/button-circle/button-circle'
import { useStore } from '@/store/user'
import { joinProjects } from '@/server/project/join-project.server'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { cn } from '@/utils/cn'
import check from '@/assets/icons/check.svg'

interface ProjectItemProps {
  project: ProjectTypes
  index: number
}

export const ProjectItem: FC<ProjectItemProps> = ({ project, index }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  console.log('project', project)

  const { user } = useStore()

  const [isOpen, setIsOpen] = useState(false)

  const truncateText = (text: any, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'
    }
    return text
  }

  const articleContent = marked.parse(project.description)
  const truncatedContent = truncateText(articleContent, 450)

  useEffect(() => {
    const idFromUrl = searchParams.get('id')
    if (idFromUrl === project._id) {
      setIsOpen(true)
    }
  }, [searchParams, project._id])

  const joinProject = async () => {
    if (user._id) {
      const join = await joinProjects(project._id, user._id)
      if (join.success) {
        toast(`Заявка на учать відправлена, очікуйте підтвердження`, {
          type: 'success',
        })
      } else {
        toast(`Ви вже надіслали заявку на цей проект`, {
          type: 'error',
        })
      }
    } else {
      router.push(`/login`)
    }
  }
  const closeModal = () => {
    setIsOpen(false)
    const currentParams = new URLSearchParams(searchParams.toString())
    currentParams.delete('id')
    router.replace(`?${currentParams.toString()}`, { scroll: false })
  }

  return (
    <div>
      <div className="background-item relative mb-[24px] overflow-hidden rounded-2xl border border-stone-500/30 px-[24px] py-[12px]">
        <div className="flex justify-end">
          <div className="max-w-max rounded-[35px] border-b border-stone-500/30 bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] p-[10px] font-bold text-[#0B66F5] backdrop-blur-[12.5px] lg:absolute">
            {project.status}
          </div>
        </div>
        <div className="flex items-center font-light">
          <span className="text-[64px] text-[#0B66F5] lg:text-[96px]">
            {index < 10 ? '0' : ''}
            {index + 1}
          </span>
          <span className="ml-[16px] block text-[24px] font-light leading-[0.9] lg:ml-[46px] lg:text-[60px]">
            {project.name}
          </span>
        </div>
        <div className="block lg:hidden">
          <article
            className="my-[24px] font-light"
            dangerouslySetInnerHTML={{ __html: truncatedContent }}
          />
          <div className="flex flex-wrap gap-[10px]">
            {project.technologies.map((item: string) => (
              <div
                key={item}
                className="max-w-max rounded-full border-b border-stone-500/30 bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] p-[12px] font-bold backdrop-blur-[12.5px]"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="my-[24px] flex items-center">
            <div className="max-w-max rounded-2xl bg-gradient-to-tr from-[rgba(11,102,245,0.3)] via-[rgba(78,128,206,0.15)] to-transparent px-[24px] py-[16px]">
              WE NEED:
            </div>
            <div className="ml-[16px] flex flex-wrap">
              {project.lookingInTeam?.map((item: any, index: number) => (
                <div key={item} className="mr-[12px] text-[#0B66F5]">
                  {item}
                  {index < project.lookingInTeam!.length - 1 && ','}
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-wrap items-end justify-end gap-[10px] rounded-full">
            {project.logo ? (
              <Image
                width={32}
                height={32}
                src={project.logo}
                alt={`logo ${project.name}`}
                className="size-[32px] rounded-full"
              />
            ) : null}
            <div className="bg-gradient-to-r from-[rgba(11,102,245,0.70)] via-[rgba(78,128,206,0.35)] to-[rgba(255,255,255,0.20)] bg-clip-text text-[24px] text-transparent">
              completed
            </div>
            <div className="text-[64px] leading-[0.9] text-[#0B66F5]">
              {project.percentageProjectCompletion}%
            </div>
          </div>
          <div className="relative -mt-2 h-[20px] w-full rounded-[50px] border-b border-white/30">
            <div
              className="absolute left-0 top-0 h-[10px] w-[1px] border-l border-white/30"
              style={{ visibility: 'hidden' }}
            />
            <div
              className="absolute right-0 top-0 h-[10px] w-[1px] border-r border-white/30"
              style={{ visibility: 'hidden' }}
            />
          </div>
          <div className="mt-[16px] flex min-h-full flex-row items-center justify-center gap-[32px]">
            <ButtonCircle
              title={'join'}
              onClick={joinProject}
              className="bg-black/60"
            />
            <ButtonCircle
              title={'view'}
              onClick={() => {
                setIsOpen(!isOpen)
                router.push(`?id=${project._id}`)
              }}
            />
          </div>
        </div>
        <div className="hidden h-full lg:flex">
          <div className="flex min-h-full flex-col items-end justify-end">
            <ButtonCircle
              title={'join'}
              onClick={joinProject}
              className="bg-black/60"
            />
            <ButtonCircle
              className="mt-[22px]"
              title={'view'}
              onClick={() => {
                setIsOpen(!isOpen)
                router.push(`?id=${project._id}`)
              }}
            />
          </div>
          <div className="ml-[46px] flex w-full flex-col justify-between">
            <div>
              <article
                className="mb-[12px] font-light"
                dangerouslySetInnerHTML={{ __html: truncatedContent }}
              />
              <div className="flex flex-wrap gap-[12px]">
                {project.technologies.map((item: string) => (
                  <div
                    key={item}
                    className="max-w-max rounded-full border-b border-stone-500/30 bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] p-[24px] font-bold backdrop-blur-[12.5px]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-[12px] h-[1px] w-full bg-white/50" />
            <div className="mt-[28px] flex w-full flex-col justify-between">
              <div className="flex flex-wrap items-center">
                <div className="max-w-max rounded-2xl bg-gradient-to-tr from-[rgba(11,102,245,0.3)] via-[rgba(78,128,206,0.15)] to-transparent px-[24px] py-[12px]">
                  WE NEED:
                </div>
                <div className="ml-[42px] flex flex-wrap">
                  {project.lookingInTeam?.map((item: any, index: number) => (
                    <div key={item} className="mr-[12px] text-[#0B66F5]">
                      {item}
                      {index < project.lookingInTeam!.length - 1 && ','}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex w-full items-end justify-end gap-[10px] rounded-full">
                {project.logo ? (
                  <Image
                    width={40}
                    height={40}
                    src={project.logo}
                    alt={`logo ${project.name}`}
                    className="size-[40px] rounded-full"
                  />
                ) : null}
                <div className="bg-gradient-to-r from-[rgba(11,102,245,0.70)] via-[rgba(78,128,206,0.35)] to-[rgba(255,255,255,0.20)] bg-clip-text text-[32px] text-transparent">
                  completed
                </div>
                <div className="text-[90px] leading-[0.9] text-[#0B66F5]">
                  {project.percentageProjectCompletion}%
                </div>
              </div>
              <div className="relative -mt-2 h-[20px] w-full rounded-[50px] border-b border-white/30">
                <div
                  className="absolute left-0 top-0 h-[10px] w-[1px] border-l border-white/30"
                  style={{ visibility: 'hidden' }}
                />
                <div
                  className="absolute right-0 top-0 h-[10px] w-[1px] border-r border-white/30"
                  style={{ visibility: 'hidden' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="background-item-no-hover w-[90%] max-w-[1442px] overflow-auto"
      >
        <div>
          <div className="flex justify-end">
            <div className="max-w-max rounded-[35px] border-b border-stone-500/30 bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] p-[10px] font-bold text-[#0B66F5] backdrop-blur-[12.5px]">
              {project.status}
            </div>
          </div>
          <div className="flex items-center font-light">
            <span className="text-[64px] text-[#0B66F5] lg:text-[96px]">
              {index < 10 ? '0' : ''}
              {index + 1}
            </span>
            <span className="ml-[16px] block text-[24px] font-light leading-[0.9] lg:ml-[46px] lg:text-[60px]">
              {project.name}
            </span>
          </div>
          <div className="mb-[24px] mt-[60px] flex">
            <div className="w-1/2 text-[20px] text-[#0B66F5]">description</div>
            <article
              className="font-light"
              dangerouslySetInnerHTML={{ __html: truncatedContent }}
            />
          </div>
          <div className="mt-[12px] h-[1px] w-full bg-white/50" />
          <div className="mb-[24px] mt-[60px] flex">
            <div className="w-1/2 text-[20px] text-[#0B66F5]">description</div>
            <div className="flex flex-wrap gap-[12px]">
              {project.technologies.map((item: string) => (
                <div
                  key={item}
                  className="max-w-max rounded-full border-b border-stone-500/30 bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] p-[24px] font-bold backdrop-blur-[12.5px]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-[12px] h-[1px] w-full bg-white/50" />
          <div className="mb-[24px] mt-[60px] flex">
            <div className="w-1/2 text-[20px] text-[#0B66F5]">
              development phases
            </div>
            <div>
              {project.workPlan.map((item: any, index: number) => (
                <div key={item.id} className="mb-[4px] flex items-center">
                  <div
                    className={cn(
                      'mr-[12px] size-[24px] min-w-[24px] rounded-full border border-white bg-transparent',
                      item.completed && 'border-[#0B66F5]',
                    )}
                  >
                    {item.completed && (
                      <Image src={check} alt="check" className="p-1" />
                    )}
                  </div>
                  <div
                    className={cn(
                      '',
                      item.completed && 'text-[#0B66F5] line-through',
                    )}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-[12px] h-[1px] w-full bg-white/50" />
          <div className="mb-[24px] mt-[60px] flex">
            <div className="w-1/2 text-[20px] text-[#0B66F5]">project team</div>
            <div className="flex flex-wrap gap-[12px]">
              {project.teams.map((itemTeam: any) => (
                <div key={itemTeam._id}>
                  <div className="flex w-[372px] rounded-full border border-stone-500/30 bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] px-[24px] py-[12px] text-[24px] font-bold capitalize backdrop-blur-[12.5px]">
                    <div className="mr-[18px] cursor-pointer text-[#0B66F5] hover:underline">
                      {itemTeam.user.username}
                    </div>
                    <div>{itemTeam.user.role}</div>
                  </div>
                  <div className="mr-3 text-right">
                    project involvement {itemTeam.percentageWorkProject} %
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-[12px] h-[1px] w-full bg-white/50" />
          <div className="my-[24px] flex items-center">
            <div className="max-w-max rounded-2xl bg-gradient-to-tr from-[rgba(11,102,245,0.3)] via-[rgba(78,128,206,0.15)] to-transparent px-[24px] py-[16px]">
              WE NEED:
            </div>
            <div className="ml-[16px] flex flex-wrap">
              {project.lookingInTeam?.map((item: any, index: number) => (
                <div key={item} className="mr-[12px] text-[#0B66F5]">
                  {item}
                  {index < project.lookingInTeam!.length - 1 && ','}
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-wrap items-end justify-end gap-[10px] rounded-full">
            {project.logo ? (
              <Image
                width={32}
                height={32}
                src={project.logo}
                alt={`logo ${project.name}`}
                className="size-[32px] rounded-full"
              />
            ) : null}
            <div className="bg-gradient-to-r from-[rgba(11,102,245,0.70)] via-[rgba(78,128,206,0.35)] to-[rgba(255,255,255,0.20)] bg-clip-text text-[24px] text-transparent">
              completed
            </div>
            <div className="text-[64px] leading-[0.9] text-[#0B66F5]">
              {project.percentageProjectCompletion}%
            </div>
            <ButtonCircle title={'join'} onClick={joinProject} />
          </div>
        </div>
      </Modal>
    </div>
  )
}
