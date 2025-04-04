'use client'
import './hero.scss'
import gitHub from '@/assets/icons/github.svg'
import gitHubLight from '@/assets/icons/githubLight.svg'
import linkedin from '@/assets/icons/linkedin.svg'
import linkedinLight from '@/assets/icons/linkedinLight.svg'
import telegram from '@/assets/icons/telegram.svg'
import telegramLight from '@/assets/icons/telegramLight.svg'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'
import { Technologies } from '@/components/client/hero/technologies/technologies'
import { HireMe } from '@/components/client/hire-me/hire-me'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Hero = () => {
  const t = useTranslations('home-page.hero')
  const { theme } = useTheme()

  const bigСircleRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const hireMeRef = useRef<HTMLDivElement>(null)
  const planetRef = useRef<HTMLDivElement>(null)

  const startDate = new Date('2021-10-01')

  const calculateYears = (start: Date, end: Date): number => {
    const years: number = end.getFullYear() - start.getFullYear()
    return years
  }

  const years = calculateYears(startDate, new Date())

  useGSAP(() => {
    if (bigСircleRef.current) {
      gsap.fromTo(
        bigСircleRef.current,
        {
          scale: 0.1,
          opacity: 0.5,
          y: -100,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 2,
          ease: 'power2.out',
        },
      )
    }

    if (bgRef.current) {
      gsap.fromTo(
        bgRef.current,
        {
          x: -200,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 0.5,
          duration: 2,
          ease: 'power2.out',
        },
      )
    }

    if (hireMeRef.current) {
      gsap.fromTo(
        hireMeRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1.5,
        },
      )
    }

    if (planetRef.current) {
      gsap.fromTo(
        planetRef.current,
        {
          opacity: 0,
          rotation: 340,
        },
        {
          opacity: 1,
          rotation: 0,
          duration: 2.5,
          ease: 'power2.out',
        },
      )
    }
  })
  return (
    <section className="relative min-h-[1700px] overflow-x-hidden lg:overflow-visible">
      <div className="relative mx-auto max-w-[1442px] px-[24px]">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div
            ref={bigСircleRef}
            className="absolute -top-[10px] left-[40px] -z-10 size-[100px] flex-shrink-0 rounded-[280px] border-stone-500/30 bg-[linear-gradient(127deg,_rgba(11,_102,_245,_0.30)_49.23%,_rgba(78,_128,_206,_0.15)_83.27%,_rgba(255,_255,_255,_0.00)_102.62%)] opacity-0 backdrop-blur-[12.5px] dark:border-[1px] dark:bg-gradient-to-tr dark:from-[rgba(255,255,255,0.12)] dark:to-[rgba(255,255,255,0)] lg:-top-[50px] lg:left-[20px] lg:size-[280px]"
          />
          <div
            ref={bgRef}
            className="absolute left-[5px] top-[20px] -z-20 h-[70px] w-[80px] rotate-[10deg] bg-contain opacity-0 bg-ellipse-light-pattern dark:bg-ellipse-pattern lg:-left-[80px] lg:top-[70px] lg:h-[103px] lg:w-[125px]"
          />
          <div className="w-full max-w-[400px] lg:max-w-[600px]">
            <h1 className="relative mt-[55px] flex w-full max-w-[300px] flex-col uppercase lg:-mt-[50px] lg:max-w-full">
              <span className="overlay-theme-fr delay-1 inline-block items-end text-end text-[40px] font-extrabold leading-[0.5] text-[#0B66F5] lg:text-[80px]">
                {t('frontend')}
              </span>
              <span className="overlay-theme-dv delay-2 -mt-[10px] inline-block text-[36px] font-light uppercase lg:text-[64px]">
                {t('developer')}
              </span>
            </h1>
            <div className="flex justify-end">
              <span className="overlay-blue delay-2 !-mt-[25px] block w-full max-w-[153px] text-end text-[12px] text-[#0B66F5] lg:!-mt-[5px] lg:ml-12 lg:max-w-max lg:text-[20px]">
                {t('subtitle')}
              </span>
            </div>
          </div>
          <div className="bg-hero-pattern bg-cover" />
          <div>
            <Technologies />
          </div>
        </div>
        <div className="relative mt-[52px] flex flex-col-reverse items-end justify-between lg:flex-row">
          <div className="flex justify-between lg:w-1/2">
            <div className="flex min-w-[160px] flex-row justify-between border-t-2 border-black py-[5px] pr-[16px] dark:border-white lg:min-w-[0px] lg:flex-col lg:border-r-[1px] lg:border-t-0">
              <a
                href="https://github.com/KratosHome"
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="GitHub"
              >
                <Image
                  className="!fill-amber-700 !stroke-red-500 transition-transform duration-300 hover:scale-[1.2]"
                  src={theme === 'light' ? gitHubLight : gitHub}
                  alt="github"
                  width={40}
                  height={40}
                />
              </a>
              <a
                className="block lg:my-[16px]"
                href="https://www.linkedin.com/in/olegtkach101/"
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="LinkedIn"
              >
                <Image
                  className="transition-transform duration-300 hover:scale-[1.2]"
                  src={theme === 'light' ? linkedinLight : linkedin}
                  alt="linkedin"
                  width={40}
                  height={40}
                />
              </a>
              <a
                href="https://t.me/KratosHome"
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="Telegram"
              >
                <Image
                  className="transition-transform duration-300 hover:scale-[1.2]"
                  src={theme === 'light' ? telegramLight : telegram}
                  alt="telegram"
                  width={40}
                  height={40}
                />
              </a>
            </div>
            <div
              ref={hireMeRef}
              className="absolute left-0 opacity-0 lg:-top-[120px] lg:left-[310px]"
            >
              <HireMe title={t('hire-me')} modalTitle={t('hire-me')} />
            </div>
          </div>
          <h2 className="relative min-w-[190px] text-end text-[24px] font-light uppercase leading-[1] lg:min-w-[550px] lg:text-[64px]">
            <span className="overlay delay-2" />
            <span className="delay-3 overlay-ex block text-[#0B66F5]">
              <span> {t('experience')}</span>
            </span>
            <span className="overlay-blue-year delay-3 -mt-3 block text-start lg:mt-0">
              {years} <span> {t('years')}</span>
            </span>
          </h2>
        </div>
        <div className="animate-scale-in-out absolute -bottom-[20px] left-[75vw] -z-20 size-[200px] -translate-x-1/2 bg-group-pattern-light dark:bg-group-pattern dark:opacity-[0.1] xl:-bottom-[220px] xl:left-[400px] xl:size-[300px]" />
        <div className="absolute -right-[75px] bottom-[190px] -z-20 h-[103px] w-[125px] rotate-[10deg] bg-ellipse-pattern bg-contain opacity-[0.4]" />
        <div className="absolute -top-[600px] left-0 -z-20 size-[1900px] transform bg-hero-pattern lg:hidden dark:lg:block" />
        <div className="absolute -right-[350px] -top-[300px] -z-20 size-[1900px] bg-hero-pattern dark:block lg:right-[0px] lg:hidden" />
        <div className="absolute -left-[950px] -top-[300px] -z-20 hidden size-[1900px] bg-hero-pattern lg:right-[0px] lg:block" />
        <div className="absolute -left-[100px] top-[100px] -z-20 hidden h-[1900px] w-[1900px] transform bg-hero-pattern lg:block" />
      </div>
      <div className="mt-[124px] h-[1px] w-full bg-stone-500/0" />
      <div className="relative mx-auto max-w-[1442px]">
        <div
          ref={planetRef}
          className="absolute -right-[150px] bottom-0 -mt-[290px] rotate-[25deg] opacity-0"
        >
          <div className="relative max-h-[500px] max-w-[500px]">
            <div className="circle-hero absolute right-[100px] ml-[110px] mt-[70px] size-[125px] rounded-full bg-[rgba(255,255,255,0.3)] p-[135px] opacity-40 blur-2xl" />
            <div className="absolute right-[115px] ml-[120px] mt-[80px] size-[250px] rounded-full bg-black" />
            <div className="absolute right-[120px] z-10 ml-[125px] mt-[130px] h-[100px] w-[240px] rounded-full bg-black" />
            <div className="absolute -top-5 right-0 size-[500px] bg-orbit-light dark:top-0 dark:bg-orbit" />
            <div className="planet-hero absolute right-[230px] z-10 ml-[80px] mt-[215px] h-40 w-40 rounded-full bg-white opacity-40 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
