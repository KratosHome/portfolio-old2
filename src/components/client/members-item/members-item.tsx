'use client'
import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { RxAvatar } from 'react-icons/rx'
import linkedin from '@/assets/icons/linkedin.svg'
import linkedinLight from '@/assets/icons/linkedinLight.svg'
import gitHub from '@/assets/icons/github.svg'
import gitHubLight from '@/assets/icons/githubLight.svg'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { base64ToFile } from '@/utils/base64ToFile'
import { useTranslations } from 'next-intl'
import { ButtonCircle } from '@/components/UI/client/button-circle/button-circle'

interface MembersItemProps {
  item: any
}

const MembersItem: FC<MembersItemProps> = ({ item }) => {
  const t = useTranslations('projects-client')
  const router = useRouter()
  const { theme } = useTheme()

  const truncateText = (text: any, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'
    }
    return text
  }

  const truncatedContent = truncateText(item.aboutMe, 1550)

  const openResume = () => {
    const pdfFile = base64ToFile(item.resume, `${item.username}.pdf`)
    if (pdfFile) {
      const fileURL = URL.createObjectURL(pdfFile)
      window.open(fileURL, '_blank')
    } else {
      toast.error('Файл PDF не вибрано')
    }
  }

  console.log(item)

  return (
    <div className="background-item-no-hover relative mb-[24px] overflow-hidden rounded-2xl border border-stone-500/30 px-[24px] py-[12px]">
      <div className="relative mt-[15px] h-[20px] w-full rounded-[50px] border-t border-white/30">
        <div
          className="absolute left-0 top-0 h-[10px] w-[1px] border-l border-white/30"
          style={{ visibility: 'hidden' }}
        />
        <div
          className="absolute right-0 top-0 h-[10px] w-[1px] border-r border-white/30"
          style={{ visibility: 'hidden' }}
        />
      </div>
      <div className="mt-[4px] flex justify-between">
        <div className="flex items-center">
          <Link
            href={`${item._id}`}
            className="z-10 mb-4 mr-[53px] transition-all duration-300 ease-in-out hover:scale-105 hover:text-blue-500"
          >
            {item.userLogo ? (
              <Image
                src={item.userLogo}
                alt={`user logo  ${item.username}`}
                width={100}
                height={100}
                className="size-[100px] rounded-full object-cover"
              />
            ) : (
              <RxAvatar className="size-12" />
            )}
          </Link>
          <div className="leading-[1.1]">
            <div className="text-[60px] font-light">{item.username}</div>
            <div className="z text-[#0B66F5]">
              Experience: {item.workExperience} years
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="mr-[24px] mt-3 flex">
            <a
              href={item.gitHubLink}
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label="GitHub"
            >
              <Image
                className="!fill-amber-700 !stroke-red-500 transition-transform duration-300 hover:scale-[1.2]"
                src={theme === 'light' ? gitHubLight : gitHub}
                alt="github"
                width={24}
                height={24}
              />
            </a>
            <a
              className="block"
              href={item.linkedinLink}
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label="LinkedIn"
            >
              <Image
                className="transition-transform duration-300 hover:scale-[1.2]"
                src={theme === 'light' ? linkedinLight : linkedin}
                alt="linkedin"
                width={24}
                height={24}
              />
            </a>
          </div>
          <div>
            <div>
              <div className="px-3 text-[24px] uppercase text-[#0B66F5]">
                {item.role}
              </div>

              <div className="relative -mt-4 h-[20px] w-full rounded-[50px] border-b border-white/30">
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
            <div className="text-right capitalize">{item.experienceLevel}</div>
          </div>
        </div>
      </div>
      <div className="my-[23px] flex w-full">
        <div className="mr-[24px] w-[170px] text-[#0B66F5]">About</div>
        <article
          className="custom-article-style mb-[12px] font-light"
          dangerouslySetInnerHTML={{ __html: truncatedContent }}
        />
      </div>
      <div className="h-[1px] w-full bg-stone-500/30" />
      <div className="my-[23px] flex w-full">
        <div className="mr-[24px] w-[170px] text-[#0B66F5]">Technologies</div>
        <div className="flex flex-wrap gap-2">
          {item.technologies.map((tech: any, index: number) => (
            <div key={tech}>
              {tech}
              {index < item.technologies.length - 1 && ','}
            </div>
          ))}
        </div>
      </div>
      <div className="h-[1px] w-full bg-stone-500/30" />

      <div className="mb-[24px] mt-[60px] flex w-full justify-between">
        <div className="w-[200px] text-[20px] text-[#0B66F5]">Projects</div>
        <div className="flex w-full flex-wrap gap-[12px]">
          {item.projects.map((project: any) => {
            const filteredTeam = project.teams.find(
              (team: any) => team.userId === item._id,
            )

            return (
              <div key={project._id}>
                <div className="flex w-[372px] rounded-full border border-stone-500/30 bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] px-[24px] py-[12px] text-[24px] font-bold capitalize backdrop-blur-[12.5px]">
                  <Link
                    href={`projects?id=${project._id}`}
                    className="mr-[18px] cursor-pointer hover:underline"
                  >
                    {project.name}
                  </Link>
                </div>

                {filteredTeam ? (
                  <div className="mr-3 text-right">
                    {t('project involvement')}{' '}
                    {filteredTeam.percentageWorkProject} %
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>

      <div className="h-[1px] w-full bg-stone-500/30" />
      <div className="h-[1px] w-full bg-stone-500/30" />
      <div className="mt-4 flex justify-end">
        <div className="flex flex-wrap gap-[24px]">
          <ButtonCircle title={'RESUME'} onClick={openResume} />
        </div>
      </div>
    </div>
  )
}

export default MembersItem
