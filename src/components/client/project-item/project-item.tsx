'use client'
import './project-item.scss'
import { FC, useState, useEffect } from 'react'
import { Modal } from '@/components/UI/modal/modal'
import { useRouter, useSearchParams } from 'next/navigation'
import { marked } from 'marked'
import { ButtonCircle } from '@/components/UI/button-circle/button-circle'
import Link from 'next/link'
import { useStore } from '@/store/user'
import { joinProjects } from '@/server/project/join-project.server'
import { toast } from 'react-toastify'
import Image from 'next/image'

interface ProjectItemProps {
  project: ProjectTypes
  index: number
}

export const ProjectItem: FC<ProjectItemProps> = ({ project, index }) => {
  console.log('project', project)
  const router = useRouter()
  const searchParams = useSearchParams()

  const { user } = useStore()

  const [isOpen, setIsOpen] = useState(false)

  const truncateText = (text: string, maxLength: number) => {
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
  console.log('project', project)

  return (
    <div className="project-item relative mb-[24px] overflow-hidden rounded-2xl border border-stone-500/30 px-[24px] py-[12px]">
      <div>
        <div className="flex justify-end">
          <div className="max-w-max rounded-[35px] border-b border-stone-500/30 bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] p-[10px] font-bold text-[#0B66F5] backdrop-blur-[12.5px]">
            {project.status}
          </div>
        </div>
        <div className="flex items-center font-light">
          <span className="text-[96px] text-[#0B66F5]">
            {index < 10 ? '0' : ''}
            {index + 1}
          </span>
          <span className="ml-[46px] block text-[60px] font-light leading-[0.9]">
            {project.name}
          </span>
        </div>
        <div className="flex">
          <div className="mt-[158px]">
            <ButtonCircle
              title={'join'}
              onClick={joinProject}
              className="bg-transparent"
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
          <div className="ml-[46px]">
            <article
              className="mb-[12px] font-light"
              dangerouslySetInnerHTML={{ __html: truncatedContent }}
            />
            <div className="flex flex-wrap gap-[12px]">
              {project.technologies.map((item: string) => (
                <div
                  key={item}
                  className="max-w-max rounded-[35px] border-b border-stone-500/30 bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] p-[10px] font-bold text-[#0B66F5] backdrop-blur-[12.5px]"
                >
                  {item}
                </div>
              ))}
              <div className="mt-[12px] h-[1px] w-full bg-white/50" />
              <div className="flex flex-wrap items-center">
                <div class="max-w-max rounded-2xl bg-gradient-to-tr from-[rgba(11,102,245,0.3)] via-[rgba(78,128,206,0.15)] to-transparent px-[24px] py-[12px]">
                  WE NEED:
                </div>
                <div className="ml-[42px] flex flex-wrap">
                  {project.lookingInTeam.map((item: string, index: number) => (
                    <div key={item} className="mr-[12px] text-[#0B66F5]">
                      {item}
                      {index < project.lookingInTeam.length - 1 && ','}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex w-full items-center justify-end">
                {project.logo ? (
                  <Image
                    width={40}
                    height={40}
                    src={project.logo}
                    alt={`logo ${project.name}`}
                    className="size-[40px] rounded-full"
                  />
                ) : null}
                <span>completed</span>
                <div className="text-[90px] text-[#0B66F5]">
                  {project.percentageProjectCompletion}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        fdsvdffvsdf df f sfd
      </Modal>
    </div>
  )
}
