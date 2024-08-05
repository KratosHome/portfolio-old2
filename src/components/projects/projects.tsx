'use client'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

export const Projects: FC<any> = ({ projects }) => {
  const t = useTranslations('project')
  return (
    <section aria-label="projects" id="projects">
      <div className="relative mx-auto mb-[140px] mt-[120px] max-w-[1442px] px-[24px]">
        <h2 className="mr-[90px] text-right text-[40px] font-light uppercase lg:text-[96px]">
          {t('project')}
        </h2>
        <div className="mt-[73px] flex flex-wrap justify-center">
          <div className="h-[552px] w-[398px]" />
          {projects.map((project: any, index: number) => (
            <a key={index} href={project.link} target="_blank">
              <div className="relative m-4 flex h-[552px] w-[398px] flex-col justify-between rounded-lg border-b border-black bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0.00)] px-[16px] py-[24px] backdrop-blur-[12.5px]">
                <div
                  className="absolute right-0 top-0 h-[150px] w-[150px] animate-pulse bg-group-pattern"
                  style={{
                    animationDelay: `${index * 0.5}s`,
                    backgroundColor: 'transparent  !important',
                    opacity: '0.1 !important',
                  }}
                />
                <h3 className="text-[60px] font-light leading-[0.9]">
                  {project.title}
                </h3>
                <div className="text-[20px] font-bold text-[#0B66F5]">
                  cooperation with: &quot;{project.company}&quot;
                </div>
                <div className="flex justify-between border-t-[1px] border-amber-50">
                  <div className="[153deg,rgba(255,255,255,0.12)_2.19%,rgba(255,255,255,0)_99.21%] flex size-[34px] items-center justify-center rounded-full border border-stone-500/30 bg-gradient-to-r to-white/0"></div>
                  <div>0{index + 1}</div>
                </div>
              </div>
            </a>
          ))}
          <div className="h-[552px] w-[398px]" />
        </div>
      </div>
    </section>
  )
}
