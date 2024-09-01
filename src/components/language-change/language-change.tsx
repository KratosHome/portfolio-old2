'use client'
import './language-change.scss'
import { useRef, useState } from 'react'
import { useLocale } from 'use-intl'
import Image from 'next/image'
import { gsap } from 'gsap'
import arrow from '@/assets/icons/arrow.svg'
import { localesData } from '@/data/locales-data'
import { useGSAP } from '@gsap/react'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function LanguageChange({ isMobile }: any) {
  const t = useTranslations('header')
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const menuRef = useRef(null)
  const bgMenuRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  useGSAP(
    () => {
      if (isOpen) {
        gsap.to(menuRef.current, {
          duration: 0.5,
          height: 'auto',
          opacity: 1,
          ease: 'power3.out',
        })
        gsap.to(bgMenuRef.current, {
          duration: 0.5,
          opacity: 1,
          ease: 'power3.out',
          zIndex: 10,
          display: 'block',
        })
      } else {
        gsap.to(menuRef.current, {
          duration: 0.5,
          height: 0,
          opacity: 0,
          ease: 'power3.in',
        })
        gsap.to(bgMenuRef.current, {
          duration: 0.5,
          opacity: 0,
          ease: 'power3.in',
          display: 'none',
          zIndex: -1010,
        })
      }
    },
    { dependencies: [isOpen] },
  )

  const changeLocale = (sendLocale: string) => {
    const newPathname = `${sendLocale}/${pathname.split('/').slice(2).join('/')}`
    router.push(`${newPathname}`)
    setIsOpen(false)
  }

  return (
    <>
      <div className="group flex gap-2 text-lg">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`custom-language relative flex transform items-center gap-[8px] rounded-[35px] border-b border-zinc-600 bg-transparent uppercase backdrop-blur-[0.5px] ${
            isMobile
              ? 'px-[12px] py-[8px] text-[16px]'
              : 'px-[15px] py-[15px] text-[20px]'
          }`}
        >
          <span className="block text-[20px] duration-300 group-hover:scale-105">
            {locale}
          </span>
          <Image
            className="block duration-300 group-hover:scale-125"
            src={arrow}
            alt={t('switch-local')}
            width={20}
            height={20}
          />
        </button>
        {!isMobile && (
          <div
            ref={menuRef}
            className="absolute top-[80px] z-10 -ml-[40px] flex max-h-[210px] min-w-[175px] flex-col items-start gap-[6px] overflow-auto rounded-[8px] border-[1px] border-black bg-gradient-to-r from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] p-[8px_12px] backdrop-blur-[12.5px]"
            style={{ height: 0, opacity: 0 }}
          >
            {localesData.map((loc) => (
              <div
                onClick={() => changeLocale(`/${loc.local}`)}
                key={loc.name}
                className={`from-white/12 to-transparent/99.21 group flex w-full cursor-pointer items-center gap-2 rounded-lg border-b border-black bg-gradient-to-r px-[12px] py-[8px] normal-case backdrop-blur-[12.5px] ${locale === loc.local ? 'font-semibold' : 'font-light'}`}
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
                <span className="text-[16px]">{loc.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {isMobile && (
        <div
          ref={bgMenuRef}
          onClick={(event) => {
            event.stopPropagation()
            setIsOpen(!isOpen)
          }}
          className="absolute -right-5 -top-16 h-screen w-screen rounded-lg border border-black bg-[linear-gradient(153deg,_rgba(255,255,255,0.12)_2.19%,_rgba(255,255,255,0)_99.21%)]"
          style={{ opacity: 0 }}
        >
          <div
            ref={menuRef}
            className="absolute left-1/2 top-1/2 flex max-h-[210px] min-w-[175px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-start gap-[6px] overflow-auto rounded-[8px] border-[1px] border-black border-stone-500/30 bg-[linear-gradient(127deg,_rgba(11,_102,_245,_0.50)_49.23%,_rgba(78,_128,_206,_0.15)_83.27%,_rgba(255,_255,_255,_0.00)_102.62%)] p-[8px_12px] backdrop-blur-[12.5px]"
            style={{ height: 0, opacity: 0 }}
          >
            {localesData.map((loc) => (
              <div
                onClick={() => changeLocale(`/${loc.local}`)}
                key={loc.name}
                className={`from-white/12 to-transparent/99.21 group flex w-full cursor-pointer items-center gap-2 rounded-lg border-b border-black bg-gradient-to-r px-[12px] py-[8px] normal-case backdrop-blur-[12.5px] ${locale === loc.local ? 'font-semibold' : 'font-light'}`}
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
                <span className="text-[16px]">{loc.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
