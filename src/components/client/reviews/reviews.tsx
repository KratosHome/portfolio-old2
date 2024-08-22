'use client'
import './reviews.scss'
import { useTranslations } from 'next-intl'
import { useGSAP } from '@gsap/react'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Grid } from 'swiper/modules'
import arrowAslant from '@/assets/icons/arrow-aslant.svg'
import { dataReviews } from '@/data/reviews'
import { ButtonCircle } from '@/components/UI/button-circle/button-circle'
import { HireMe } from '@/components/client/hire-me/hire-me'

export const Reviews = ({}: any) => {
  const data = dataReviews
  const t = useTranslations('home-page.reviews')
  const { contextSafe } = useGSAP()
  const projectsRefs = useRef<HTMLDivElement[]>([])
  const [mobActiveSlide, setMobActiveSlide] = useState(0)

  const handleMouseEnter = contextSafe((index: number) => {
    const serviceRef = projectsRefs.current[index]

    gsap.to(serviceRef, {
      height: 'auto',
      duration: 1,
      ease: 'power2.out',
    })
  })

  const handleMouseLeave = contextSafe((index: number) => {
    const serviceRef = projectsRefs.current[index]

    gsap.to(serviceRef, {
      height: '420px',
      duration: 1,
      ease: 'power2.out',
    })
  })

  useGSAP(
    () => {
      gsap.to('.reviews-mob-wrapper', {
        height: 'auto',
        duration: 0.5,
        ease: 'power2.out',
      })

      gsap.to('.reviews-mob-wrapper-hidden', {
        height: '420px',
        duration: 0.5,
        ease: 'power2.out',
      })
    },
    { dependencies: [mobActiveSlide] },
  )

  return (
    <section aria-label="reviews" id="reviews">
      <div className="relative mx-auto mb-[140px] mt-[120px] max-w-[1442px] lg:px-[24px]">
        <div className="animate-scale-in-out absolute -top-[50px] left-[120px] -z-10 h-[300px] w-[300px] bg-group-pattern bg-cover bg-center opacity-[.2] lg:left-[340px] lg:top-0" />
        <div className="clip-half-circle absolute -left-[100px] top-[550px] size-[200px] flex-shrink-0 rounded-full border border-black border-stone-500/30 bg-gradient-to-r from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] backdrop-blur-[12.5px] xl:-left-[200px] xl:size-[400px]"></div>
        <div className="absolute right-[200px] top-[100px] -z-40 hidden h-[1900px] w-[1900px] transform bg-hero-pattern lg:block" />
        <h2 className="ml-4 text-[40px] font-light uppercase lg:text-[96px]">
          {t('reviews')}
        </h2>
        {/*
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
           */}
        <div className="mt-[69px] hidden w-full lg:mt-[51px] xl:block">
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
            className="custom-swiper-grid"
          >
            {data.map((project: any, index: number) => (
              <SwiperSlide key={project.id}>
                <a href={project.link} target="_blank">
                  <div
                    ref={(el: any) => (projectsRefs.current[index] = el!)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    className="reviews-card group relative z-10 m-4 flex h-[420px] w-[360px] flex-col justify-end gap-[21px] rounded-lg bg-gradient-to-r from-white/20 to-transparent px-[16px] py-[24px] backdrop-blur-[12.5px] duration-700 hover:justify-between"
                  >
                    <div className="overflow-hidden">
                      <div className="text-[20px] font-light">
                        {project.reviews}
                      </div>
                    </div>
                    <div className="border-t-[1px] border-amber-50">
                      <div className="flex w-full items-center justify-between">
                        <div className="text-[64px] font-light text-black">
                          0{index + 1}
                        </div>
                        <div className="mt-[16px] flex flex-col items-end">
                          <Image
                            className="size-[32px] rounded-full object-cover"
                            src={project.icon}
                            alt={t('arrow-link')}
                          />
                          <div className="mt-[12px] text-[20px] text-[#0B66F5]/50 duration-300 group-hover:text-white">
                            {project.position}
                          </div>
                        </div>
                      </div>
                      <div className="text-[32px] font-bold uppercase text-[#0B66F5]">
                        {project.userName}
                      </div>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute -bottom-[80px] left-[170px]">
            <HireMe title={t('leave-review')} modalTitle={t('leave-review')} />
          </div>
        </div>

        <div className="mt-[69px] block w-full xl:hidden">
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
            {data.map((project: any, index: number) => (
              <SwiperSlide key={project.id}>
                <a href={project.link} target="_blank">
                  <div
                    className={`reviews-card group relative z-10 m-4 flex w-[310px] flex-col justify-end gap-[21px] rounded-lg bg-gradient-to-r from-white/20 to-transparent px-[16px] py-[24px] backdrop-blur-[12.5px] duration-700 hover:justify-between ${mobActiveSlide === index ? 'reviews-mob-wrapper' : 'reviews-mob-wrapper-hidden'}`}
                  >
                    <div className="overflow-hidden">
                      <div className="text-[20px] font-light">
                        {project.reviews}
                      </div>
                    </div>
                    <div className="border-t-[1px] border-amber-50">
                      <div className="flex w-full items-center justify-between">
                        <div className="text-[64px] font-light text-black">
                          0{index + 1}
                        </div>
                        <div className="mt-[16px] flex flex-col items-end">
                          <Image
                            className="size-[32px] rounded-full object-cover"
                            src={project.icon}
                            alt={t('arrow-link')}
                          />
                          <div className="mt-[12px] text-end text-[20px] text-[#0B66F5]/50">
                            {project.position}
                          </div>
                        </div>
                      </div>
                      <div className="text-[32px] font-bold uppercase text-[#0B66F5]">
                        {project.userName}
                      </div>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="mt-[41px] flex w-full justify-center">
            <HireMe title={t('leave-review')} modalTitle={t('leave-review')} />
          </div>
        </div>
        <div className="absolute -bottom-[180px] right-0 h-[90px] w-[100px] rotate-[10deg] bg-ellipse-pattern bg-contain opacity-[0.3]" />
      </div>
      <div className="mt-[124px] h-[1px] w-full bg-stone-500/30" />
    </section>
  )
}
