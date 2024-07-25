'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import icon from '@/assets/hero/astro-light.svg'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(MotionPathPlugin)

const technologies = [
  { name: 'Astro', icon: icon, x: 300, y: 50 },
  { name: 'React', icon: icon, x: 450, y: 150 },
  { name: 'Vue', icon: icon, x: 200, y: 250 },
  { name: 'Angular', icon: icon, x: 350, y: 350 },
  { name: 'Svelte', icon: icon, x: 150, y: 150 },
  { name: 'Tailwind', icon: icon, x: 400, y: 200 },
  { name: 'Redux', icon: icon, x: 250, y: 50 },
  { name: 'GraphQL', icon: icon, x: 500, y: 300 },
  { name: 'Next.js', icon: icon, x: 300, y: 450 },
  { name: 'TypeScript', icon: icon, x: 100, y: 300 },
  { name: 'HTML5', icon: icon, x: 450, y: 400 },
  { name: 'CSS3', icon: icon, x: 150, y: 400 },
]

export const Technologies = () => {
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
          duration: 4,
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
    <div ref={containerRef} className="relative h-[500px] w-[500px]">
      {technologies.map((tech, index) => (
        <div
          key={index}
          ref={(el: any) => (iconRefs.current[index] = el)}
          className="absolute flex h-[100px] w-[100px] items-center justify-center rounded-full"
        >
          <Image src={tech.icon} alt={tech.name} />
          <span>{tech.name}</span>
        </div>
      ))}
    </div>
  )
}
