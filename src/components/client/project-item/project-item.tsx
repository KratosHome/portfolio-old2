'use client'

import { FC, useState, useEffect } from 'react'
import { Modal } from '@/components/UI/modal/modal'
import { useRouter, useSearchParams } from 'next/navigation'
import { marked } from 'marked'
import { ButtonCircle } from '@/components/UI/button-circle/button-circle'
import Link from 'next/link'
import { useStore } from '@/store/user'
import { joinProjects } from '@/server/project/join-project.server'
import { toast } from 'react-toastify'

interface ProjectItemProps {
  project: ProjectTypes
  index: number
}

export const ProjectItem: FC<ProjectItemProps> = ({ project, index }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { user } = useStore()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const idFromUrl = searchParams.get('id')
    if (idFromUrl === project._id) {
      setIsOpen(true)
    }
  }, [searchParams, project._id])

  const articleContent = marked.parse(project.description)

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

  return (
    <div>
      <div>
        <div className="text-right">{project.status}</div>
        <div className="font-light">
          <span className="text-[96px] text-[#0B66F5]">{index + 1}</span>
          <span className="text-[60px]">{project.name}</span>
        </div>
        <div className="flex">
          <div>
            <ButtonCircle title={'join'} onClick={joinProject} />

            <ButtonCircle
              title={'view'}
              onClick={() => {
                setIsOpen(!isOpen)
                router.push(`?id=${project._id}`)
              }}
            />
          </div>
          <article dangerouslySetInnerHTML={{ __html: articleContent }} />
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        fdsvdffvsdf df f sfd
      </Modal>
    </div>
  )
}
