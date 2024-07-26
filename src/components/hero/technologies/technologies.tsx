'use client'
import { useRef } from 'react'
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

  const technologies = [
    { name: 'HTML', icon: HTML, x: 300, y: 50 },
    { name: 'SCSS', icon: SCSS, x: 450, y: 150 },
    { name: 'Redux', icon: ReduxLgo, x: 200, y: 250 },
    { name: 'GSAP', icon: GSAPLogo, x: 350, y: 350 },
    { name: 'Strapi', icon: Strapi, x: 150, y: 150 },
    {
      name: 'Astro',
      icon: theme === 'light' ? Astro : AstroWhite,
      x: 400,
      y: 200,
    },
    { name: 'Vue', icon: VueLogo, x: 250, y: 50 },
    { name: 'React', icon: ReactLogo, x: 500, y: 300 },
    {
      name: 'Next.js',
      icon: theme === 'light' ? NextLogo : NextLogoW,
      x: 300,
      y: 450,
    },
    { name: 'TailwindCss', icon: tailwindcssLogo, x: 100, y: 300 },
    { name: 'JavaScript', icon: JavaScriptLogo, x: 450, y: 400 },
    { name: 'TypeScript', icon: TypeScriptLogo, x: 150, y: 400 },
  ]

  const containerRef = useRef<HTMLDivElement>(null)
  const iconRefs = useRef<HTMLDivElement[]>([])

  useGSAP(() => {
    iconRefs.current.forEach((ref) => {
      gsap.to(ref, {
        rotation: '-=360',
        duration: 25,
        ease: 'none',
        repeat: -1,
        transformOrigin: 'center center',
      })
    })

    const positions = technologies.map((tech) => ({
      x: tech.x - 50,
      y: tech.y - 50,
    }))

    const animateIcons = () => {
      const shuffledPositions = positions
        .slice()
        .sort(() => Math.random() - 0.5)
      iconRefs.current.forEach((ref, index) => {
        gsap.to(ref, {
          x: shuffledPositions[index].x,
          y: shuffledPositions[index].y,
          duration: 2,
          ease: 'power2.inOut',
        })
      })
    }

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
  })

  return (
    <div className="relative mt-[31px] flex h-[500px] w-[500px] items-center justify-center">
      <div className="absolute h-[500px] w-[500px] rounded-full border-[1px] border-white opacity-[0.5]" />
      <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[1px] border-white opacity-[0.5]" />
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[1px] border-white opacity-[0.5]" />
      <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[1px] border-white opacity-[0.5]" />
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[1px] border-white opacity-[0.5]" />
      <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[1px] border-white opacity-[0.5]" />
      <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[1px] border-white opacity-[0.5]" />
      <div className="absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[1px] border-white opacity-[0.5]" />
      <div className="absolute left-1/2 top-1/2 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[1px] border-white opacity-[0.5]" />
      <div ref={containerRef} className="relative h-[500px] w-[500px]">
        {technologies.map((tech, index) => (
          <div
            key={index}
            ref={(el: any) => (iconRefs.current[index] = el)}
            className="absolute flex h-[100px] w-[100px] flex-col items-center justify-center rounded-full"
          >
            <Image
              src={tech.icon}
              alt={tech.name}
              width={48}
              height={48}
              className="object-cover"
              quality={100}
            />
            <span className="text-[16px] font-light text-[#FAFAFA]">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
