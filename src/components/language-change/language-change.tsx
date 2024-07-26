'use client'
import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useLocale } from 'use-intl'
import Image from 'next/image'
import arrow from '@/assets/icons/arrow.svg'

const availableLocales = ['uk', 'en', 'fr', 'de']

export default function LanguageChange() {
  const locale = useLocale()
  const ref = useRef(null)
  const { contextSafe } = useGSAP()
  const pathname = usePathname()
  const router = useRouter()

  const redirectedPathName = (sendLocale: string) => {
    const newPathname = `/${sendLocale}/${pathname.split('/').slice(2).join('/')}`
    router.push(`${newPathname}`)
  }

  const handleMouseEnter = contextSafe(() => {
    gsap.fromTo(
      ref.current,
      { scale: 1 },
      {
        scale: 0.6,
        duration: 0.3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: 1,
      },
    )
  })

  return (
    <div className="flex gap-2 text-lg uppercase">
      <button className="relative flex items-center gap-[8px] rounded-[35px] border-b border-zinc-600 bg-transparent px-[15px] py-[15px] uppercase backdrop-blur-[0.5px]">
        <span className="block">{locale}</span>
        <Image
          src={arrow}
          alt={'open modal shoes language'}
          width={20}
          height={20}
        />
      </button>
    </div>
  )
}

/*
      {availableLocales.map((loc) => (
        <div
          key={loc}
          onMouseEnter={handleMouseEnter}
          onClick={() => redirectedPathName(loc)}
          className={`group flex cursor-pointer gap-2 ${locale === loc ? 'font-bold' : ''}`}
        >
          {loc}
        </div>
      ))}
 */
