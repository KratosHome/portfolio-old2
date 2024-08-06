'use client'
import './header.scss'
import LanguageChange from '@/components/language-change/language-change'
import ThemeChange from '@/components/theme-change/theme-change'
import Link from 'next/link'
import Image from 'next/image'
import { menuData } from '@/data/menuData'
import { MobileMenu } from '@/components/header/mobile-menu'
import arrow from '@/assets/icons/arrow-small.svg'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useLocale } from 'use-intl'
import { useTranslations } from 'next-intl'
import { useGSAP } from '@gsap/react'

export const Header = () => {
  const t = useTranslations('header')
  const locale = useLocale() as LanguageProps
  const menu = menuData[locale]
  const { contextSafe } = useGSAP()

  const subMenuRefs = useRef<Array<HTMLUListElement | null>>([])

  const showSubMenu = contextSafe((index: number) => {
    gsap.to(subMenuRefs.current[index], {
      duration: 0.7,
      height: 'auto',
      opacity: 1,
      ease: 'power3.out',
    })
  })

  const hideSubMenu = contextSafe((index: number) => {
    gsap.to(subMenuRefs.current[index], {
      duration: 0.5,
      height: 0,
      opacity: 0,
      ease: 'power3.in',
    })
  })

  return (
    <header className="max-w-screen pt-[20px]">
      <div className="mx-auto max-w-[1442px] px-[24px] text-[10px] font-normal sm:text-[20px] lg:text-[28px]">
        <div className="relative mb-[10px] lg:max-w-[90%]">
          <div className="flex w-full items-center justify-between">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-[6px] text-[20px] lg:text-[28px]"
            >
              <Image src={'/logo.svg'} alt={'logo'} width="40" height="40" />
              <span className="block uppercase">{t('name')}</span>
            </Link>
            <nav className="hidden lg:block">
              <ul className="flex items-center gap-[32px]">
                {menu.map((item: any, index: number) => (
                  <li
                    key={item.link}
                    className="group relative duration-300 hover:text-[#0B66F5]"
                    onMouseEnter={() => showSubMenu(index)}
                    onMouseLeave={() => hideSubMenu(index)}
                  >
                    <Link href={`/${locale}/${item.link}`} className="flex">
                      <span>{item.name}</span>
                      {item.subMenu.length > 0 && (
                        <Image
                          src={arrow}
                          className="mt-2 rotate-180 duration-300 group-hover:rotate-0"
                          alt={t('arrow-menu')}
                          width="30"
                          height="30"
                        />
                      )}
                    </Link>
                    {item.subMenu.length > 0 && (
                      <ul
                        ref={(el: any) => (subMenuRefs.current[index] = el)}
                        className="from-white/12 lg absolute right-0 top-full z-20 overflow-hidden rounded-lg border border-stone-500/30 bg-gradient-to-br to-white/0 px-[12px] py-[8px] text-white opacity-0 backdrop-blur-[12.5px]"
                        style={{ height: 0, opacity: 0 }}
                      >
                        {item.subMenu.map((subItem: any) => (
                          <li
                            key={subItem.link}
                            className="mb-[8px] rounded-lg border-b border-b-[#0B66F5] bg-gradient-to-r from-[#0b66f54d] via-[#4e80ce26] to-[#ffffff00] px-[12px] py-[8px] capitalize duration-300 hover:bg-[#0B66F5]"
                          >
                            <Link href={`/${locale}/${subItem.link}`}>
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
                <li className="group">
                  <Link
                    className="custom-login block rounded-[35px] border-b border-zinc-600 bg-[linear-gradient(153deg,_rgba(255,255,255,0.12)_2.19%,_rgba(255,255,255,0)_99.21%)] bg-gradient-to-r from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] px-[15px] py-[10px] backdrop-blur-[12.5px]"
                    href={`/${locale}/login`}
                  >
                    <span className="block duration-300 group-hover:scale-[1.1]">
                      {' '}
                      {t('login')}
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="hidden items-center gap-[15px] lg:flex">
              <ThemeChange />
              <LanguageChange />
            </div>
            <MobileMenu menu={menu} />
          </div>
        </div>
      </div>
      <div className="responsive-width relative">
        <div className="animate-grow inabsolute block h-[1px] overflow-x-hidden bg-[#FAFAFA]"></div>
      </div>
    </header>
  )
}
