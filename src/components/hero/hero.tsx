'use client'
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
        <div className="bg-ellipse-pattern absolute -left-[80px] top-[70px] -z-20 h-[103px] w-[125px] rotate-[10deg] bg-contain bg-center opacity-[0.4]" />
        <div>
          <h1 className="mt-[136px]">
            <span className="ml-[158px] block text-[80px] font-extrabold leading-[0.5]">
              FRONTEND
            </span>
            <span className="block text-[64px] font-light">DEVELOPER</span>
          </h1>
          <div className="ml-[211px] text-[20px] text-[#0B66F5]">
            Code as Art: Engeneering & Functional Beauty
          </div>
        </div>
        <div className="bg-hero-pattern bg-cover bg-center" />
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
          </button>
        </div>
        <h2 className="text-end text-[64px] font-light leading-[1]">
          <span className="block text-[#0B66F5]">EXPERIENCE</span>
          <span className="-ml-[154px] block text-start">{years} YEARS</span>
        </h2>
      </div>
      <div className="bg-group-pattern absolute -bottom-[220px] left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 transform bg-cover bg-center opacity-[0.1]" />
    </section>
  )
}

export default Hero
