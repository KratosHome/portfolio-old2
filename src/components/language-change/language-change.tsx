'use client'
import { useRef, useState } from 'react'
import { useLocale } from 'use-intl'
import Image from 'next/image'
import { gsap } from 'gsap'
import arrow from '@/assets/icons/arrow.svg'
import { localesData } from '@/data/locales-data'
import { useGSAP } from '@gsap/react'
import { usePathname, useRouter } from 'next/navigation'

export default function LanguageChange() {
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useGSAP(
    () => {
      if (isOpen) {
        gsap.to(menuRef.current, {
          duration: 0.5,
          height: 'auto',
          opacity: 1,
          ease: 'power3.out',
        })
      } else {
        gsap.to(menuRef.current, {
          duration: 0.5,
          height: 0,
          opacity: 0,
          ease: 'power3.in',
        })
      }
    },
    { dependencies: [isOpen] },
  )

  const changeLocale = (sendLocale: string) => {
    const newPathname = `${sendLocale}/${pathname.split('/').slice(2).join('/')}`
    router.push(`${newPathname}`)
  }

  return (
    <div className="flex gap-2 text-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center gap-[8px] rounded-[35px] border-b border-zinc-600 bg-transparent px-[15px] py-[15px] uppercase backdrop-blur-[0.5px]"
      >
        <span className="block text-[20px]">{locale}</span>
        <Image
          src={arrow}
          alt={'open modal shoes language'}
          width={20}
          height={20}
        />
      </button>
      <div
        ref={menuRef}
        className="absolute top-[80px] z-10 -ml-[40px] flex max-h-[210px] min-w-[175px] flex-col items-start gap-[6px] overflow-auto rounded-[8px] border-[1px] border-black bg-gradient-to-r from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] p-[8px_12px] backdrop-blur-[12.5px]"
        style={{ height: 0, opacity: 0 }}
      >
        {localesData.map((loc) => (
          <div
            onClick={() => changeLocale(`/${loc.locale}`)}
            key={loc.name}
            className={`from-white/12 to-transparent/99.21 group flex w-full cursor-pointer items-center gap-2 rounded-lg border-b border-black bg-gradient-to-r px-[12px] py-[8px] normal-case backdrop-blur-[12.5px] ${locale === loc.locale ? 'font-semibold' : 'font-light'}`}
          >
            {loc.icon && (
              <Image
                className="min-h-[20px] min-w-[20px] overflow-hidden rounded-full object-cover"
                src={loc.icon}
                alt={loc.name}
                width={20}
                height={20}
              />
            )}
            <span className="text-[16px]"> {loc.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
