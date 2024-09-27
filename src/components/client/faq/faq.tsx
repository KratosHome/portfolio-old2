'use client'
import { useTranslations } from 'next-intl'
import { useGSAP } from '@gsap/react'
import { useState } from 'react'
import { gsap } from 'gsap'

export const Faq = ({ data }: any) => {
  const t = useTranslations('home-page.faq')

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
    gsap.to(`#icon-experience-${id}`, {
      opacity: 1,
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
    gsap.to(`#icon-experience-${id}`, {
      opacity: 0,
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

  return (
    <section
      aria-label="projects"
      id="projects"
      className="relative -mb-[200px]"
    >
      <div className="relative mx-auto mb-[140px] mt-[120px] max-w-[1442px] lg:px-[24px]">
        <h2 className="my-0 mr-[20px] text-right text-[40px] font-light uppercase lg:text-[96px]">
          {t('faq')}
        </h2>
        <div className="mt-[64px] px-[25px]">
          {data.map((item: any) => (
            <div
              key={item.id}
              id={`wrapper-experience-${item.id}`}
              className={`relative z-10 mb-4 mt-[12px] overflow-hidden rounded-lg bg-[linear-gradient(127deg,_rgba(11,_102,_245,_0.30)_49.23%,_rgba(78,_128,_206,_0.15)_83.27%,_rgba(255,_255,_255,_0.00)_102.62%)] p-[12px] backdrop-blur-[12.5px] dark:bg-[linear-gradient(153deg,rgba(255,255,255,0.12)_2.19%,rgba(255,255,255,0)_99.21%)] lg:p-[24px] ${
                activeItem === item.id
                  ? 'cursor-pointer bg-[#0B66F5] dark:bg-transparent'
                  : 'experience-card'
              }`}
              onClick={() => handleClick(item.id)}
            >
              <div
                id={`block-experience-${item.id}`}
                className="flex items-center justify-between"
              >
                <div className="flex flex-col items-center text-[24px] font-bold lg:text-[40px]">
                  <div className="flex w-full items-center justify-start">
                    <div
                      id={`icon-experience-${item.id}`}
                      className="from-white/12 mr-[32px] size-[44px] rounded-full bg-[#0B66F5] via-transparent to-transparent stroke-black stroke-[1px] p-2 backdrop-blur-[12.5px] dark:bg-gradient-to-br dark:bg-clip-border"
                      style={{ opacity: activeItem === item.id ? 0 : 1 }}
                    />
                    <div className="flex w-full text-center text-[24px] font-normal lg:text-[32px] lg:font-bold">
                      {item.question}
                    </div>
                    <div className="text-blue-900">
                      {activeItem === item.id ? '-' : '+'}
                    </div>
                  </div>
                  <div
                    id={`description-experience-${item.id}`}
                    className="description h-0 overflow-hidden opacity-0 lg:mx-[64px]"
                  >
                    <div className="mt-4 text-[16px] font-light lg:text-[20px]">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -top-[800px] left-[500px] !-z-30 hidden h-[1900px] w-[1900px] transform bg-hero-pattern lg:block" />
      <div className="absolute -left-[500px] -top-[100px] !-z-30 hidden h-[1900px] w-[1900px] transform bg-hero-pattern lg:block" />
    </section>
  )
}
