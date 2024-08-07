'use client'
import './projects.scss'
import { useTranslations } from 'next-intl'
import { FC, useRef } from 'react'
import arrowAslant from '@/assets/icons/arrow-aslant.svg'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Grid } from 'swiper/modules'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import arrowLong from '@/assets/icons/arrow-long.svg'
import { ButtonCircle } from '@/components/button-circle/button-circle'

export const Projects: FC<any> = ({ projects }) => {
  const t = useTranslations('project')
  const { contextSafe } = useGSAP()
  const projectsRefs = useRef<HTMLDivElement[]>([])
  const iconRefs = useRef<HTMLLIElement[][]>([])
  const descriptionRefs = useRef<HTMLDivElement[]>([])
  const wrapperRef = useRef<HTMLUListElement | null>(null)

  const handleMouseEnter = contextSafe((index: number) => {
    const serviceRef = projectsRefs.current[index]
    const icons = iconRefs.current[index]
    const descriptionRef = descriptionRefs.current[index]

    gsap.to(descriptionRef, {
      height: 'auto',
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    })

    gsap.to(serviceRef, {
      height: 'auto',
      minHeight: '552px',
      duration: 0.3,
      ease: 'power2.out',
    })

    gsap.to(icons, {
      opacity: 1,
      duration: 0.3,
      stagger: 0.1,
      ease: 'power2.out',
    })
  })

  const handleMouseLeave = contextSafe((index: number) => {
    const serviceRef = projectsRefs.current[index]
    const icons = iconRefs.current[index]
    const descriptionRef = descriptionRefs.current[index]

    gsap.to(descriptionRef, {
      height: '0px',
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    })

    gsap.to(serviceRef, {
      height: '552px',
      duration: 0.5,
      ease: 'power2.out',
    })

    gsap.to(icons, {
      opacity: 0,
      duration: 0.3,
      stagger: 0.1,
      ease: 'power2.out',
    })
  })

  return (
    <section aria-label="projects" id="projects">
      <div className="relative mx-auto mb-[140px] mt-[120px] max-w-[1442px] px-[24px]">
        <h2 className="my-0 mr-[20px] text-right text-[40px] font-light uppercase lg:text-[96px]">
          {t('project')}
        </h2>
        <div className="my-[32px] mr-[20px] flex flex-col items-end justify-end">
          <div className="text-[16px] lg:text-[24px]">scroll to see more </div>
          <Image
            className="mr-1 mt-[10px] w-[120px] lg:mr-3 lg:w-[170px]"
            src={arrowLong}
            alt={t('scroll')}
            width={130}
            height={30}
          />
        </div>
        <div className="mt-[51px] hidden w-full xl:block">
          <Swiper
            slidesPerView={3}
            slidesPerGroup={3}
            grid={{
              rows: 2,
              fill: 'row',
            }}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Grid, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
          >
            {projects.map((project: any, index: number) => (
              <SwiperSlide key={project.id}>
                {project.isEmptiness === false ? (
                  <a href={project.link} target="_blank">
                    <div
                      ref={(el: any) => (projectsRefs.current[index] = el!)}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave(index)}
                      className="project-card group relative m-4 flex min-h-[552px] w-[398px] flex-col justify-end gap-[21px] rounded-lg border-b border-black bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0.00)] px-[16px] py-[24px] backdrop-blur-[12.5px] duration-300 hover:justify-between"
                    >
                      <div
                        className="absolute right-0 top-0 h-[150px] w-[150px] animate-pulse bg-group-pattern"
                        style={{
                          animationDelay: `${index * 0.5}s`,
                          backgroundColor: 'transparent  !important',
                          opacity: '0.1 !important',
                        }}
                      />
                      <div className="overflow-hidden">
                        <h3 className="mb-[21px] text-[60px] font-light leading-[0.9] duration-300 group-hover:text-[32px] group-hover:text-[#0B66F5]">
                          {project.title}
                        </h3>
                        <div className="text-[20px] font-bold text-[#0B66F5] duration-300 group-hover:text-right group-hover:text-white">
                          cooperation with: &quot;{project.company}&quot;
                        </div>
                        <div
                          ref={(el: any) =>
                            (descriptionRefs.current[index] = el!)
                          }
                          className="mt-[21px] h-0 text-[20px] font-light opacity-0"
                        >
                          {project.description}
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t-[1px] border-amber-50">
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="[153deg,rgba(255,255,255,0.12)_2.19%,rgba(255,255,255,0)_99.21%] flex size-[50px] items-center justify-center rounded-full border border-stone-500/30 bg-gradient-to-r to-white/0">
                            <Image src={arrowAslant} alt={'arrow link'} />
                          </div>
                          {project.technologies.length >= 1 &&
                            project.technologies.map(
                              (icon: any, iconIndex: number) => (
                                <li
                                  key={icon.id}
                                  ref={(el) => {
                                    if (!iconRefs.current[index]) {
                                      iconRefs.current[index] = []
                                    }
                                    iconRefs.current[index][iconIndex] = el!
                                  }}
                                  style={{ opacity: 0 }}
                                >
                                  <Image
                                    src={icon.icon}
                                    alt={icon.alt}
                                    width={34}
                                    height={34}
                                  />
                                </li>
                              ),
                            )}
                        </div>
                        <div className="text-[64px] font-light text-[#0B66F5]">
                          {project.count}
                        </div>
                      </div>
                    </div>
                  </a>
                ) : null}
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute bottom-[230px] right-[150px] z-30">
            <ButtonCircle title={'RESUME'} />
          </div>
        </div>

        <div className="block w-full xl:hidden">
          <Swiper
            breakpoints={{
              0: {
                slidesPerView: 1.2,
              },
              300: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            modules={[Autoplay]}
            spaceBetween={10}
            loop={true}
          >
            {projects
              .filter((project: any) => !project.isEmptiness) // Фільтрація проектів
              .map((project: any, index: number) => (
                <SwiperSlide key={index} className="custom-slide">
                  {project.isEmptiness === false ? (
                    <a href={project.link} target="_blank">
                      <div className="relative m-4 flex h-[452px] w-[300px] flex-col justify-end gap-[21px] rounded-lg border-b border-black bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0.00)] px-[16px] py-[24px] backdrop-blur-[12.5px]">
                        <div
                          className="absolute right-0 top-0 h-[150px] w-[150px] animate-pulse bg-group-pattern"
                          style={{
                            animationDelay: `${index * 0.5}s`,
                            backgroundColor: 'transparent  !important',
                            opacity: '0.1 !important',
                          }}
                        />
                        <h3 className="text-[36px] font-light leading-[0.9]">
                          {project.title}
                        </h3>
                        <div className="text-[20px] font-bold text-[#0B66F5]">
                          cooperation with: &quot;{project.company}&quot;
                        </div>
                        <div className="flex items-center justify-between border-t-[1px] border-amber-50">
                          <div className="[153deg,rgba(255,255,255,0.12)_2.19%,rgba(255,255,255,0)_99.21%] flex size-[50px] items-center justify-center rounded-full border border-stone-500/30 bg-gradient-to-r to-white/0">
                            <Image src={arrowAslant} alt={'arrow link'} />
                          </div>
                          <div className="text-[64px] font-light text-[#0B66F5]">
                            {project.count}
                          </div>
                        </div>
                      </div>
                    </a>
                  ) : null}
                </SwiperSlide>
              ))}
          </Swiper>
          <div className="mt-[41px] flex w-full justify-end">
            <ButtonCircle title={'RESUME'} />
          </div>
        </div>
      </div>
    </section>
  )
}
