'use client'
import './services.scss'
import { FC, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import arrowLong from '@/assets/icons/arrow-long.svg'

gsap.registerPlugin(ScrollTrigger)

export const Services: FC<any> = ({ services }) => {
  const t = useTranslations('services')
  const { contextSafe } = useGSAP()
  const serviceRefs = useRef<HTMLDivElement[]>([])
  const iconRefs = useRef<HTMLLIElement[][]>([])
  const wrapperRef = useRef<HTMLUListElement | null>(null)

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

  useGSAP(() => {
    if (!wrapperRef.current) return

    const sections = gsap.utils.toArray('.panel')
    const isDesktop = window.innerWidth >= 600
    const xPercentValue = isDesktop
      ? -102 * (sections.length - 1)
      : -108 * (sections.length - 1)

    gsap.to(sections, {
      xPercent: xPercentValue,
      ease: 'none',
      scrollTrigger: {
        anticipatePin: 2,
        trigger: wrapperRef.current,
        pin: true,
        scrub: 0.1,
        end: '+=3000',
      },
    })
  })

  return (
    <section aria-label="services" id="services">
      <div className="relative mx-auto -mt-[400px] mb-[140px] max-w-[1442px] px-[24px]">
        <div className="absolute -top-[800px] left-[200px] -z-20 hidden h-[1900px] w-[1900px] transform bg-hero-pattern lg:block" />
        <div className="absolute right-[200px] top-[100px] -z-20 hidden h-[1900px] w-[1900px] transform bg-hero-pattern lg:block" />
        <h2 className="hidden text-[40px] font-light uppercase lg:ml-[90px] lg:block lg:text-[96px]">
          {t('services')}
        </h2>

        <div className="absolute -left-[155px] top-[-100px] size-[345px] rounded-full border-r-[1px] border-stone-500/30" />
        <div className="absolute -bottom-[120px] right-[15px] -z-20 h-[103px] w-[125px] opacity-[0.7] bg-orbit-services" />
        <ul className="mt-[152px] hidden flex-wrap justify-center gap-4 lg:flex">
          {services.map((service: any, index: number) => (
            <li
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
            </li>
          ))}
        </ul>
        <div className="block lg:hidden">
          <ul
            className="wrapper-services-mob max-w-screen z-20 flex overflow-hidden"
            ref={wrapperRef}
          >
            <h2 className="absolute top-0 block pt-[50px] text-[40px] font-light uppercase lg:hidden">
              {t('services')}
            </h2>
            <div className="absolute -right-[50px] top-[80px] mt-[30px]">
              <div className="ml-[10px] flex flex-col items-center text-[16px] font-light [text-orientation:upright] [writing-mode:vertical-rl]">
                <div>{t('scroll')}</div>
                <div>{t('see-more')}</div>
              </div>
              <div className="-mt-[70px] rotate-90">
                <Image
                  src={arrowLong}
                  alt={t('scroll')}
                  width={130}
                  height={30}
                />
              </div>
            </div>
            {services.map((item: any, index: any) => (
              <li
                key={index}
                className="panel group relative mx-3 my-10 mt-[300px] flex h-[500px] min-w-[90vw] flex-col justify-between rounded-xl border-r border-white/80 bg-gradient-to-l from-white/20 to-gray-600/10 p-[24px] sm:p-10"
                role="listitem"
              >
                <div
                  className="absolute right-0 top-0 size-[150px] animate-pulse bg-group-pattern"
                  style={{
                    animationDelay: `${index * 0.5}s`,
                    backgroundColor: 'transparent  !important',
                    opacity: '0.1 !important',
                  }}
                />
                <h3 className="h-[70px] text-[30px] font-bold uppercase leading-[1.1] text-[#0B66F5]">
                  {item.title}
                </h3>
                <p className="block text-[20px] font-light">
                  {item.description}
                </p>
                <ul className="flex flex-wrap gap-3">
                  <li className="[153deg,rgba(255,255,255,0.12)_2.19%,rgba(255,255,255,0)_99.21%] flex size-[34px] items-center justify-center rounded-full border border-stone-500/30 bg-gradient-to-r to-white/0"></li>
                  {item.icon.length > 0 &&
                    item.icon.map((icon: any) => (
                      <li key={icon.id}>
                        <Image
                          src={icon.icon}
                          alt={icon.alt}
                          width={34}
                          height={34}
                        />
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-[124px] h-[1px] w-full bg-stone-500/30" />
    </section>
  )
}
