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

const Hero = () => {
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
        <div className="absolute -top-[50px] -z-10 h-[280px] w-[280px] flex-shrink-0 rounded-[280px] border-[1px] border-black bg-gradient-to-tr from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] backdrop-blur-[12.5px]" />
        <div className="absolute -left-[80px] top-[70px] -z-20 h-[103px] w-[125px] rotate-[10deg] bg-ellipse-pattern bg-contain opacity-[0.4]" />
        <div>
          <h1 className="relative mt-[136px] pt-10">
            <span className="overlay delay-1 ml-[158px] block text-[80px] font-extrabold leading-[0.5]">
              FRONTEND
            </span>
            <span className="overlay delay-2 block text-[64px] font-light">
              DEVELOPER
            </span>
          </h1>
          <div className="overlay delay-2 ml-[211px] text-[20px] text-[#0B66F5]">
            Code as Art: Engeneering & Functional Beauty
          </div>
        </div>
        <div className="bg-hero-pattern bg-cover" />
        <Technologies />
      </div>
      <div className="relative mt-[52px] flex justify-between">
        <div className="flex w-1/2 justify-between">
          <div className="border-r-2 border-white py-[5px] pr-[16px]">
            <a className="">
              <Image
                src={theme === 'light' ? gitHubLight : gitHub}
                alt="github"
                width={40}
                height={40}
              />
            </a>
            <a className="my-[16px] block">
              <Image
                src={theme === 'light' ? linkedinLight : linkedin}
                alt="linkedin"
                width={40}
                height={40}
                className="fill-blue-700"
              />
            </a>
            <a>
              <Image
                src={theme === 'light' ? telegramLight : telegram}
                alt="telegram"
                width={40}
                height={40}
              />
            </a>
          </div>
          <button className="absolute -top-[120px] left-[310px] h-[120px] w-[120px] flex-shrink-0 rounded-[280px] border-[1px] border-black bg-gradient-to-tr from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] backdrop-blur-[12.5px]">
            HIRE ME
            <Image
              src={ArrowRight}
              alt={'arrow right'}
              width={40}
              height={40}
            />
          </button>
        </div>
        <h2 className="relative min-w-[550px] text-end text-[64px] font-light leading-[1]">
          <span className="overlay delay-2" />
          <span className="delay-3 overlay-blue block text-[#0B66F5]">
            EXPERIENCE
          </span>
          <span className="overlay delay-3 block text-start">
            {years} YEARS
          </span>
        </h2>
      </div>
      <div className="absolute -bottom-[220px] left-1/2 -z-20 h-[300px] w-[300px] -translate-x-1/2 bg-group-pattern opacity-[0.1]" />
      <div className="absolute -top-[600px] left-[200px] -z-20 h-[1900px] w-[1900px] transform bg-hero-pattern" />
      <div className="absolute -top-[100px] right-[200px] -z-20 h-[1900px] w-[1900px] transform bg-hero-pattern" />
    </section>
  )
}

export default Hero
