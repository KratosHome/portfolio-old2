'use client'
import './hero.scss'
import { Technologies } from '@/components/hero/technologies/technologies'
import gitHub from '@/assets/icons/github.svg'
import gitHubLight from '@/assets/icons/githubLight.svg'
import linkedin from '@/assets/icons/linkedin.svg'
import linkedinLight from '@/assets/icons/linkedinLight.svg'
import telegram from '@/assets/icons/telegram.svg'
import telegramLight from '@/assets/icons/telegramLight.svg'
import ArrowRight from '@/assets/icons/ArrowRight.svg'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'
import { ButtonCircle } from '@/components/button-circle/button-circle'
import ThemeChange from '@/components/theme-change/theme-change'

const Hero = () => {
  const t = useTranslations('home-page.hero')
  const { theme } = useTheme()
  const startDate = new Date('2021-10-01')

  const calculateYears = (start: Date, end: Date): number => {
    const years: number = end.getFullYear() - start.getFullYear()
    return years
  }

  const years = calculateYears(startDate, new Date())

  return (
    <section className="-mt-[300px]">
      <div className="relative mx-auto max-w-[1442px] px-[24px]">
        <div className="absolute right-[28px] z-10 mt-[15px] block lg:hidden">
          <ThemeChange />
        </div>
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div className="absolute -top-[10px] left-[40px] -z-10 size-[100px] flex-shrink-0 rounded-[280px] border-[1px] border-stone-500/30 bg-gradient-to-tr from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] backdrop-blur-[12.5px] lg:-top-[50px] lg:left-[20px] lg:size-[280px]" />
          <div className="absolute left-[5px] top-[20px] -z-20 h-[70px] w-[80px] rotate-[10deg] bg-ellipse-pattern bg-contain opacity-[0.4] lg:-left-[80px] lg:top-[70px] lg:h-[103px] lg:w-[125px]" />
          <div className="w-full max-w-[400px] lg:max-w-[600px]">
            <h1 className="relative mt-[55px] flex w-full max-w-[300px] flex-col uppercase lg:-mt-[50px] lg:max-w-full">
              <span className="overlay delay-1 inline-block items-end text-end text-[40px] font-extrabold leading-[0.5] lg:text-[80px]">
                {t('frontend')}
              </span>
              <span className="overlay delay-2 -mt-[10px] inline-block text-[36px] font-light uppercase lg:text-[64px]">
                {t('developer')}
              </span>
            </h1>
            <span className="overlay-blue delay-2 !-mt-[25px] block w-full text-end text-[12px] text-[#0B66F5] lg:!-mt-[5px] lg:ml-12 lg:text-[20px]">
              {t('subtitle')}
            </span>
          </div>
          <div className="bg-hero-pattern bg-cover" />
          <div className="">
            <Technologies />
          </div>
        </div>
        <div className="relative mt-[52px] flex flex-col-reverse items-end justify-between lg:flex-row">
          <div className="flex justify-between lg:w-1/2">
            <div className="border--stone-500/30 flex min-w-[160px] flex-row justify-between border-t-2 py-[5px] pr-[16px] lg:min-w-[0px] lg:flex-col lg:border-r-2 lg:border-t-0">
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
            <div className="absolute left-0 lg:-top-[120px] lg:left-[310px]">
              <ButtonCircle title={t('hire-me')} />
            </div>
          </div>
          <h2 className="relative min-w-[190px] text-end text-[24px] font-light uppercase leading-[1] lg:min-w-[550px] lg:text-[64px]">
            <span className="overlay delay-2" />
            <span className="delay-3 overlay-blue block text-[#0B66F5]">
              <span> {t('experience')}</span>
            </span>
            <span className="overlay delay-3 -mt-3 block text-start lg:mt-0">
              {years} <span> {t('years')}</span>
            </span>
          </h2>
        </div>
        <div className="animate-scale-in-out absolute -bottom-[20px] left-[500px] -z-20 size-[200px] -translate-x-1/2 bg-group-pattern opacity-[0.1] lg:-bottom-[220px] lg:left-[400px] lg:size-[300px]" />
        <div className="absolute -top-[600px] left-[200px] -z-20 h-[1900px] w-[1900px] transform bg-hero-pattern" />
        <div className="absolute -top-[100px] right-[200px] -z-20 h-[1900px] w-[1900px] transform bg-hero-pattern" />
        <div className="absolute -top-[500px] left-[0px] -z-20 h-[1900px] w-[1900px] transform bg-hero-pattern" />
        <div className="absolute -right-[75px] bottom-[190px] -z-20 h-[103px] w-[125px] rotate-[10deg] bg-ellipse-pattern bg-contain opacity-[0.4]" />
      </div>
      <div className="mt-[124px] h-[1px] w-full bg-stone-500/30" />
      <div className="mx-auto -mt-[120px] flex w-full max-w-[1445px] justify-end">
        <div className="relative max-h-[500px] max-w-[500px]">
          <div className="circle absolute right-[100px] ml-[110px] mt-[70px] size-[125px] rounded-full bg-[rgba(255,255,255,0.3)] p-[135px] opacity-40 blur-2xl" />
          <div className="absolute right-[115px] ml-[120px] mt-[80px] size-[250px] rounded-full bg-black" />
          <div className="absolute right-[120px] z-10 ml-[125px] mt-[130px] h-[100px] w-[240px] rounded-full bg-black" />
          <div className="orbit absolute right-0 size-[500px] bg-orbit" />
          <div className="planet absolute right-[230px] z-10 ml-[80px] mt-[215px] h-40 w-40 rounded-full bg-white opacity-40 blur-2xl"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
