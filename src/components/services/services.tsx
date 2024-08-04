'use client'
import './services.scss'
import { useLocale } from 'use-intl'
import { FC, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export const Services: FC<any> = ({ services }) => {
  const t = useTranslations('services')
  const { contextSafe } = useGSAP()
  const serviceRefs = useRef<HTMLDivElement[]>([])
  const iconRefs = useRef<HTMLLIElement[][]>([])

  const handleMouseEnter = contextSafe((index: number) => {
    const serviceRef = serviceRefs.current[index]
    const icons = iconRefs.current[index]

    gsap.to(serviceRef, {
      height: '450px',
      duration: 0.5,
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
    const serviceRef = serviceRefs.current[index]
    const icons = iconRefs.current[index]

    gsap.to(serviceRef, {
      height: '400px',
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
    <section>
      <div className="relative mx-auto -mt-[400px] mb-[140px] max-w-[1442px] px-[24px]">
        <h2 className="ml-[90px] text-[40px] font-light uppercase lg:text-[96px]">
          {t('services')}
        </h2>
        <div className="bg-orbit-services absolute -bottom-[120px] right-[15px] -z-20 h-[103px] w-[125px] opacity-[0.7]" />
        <div className="absolute -left-[155px] top-[-100px] size-[345px] rounded-full border-r-[1px] border-stone-500/30" />
        <div className="mt-[152px] flex flex-wrap justify-center gap-4">
          {services.map((service: any, index: number) => (
            <div
              key={service.id}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              ref={(el: any) => (serviceRefs.current[index] = el!)}
              className="services-card group relative flex h-[400px] w-[394px] flex-col justify-between rounded-md border-r border-white/80 bg-gradient-to-l from-white/20 to-gray-600/10 p-[24px]"
            >
              <div
                className="absolute right-0 top-0 size-[150px] animate-pulse bg-group-pattern"
                style={{
                  animationDelay: `${index * 0.5}s`,
                  backgroundColor: 'transparent  !important',
                  opacity: '0.1 !important',
                }}
              />
              <h3 className="h-[70px] text-[32px] font-bold uppercase leading-[1.1] text-[#0B66F5]">
                {service.title}
              </h3>
              <p className="block text-[20px] font-light">
                {service.description}
              </p>
              <ul className="flex flex-wrap gap-3">
                <li className="[153deg,rgba(255,255,255,0.12)_2.19%,rgba(255,255,255,0)_99.21%] flex size-[34px] items-center justify-center rounded-full border border-stone-500/30 bg-gradient-to-r to-white/0"></li>
                {service.icon.length >= 1 &&
                  service.icon.map((icon: any, iconIndex: number) => (
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
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[124px] h-[1px] w-full bg-stone-500/30" />
    </section>
  )
}
