'use client'
import './projects.scss'
import { useTranslations } from 'next-intl'
import { FC, useRef, useState } from 'react'
import arrowAslant from '@/assets/icons/arrow-aslant.svg'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Grid } from 'swiper/modules'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import arrowLong from '@/assets/icons/arrow-long.svg'
import { ButtonCircle } from '@/components/UI/button-circle/button-circle'
import { HireMe } from '@/components/client/hire-me/hire-me'

export const Projects: FC<any> = ({ projects }) => {
  const t = useTranslations('home-page.project')

  const { contextSafe } = useGSAP()
  const projectsRefs = useRef<HTMLDivElement[]>([])
  const iconRefs = useRef<HTMLLIElement[][]>([])
  const descriptionRefs = useRef<HTMLDivElement[]>([])
  const [mobActiveSlide, setMobActiveSlide] = useState(0)

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
      height: 'auto',
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
      height: 0,
      ease: 'power2.out',
    })
  })

  useGSAP(
    () => {
      gsap.to('.project-mob-wrapper', {
        height: 'auto',
        minHeight: '452px',
        duration: 0.3,
        ease: 'power2.out',
      })

      gsap.to('.project-mob-description', {
        height: 'auto',
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      })
      gsap.to('.project-mob-description-hidden', {
        height: '0px',
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      })

      gsap.to('.project-mob-wrapper-hidden', {
        height: '452px',
        duration: 0.5,
        ease: 'power2.out',
      })
    },
    { dependencies: [mobActiveSlide] },
  )

  return (
    <section aria-label="projects" id="projects">
      <div className="relative mx-auto mb-[140px] mt-[120px] max-w-[1442px] lg:px-[24px]">
        <div className="clip-half-circle absolute -left-[100px] -top-[30px] size-[200px] flex-shrink-0 rounded-full border border-black border-stone-500/30 bg-gradient-to-r from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] backdrop-blur-[12.5px] xl:-left-[200px] xl:size-[400px]"></div>

        <div className="absolute right-[200px] top-[100px] -z-40 hidden h-[1900px] w-[1900px] transform bg-hero-pattern lg:block" />
        <h2 className="my-0 mr-[20px] text-right text-[40px] font-light uppercase lg:text-[96px]">
          {t('project')}
        </h2>
        <div className="my-[32px] mr-[20px] flex flex-col items-end justify-end">
          <div className="text-[16px] lg:text-[24px]">
            {t('scroll-see-more')}
          </div>
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
            modules={[Grid]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
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
                      className="project-card group relative z-10 m-4 flex min-h-[552px] w-[398px] flex-col justify-end gap-[21px] rounded-lg border-b border-black bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0.00)] px-[16px] py-[24px] backdrop-blur-[12.5px] duration-700 hover:justify-between"
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
                        <h3 className="mb-[21px] text-[60px] font-light leading-[0.9] duration-700 group-hover:text-[32px] group-hover:text-[#0B66F5]">
                          {project.title}
                        </h3>
                        <div className="text-[20px] font-bold text-[#0B66F5] duration-700 group-hover:text-right group-hover:text-white">
                          {t('cooperation-with')}: &quot;{project.company}&quot;
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
                      <div className="flex justify-between border-t-[1px] border-amber-50">
                        <div className="mt-5 flex flex-wrap gap-4">
                          <div className="[153deg,rgba(255,255,255,0.12)_2.19%,rgba(255,255,255,0)_99.21%] flex size-[50px] items-center justify-center rounded-full border border-stone-500/30 bg-gradient-to-r to-white/0">
                            <Image src={arrowAslant} alt={t('arrow-link')} />
                          </div>
                          {project.technologies.length >= 1 &&
                            project.technologies.map(
                              (icon: any, iconIndex: number) => (
                                <li
                                  key={icon.id}
                                  className="mt-2"
                                  ref={(el) => {
                                    if (!iconRefs.current[index]) {
                                      iconRefs.current[index] = []
                                    }
                                    iconRefs.current[index][iconIndex] = el!
                                  }}
                                  style={{ opacity: 0, height: 0 }}
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
            <HireMe title={t('resume')} modalTitle={t('resume')} />
          </div>
        </div>

        <div className="block w-full xl:hidden">
          <Swiper
            breakpoints={{
              0: {
                slidesPerView: 1.1,
              },
              350: {
                slidesPerView: 1,
              },
              400: {
                slidesPerView: 1.5,
              },
              600: {
                slidesPerView: 2.1,
              },
              840: {
                slidesPerView: 3,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            modules={[Autoplay]}
            spaceBetween={40}
            loop={true}
            onSlideChangeTransitionStart={(swiper) => {
              setMobActiveSlide(swiper.realIndex)
            }}
          >
            {projects
              .filter((project: any) => !project.isEmptiness)
              .map((project: any, index: number) => (
                <SwiperSlide key={index} className="custom-slide">
                  {project.isEmptiness === false ? (
                    <a href={project.link} target="_blank">
                      <div
                        className={`relative m-4 flex h-[452px] min-h-[452px] w-[300px] flex-col justify-end gap-[21px] rounded-lg border-b border-black bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0.00)] px-[16px] py-[24px] backdrop-blur-[12.5px] ${mobActiveSlide === index ? 'project-mob-wrapper project-card-mob justify-between' : 'project-mob-wrapper-hidden'}`}
                      >
                        <div className="overflow-hidden">
                          <div
                            className="absolute right-0 top-0 h-[150px] w-[150px] animate-pulse bg-group-pattern"
                            style={{
                              animationDelay: `${index * 0.5}s`,
                              backgroundColor: 'transparent  !important',
                              opacity: '0.1 !important',
                            }}
                          />
                          <h3
                            className={`text-[36px] leading-[0.9] ${mobActiveSlide === index ? 'text-[26px] text-[#0B66F5]' : ''}`}
                          >
                            {project.title}
                          </h3>
                          <div
                            className={`mt-[21px] text-[#0B66F5] ${mobActiveSlide === index ? 'mb-[21px] text-white' : ''}`}
                          >
                            {t('cooperation-with')}: &quot;{project.company}
                            &quot;
                          </div>
                          <div
                            className={`text-[16px] font-light opacity-0 ${mobActiveSlide === index ? 'project-mob-description' : 'project-mob-description-hidden'}`}
                          >
                            {project.description}
                          </div>
                        </div>
                        <div className="flex items-center justify-between border-t-[1px] border-amber-50">
                          <div className="[153deg,rgba(255,255,255,0.12)_2.19%,rgba(255,255,255,0)_99.21%] flex size-[50px] items-center justify-center rounded-full border border-stone-500/30 bg-gradient-to-r to-white/0">
                            <Image src={arrowAslant} alt={t('arrow-link')} />
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
            <HireMe title={t('resume')} modalTitle={t('resume')} />
          </div>
        </div>
        <div className="absolute -bottom-[180px] right-0 h-[90px] w-[100px] rotate-[10deg] bg-ellipse-pattern bg-contain opacity-[0.3]" />
      </div>
      <div className="mt-[124px] h-[1px] w-full bg-stone-500/30" />
    </section>
  )
}
