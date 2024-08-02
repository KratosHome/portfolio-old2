'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useGSAP } from '@gsap/react'
import { useTheme } from 'next-themes'

import JavaScriptLogo from '@/assets/technologies/JavaScriptLogo.svg'
import TypeScriptLogo from '@/assets/technologies/TypeScriptLogo.svg'
import tailwindcssLogo from '@/assets/technologies/tailwindcss.svg'
import NextLogo from '@/assets/technologies/NextLogo.svg'
import NextLogoW from '@/assets/technologies/NextLogoWgite.svg'
import ReactLogo from '@/assets/technologies/ReactLogo.svg'
import VueLogo from '@/assets/technologies/vue.svg'
import Astro from '@/assets/technologies/astro-dark.svg'
import AstroWhite from '@/assets/technologies/astro-light.svg'
import Strapi from '@/assets/technologies/StrapiLogo.svg'
import GSAPLogo from '@/assets/technologies/gsap-greensock.svg'
import ReduxLgo from '@/assets/technologies/ReduxLogo.svg'
import SCSS from '@/assets/technologies/CSSLogo.svg'
import HTML from '@/assets/technologies/HTMLLogo.svg'

gsap.registerPlugin(MotionPathPlugin)

export const Technologies = () => {
  const { theme } = useTheme()

  const technologiesMob = [
    { name: 'HTML', icon: HTML, x: 60, y: 40 },
    { name: 'SCSS', icon: SCSS, x: 90, y: 50 },
    { name: 'Redux', icon: ReduxLgo, x: 40, y: 50 },
    { name: 'GSAP', icon: GSAPLogo, x: 70, y: 70 },
    { name: 'Strapi', icon: Strapi, x: 30, y: 50 },
    {
      name: 'Astro',
      icon: theme === 'light' ? Astro : AstroWhite,
      x: 80,
      y: 40,
    },
    { name: 'Vue', icon: VueLogo, x: 50, y: 40 },
    { name: 'React', icon: ReactLogo, x: 100, y: 60 },
    {
      name: 'Next.js',
      icon: theme === 'light' ? NextLogo : NextLogoW,
      x: 70,
      y: 90,
    },
    { name: 'TailwindCss', icon: tailwindcssLogo, x: 20, y: 60 },
    { name: 'JavaScript', icon: JavaScriptLogo, x: 90, y: 80 },
    { name: 'TypeScript', icon: TypeScriptLogo, x: 30, y: 80 },
  ]

  const technologies = [
    { name: 'HTML', icon: HTML, x: 60, y: 10 },
    { name: 'SCSS', icon: SCSS, x: 90, y: 30 },
    { name: 'Redux', icon: ReduxLgo, x: 40, y: 50 },
    { name: 'GSAP', icon: GSAPLogo, x: 70, y: 70 },
    { name: 'Strapi', icon: Strapi, x: 30, y: 30 },
    {
      name: 'Astro',
      icon: theme === 'light' ? Astro : AstroWhite,
      x: 80,
      y: 40,
    },
    { name: 'Vue', icon: VueLogo, x: 50, y: 10 },
    { name: 'React', icon: ReactLogo, x: 100, y: 60 },
    {
      name: 'Next.js',
      icon: theme === 'light' ? NextLogo : NextLogoW,
      x: 60,
      y: 90,
    },
    { name: 'TailwindCss', icon: tailwindcssLogo, x: 20, y: 60 },
    { name: 'JavaScript', icon: JavaScriptLogo, x: 90, y: 80 },
    { name: 'TypeScript', icon: TypeScriptLogo, x: 30, y: 80 },
  ]

  const [isMobile, setIsMobile] = useState(false)
  const [currentTechnologies, setCurrentTechnologies] = useState(
    isMobile ? technologiesMob : technologies,
  )
  useEffect(() => {
    setIsMobile(window.innerWidth <= 900)
  }, [])

  useEffect(() => {
    setCurrentTechnologies(isMobile ? technologiesMob : technologies)
  }, [isMobile])

  const containerRef = useRef<HTMLDivElement>(null)
  const iconRefs = useRef<HTMLDivElement[]>([])

  useGSAP(() => {
    const container = containerRef.current
    if (!container) return

    const { width, height } = container.getBoundingClientRect()

    const positions = currentTechnologies.map((tech) => ({
      x: (tech.x / 100) * width - 50,
      y: (tech.y / 100) * height - 50,
    }))

    const animateIcons = () => {
      const shuffledPositions = positions
        .slice()
        .sort(() => Math.random() - 0.2)
      iconRefs.current.forEach((ref, index) => {
        gsap.to(ref, {
          x: shuffledPositions[index].x,
          y: shuffledPositions[index].y,
          duration: 2,
          ease: 'power2.inOut',
        })
      })
    }

    iconRefs.current.forEach((ref) => {
      gsap.to(ref, {
        rotation: '-=360',
        duration: 25,
        ease: 'none',
        repeat: -1,
        transformOrigin: 'center center',
      })
    })

    gsap.to(
      {},
      { duration: 0, repeat: -1, repeatDelay: 5, onRepeat: animateIcons },
    )

    gsap.to(containerRef.current, {
      rotation: '+=360',
      duration: 25,
      ease: 'none',
      repeat: -1,
      transformOrigin: 'center center',
    })

    animateIcons()
  }, [currentTechnologies])

  return (
    <div className="relative -z-10 mt-[31px] flex size-[300px] items-center justify-center sm:size-[400px] lg:size-[500px]">
      <div className="absolute size-[300px] rounded-full border-[1px] border-white opacity-[0.5] sm:size-[450px] lg:size-[500px]" />
      <div className="absolute left-1/2 top-1/2 hidden size-[300px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[1px] border-white opacity-[0.5] sm:block sm:size-[400px] lg:size-[450px]" />
      <div className="absolute left-1/2 top-1/2 size-[250px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[1px] border-white opacity-[0.5] sm:size-[350px] lg:size-[400px]" />
      <div className="absolute left-1/2 top-1/2 size-[200px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[1px] border-white opacity-[0.5] sm:size-[300px] lg:size-[350px]" />
      <div className="absolute left-1/2 top-1/2 size-[150px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[1px] border-white opacity-[0.5] sm:size-[250px] lg:size-[300px]" />
      <div className="absolute left-1/2 top-1/2 size-[100px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[1px] border-white opacity-[0.5] sm:size-[200px] lg:size-[250px]" />
      <div className="absolute left-1/2 top-1/2 size-[50px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[1px] border-white opacity-[0.5] sm:size-[150px] lg:size-[200px]" />
      <div className="absolute left-1/2 top-1/2 hidden size-[30px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[1px] border-white opacity-[0.5] sm:block sm:size-[100px] lg:size-[150px]" />
      <div className="absolute left-1/2 top-1/2 hidden size-[10px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[1px] border-white opacity-[0.5] sm:block sm:size-[50px] lg:size-[100px]" />
      <div ref={containerRef} className="relative h-[500px] w-[500px]">
        {currentTechnologies.map((tech, index) => (
          <div
            key={index}
            ref={(el: any) => (iconRefs.current[index] = el)}
            className="absolute -m-5 flex size-[30px] flex-col items-center justify-center rounded-full lg:size-[100px]"
          >
            <Image
              src={tech.icon}
              alt={tech.name}
              width={48}
              height={48}
              className="h-[24px] w-[24px] object-cover lg:h-[48px] lg:w-[48px]"
              quality={100}
            />
            <span className="text-[12px] font-light text-[#FAFAFA] lg:text-[16px]">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
