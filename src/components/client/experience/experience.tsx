'use client'
import './experience.scss'
import { useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { HireMe } from '@/components/client/hire-me/hire-me'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ExperienceItem {
  id: number
  count: string
  title: string
  date: string
  description: { text: string }[] | string
  company: string
  technologies: string[]
  link: string
}

const Experience = ({ experience }: { experience: ExperienceItem[] }) => {
  const t = useTranslations('home-page.experience')
  const { contextSafe } = useGSAP()

  const [activeItem, setActiveItem] = useState<number | null>(null)

  const closeItem = (id: number) => {
    gsap.to(`#wrapper-experience-${id}`, {
      maxHeight: 130,
      duration: 0.5,
      ease: 'power2.inOut',
    })
    gsap.to(`#description-experience-${id}`, {
      height: 0,
      opacity: 0,
      duration: 0.5,
    })
    gsap.to(`#block-experience-${id}`, {
      alignItems: 'center',
      duration: 0.5,
    })
  }

  const openItem = (id: number) => {
    gsap.fromTo(
      `#description-experience-${id}`,
      { height: 0, opacity: 0 },
      {
        height: 'auto',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      },
    )
    gsap.to(`#block-experience-${id}`, {
      alignItems: 'start',
      duration: 0.5,
    })
  }

  const handleClick = contextSafe((id: number) => {
    if (activeItem === id) {
      closeItem(id)
      setActiveItem(null)
    } else {
      if (activeItem !== null) {
        closeItem(activeItem)
      }
      openItem(id)
      setActiveItem(id)
    }
  })

  useGSAP(() => {
    const items = gsap.utils.toArray('.experience-item')
    items.forEach((item: any, index: number) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          scale: 0.4,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play reverse play reverse',
          },
        },
      )
    })
  })

  return (
    <section aria-label="experience" id="experience" className="relative">
      <div className="absolute inset-0 mx-auto h-[210px] w-[210px] flex-shrink-0 rotate-[-89.637deg] rounded-full bg-[linear-gradient(223deg,_rgba(223,_223,_223,_0.20)_12.99%,_rgba(0,_0,_0,_0.20)_28.97%),_linear-gradient(265deg,_#666_-44.12%,_#262626_-21.9%,_#1C1C1C_4.39%,_#000_40.18%)] lg:h-[769.29px] lg:w-[769.29px]"></div>

      <div className="relative mx-auto mb-[140px] mt-[120px] max-w-[1442px] lg:px-[24px]">
        <h2 className="my-0 mr-[20px] text-center text-[40px] font-light uppercase text-[#0B66F5] dark:text-white lg:text-[96px]">
          {t('experience')}
        </h2>
        <div className="mt-[64px] px-[25px]">
          {experience.map((item) => (
            <div
              key={item.id}
              id={`wrapper-experience-${item.id}`}
              className={`experience-item group relative mb-4 mt-[12px] overflow-hidden rounded-lg bg-[linear-gradient(127deg,_rgba(11,_102,_245,_0.30)_49.23%,_rgba(78,_128,_206,_0.15)_83.27%,_rgba(255,_255,_255,_0.00)_102.62%)] p-[12px] backdrop-blur-[12.5px] dark:bg-[linear-gradient(153deg,rgba(255,255,255,0.12)_2.19%,rgba(255,255,255,0)_99.21%)] lg:p-[24px] ${
                activeItem === item.id
                  ? 'experience-card-open cursor-pointer'
                  : 'experience-card'
              }`}
              onClick={() => handleClick(item.id)}
            >
              <div
                id={`block-experience-${item.id}`}
                className="flex items-center justify-between"
              >
                <div className="mr[12px] mr-[12px] hidden text-[48px] font-light leading-[0.9] text-black dark:text-[#0B66F5]/50 lg:mr-0 lg:block lg:text-[96px]">
                  {item.count}
                </div>
                <div className="flex flex-col items-center text-[24px] font-bold lg:text-[40px]">
                  <div className="flex">
                    <div className="mr[12px] mr-[12px] mt-1 block text-[48px] font-light leading-[0.9] text-[#0B66F5]/50 lg:mr-0 lg:hidden lg:text-[96px]">
                      {item.count}
                    </div>
                    <div className="text-[24px] font-normal text-white lg:text-[40px] lg:font-bold">
                      {item.title}
                    </div>
                  </div>
                  <div
                    id={`description-experience-${item.id}`}
                    className="description h-0 overflow-hidden opacity-0 lg:mx-[64px]"
                  >
                    <div>
                      {Array.isArray(item.description) ? (
                        <ul className="mt-4 px-4 text-[16px] font-light lg:text-[20px]">
                          {item.description.map((desc, index) => (
                            <li key={index}>{desc.text}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-4 text-[16px] font-light lg:text-[20px]">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <Link
                      href={item.link}
                      className="ml-[10px] text-[24px] text-white underline dark:text-[#0B66F5]"
                    >
                      {item.company}
                    </Link>
                  </div>
                </div>
                <div
                  className={`hidden min-w-max text-[16px] font-bold text-[#0B66F5] duration-300 dark:text-white lg:block lg:text-[24px] ${
                    activeItem === item.id ? '' : 'group-hover:text-white'
                  }`}
                >
                  {item.date}
                </div>
              </div>
              <div className="my-[18px] block min-w-max text-right text-[16px] font-light lg:hidden lg:text-[24px]">
                {item.date}
              </div>
              <div
                className="flex h-0 flex-wrap gap-[10px] overflow-hidden opacity-0"
                id={`description-experience-${item.id}`}
              >
                {item.technologies.map((desc) => (
                  <div
                    key={desc}
                    className="rounded-2xl border border-stone-500/30 bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] px-[10px] text-[20px] font-bold backdrop-blur-[12.5px] lg:mt-[40px] lg:px-[24px] lg:py-[10px]"
                  >
                    {desc}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[50px] flex w-full justify-end lg:-ml-[220px] lg:mt-[120px]">
          <div className="relative flex max-w-max items-center justify-center">
            <div className="orbit absolute -top-[250px] -z-10 hidden size-[700px] bg-orbit-light dark:bg-orbit lg:block" />
            <HireMe title={t('hire-me')} modalTitle={t('hire-me')} />
          </div>
        </div>
      </div>
      <div className="mt-[124px] h-[1px] w-full bg-stone-500/30" />
      <div className="absolute -top-[800px] left-[500px] -z-20 hidden h-[1900px] w-[1900px] transform bg-hero-pattern lg:block" />
      <div className="absolute -left-[500px] -top-[100px] -z-20 hidden h-[1900px] w-[1900px] transform bg-hero-pattern lg:block" />
    </section>
  )
}

export default Experience
