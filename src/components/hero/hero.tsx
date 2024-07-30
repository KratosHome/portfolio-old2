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
    <section className="relative mx-auto max-w-[1442px]">
      <div className="flex justify-between">
        <div className="absolute -top-[50px] -z-10 h-[280px] w-[280px] flex-shrink-0 rounded-[280px] border-[1px] border-stone-500/50 bg-gradient-to-tr from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] backdrop-blur-[12.5px]" />
        <div className="absolute -left-[80px] top-[70px] -z-20 h-[103px] w-[125px] rotate-[10deg] bg-ellipse-pattern bg-contain opacity-[0.4]" />
        <div>
          <h1 className="relative mt-[136px] pt-10 uppercase">
            <span className="overlay delay-1 ml-[158px] block text-[80px] font-extrabold leading-[0.5]">
              {t('frontend')}
            </span>
            <span className="overlay delay-2 block text-[64px] font-light uppercase">
              {t('developer')}
            </span>
          </h1>
          <div className="overlay-blue delay-2 ml-[211px] text-[20px] text-[#0B66F5]">
            {t('subtitle')}
          </div>
        </div>
        <div className="bg-hero-pattern bg-cover" />
        <Technologies />
      </div>
      <div className="relative mt-[52px] flex justify-between">
        <div className="flex w-1/2 justify-between">
          <div className="border-r-2 border-white py-[5px] pr-[16px]">
            <a
              href="https://github.com/KratosHome"
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label="GitHub"
            >
              <Image
                className="transition-transform duration-300 hover:scale-[1.2]"
                src={theme === 'light' ? gitHubLight : gitHub}
                alt="github"
                width={40}
                height={40}
              />
            </a>
            <a
              className="my-[16px] block"
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
          <button className="absolute -top-[120px] left-[310px] flex h-[120px] w-[120px] flex-shrink-0 flex-col items-center justify-center rounded-[280px] border-[1px] border-black bg-gradient-to-tr from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] text-[20px] font-bold uppercase backdrop-blur-[12.5px]">
            <span> {t('hire-me')}</span>
            <Image
              src={ArrowRight}
              alt={t('arrow-right')}
              width={70}
              height={40}
            />
          </button>
        </div>
        <h2 className="relative min-w-[550px] text-end text-[64px] font-light uppercase leading-[1]">
          <span className="overlay delay-2" />
          <span className="delay-3 overlay-blue block text-[#0B66F5]">
            <span> {t('experience')}</span>
          </span>
          <span className="overlay delay-3 block text-start">
            {years} <span> {t('years')}</span>
          </span>
        </h2>
      </div>
      <div className="animate-scale-in-out absolute -bottom-[220px] left-[400px] -z-20 h-[300px] w-[300px] -translate-x-1/2 bg-group-pattern opacity-[0.1]" />
      <div className="absolute -top-[600px] left-[200px] -z-20 h-[1900px] w-[1900px] transform bg-hero-pattern" />
      <div className="absolute -top-[100px] right-[200px] -z-20 h-[1900px] w-[1900px] transform bg-hero-pattern" />
      <div className="absolute -right-[75px] bottom-[190px] -z-20 h-[103px] w-[125px] rotate-[10deg] bg-ellipse-pattern bg-contain opacity-[0.4]" />
    </section>
  )
}

export default Hero
