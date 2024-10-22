'use client'
import './header.scss'
import LanguageChange from '@/components/language-change/language-change'
import ThemeChange from '@/components/theme-change/theme-change'
import Link from 'next/link'
import Image from 'next/image'
import { menuData } from '@/data/menuData'
import arrow from '@/assets/icons/arrow-small.svg'
import arrowBlack from '@/assets/icons/arrow-dark-small.svg'
import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useLocale } from 'use-intl'
import { useTranslations } from 'next-intl'
import { useGSAP } from '@gsap/react'
import { useSession } from 'next-auth/react'
import { useStore } from '@/store/user'
import { projectStore } from '@/store/project'
import { useTheme } from 'next-themes'
import { MobileMenu } from '@/components/layout/header/mobile-menu'

interface IMenuProps {
  userInfo?: ReactNode
}

const Header: FC<IMenuProps> = ({ userInfo }) => {
  const subMenuTimers = useRef<Array<NodeJS.Timeout | null>>([])
  const subMenuRefs = useRef<Array<HTMLUListElement | null>>([])

  const t = useTranslations('header')
  const locale = useLocale() as LanguageProps
  const { contextSafe } = useGSAP()
  const { theme } = useTheme()
  const { data: session } = useSession()
  const { user, fetchUser } = useStore()

  const menu = menuData[locale]

  const [currentSrc, setCurrentSrc] = useState(arrow)
  const { fetchProjects } = projectStore()

  useEffect(() => {
    setCurrentSrc(theme === 'dark' ? arrow : arrowBlack)
  }, [theme])

  useEffect(() => {
    if (session?.user) {
      const fetchData = async () => {
        await fetchUser(session.user?.email)
      }
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  useEffect(() => {
    const fetchData = async () => {
      await fetchProjects(user._id)
    }
    fetchData()
  }, [fetchProjects, user])

  const showSubMenu = contextSafe((index: number) => {
    if (subMenuTimers.current[index]) {
      clearTimeout(subMenuTimers.current[index] as NodeJS.Timeout)
    }

    gsap.to(subMenuRefs.current[index], {
      duration: 0.7,
      height: 'auto',
      opacity: 1,
      ease: 'power3.out',
    })
  })

  const hideSubMenu = contextSafe((index: number) => {
    subMenuTimers.current[index] = setTimeout(() => {
      gsap.to(subMenuRefs.current[index], {
        duration: 0.5,
        height: 0,
        opacity: 0,
        ease: 'power3.in',
      })
    }, 200)
  })

  return (
    <>
      <header className="max-w-screen pt-[20px]">
        <div className="mx-auto max-w-[1442px] px-[24px] text-[10px] font-normal sm:text-[20px] lg:text-[28px]">
          <div className="relative mb-[10px] lg:max-w-[90%]">
            <div className="flex w-full items-center justify-between">
              {userInfo}
              <nav className="hidden text-[20px] lg:block">
                <ul className="flex items-center gap-[32px]">
                  {menu.map((item: IMenuItem, index: number) => (
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
                            src={currentSrc}
                            className="mt-2 rotate-180 duration-300 group-hover:rotate-0"
                            alt={t('arrow-menu')}
                            width="20"
                            height="20"
                          />
                        )}
                      </Link>
                      {item.subMenu.length > 0 && (
                        <ul
                          ref={(el: HTMLUListElement | null) => {
                            subMenuRefs.current[index] = el
                          }}
                          className="from-white/12 lg absolute right-0 top-full z-50 min-w-max overflow-hidden rounded-lg border border-stone-500/30 bg-[#0B66F5] bg-gradient-to-br to-white/0 px-[12px] py-[8px] text-white opacity-0 backdrop-blur-[12.5px] dark:bg-transparent"
                          style={{ height: 0, opacity: 0 }}
                        >
                          {item.subMenu.map((subItem: ISubMenu) => (
                            <li
                              key={subItem.link}
                              className="mb-[8px] rounded-lg border-b border-b-[#050505] bg-[linear-gradient(153deg,_rgba(255,_255,_255,_0.12)_2.19%,_rgba(255,_255,_255,_0)_99.21%)] bg-gradient-to-r from-[#0b66f54d] via-[#4e80ce26] to-[#ffffff00] px-[12px] py-[8px] capitalize text-black duration-300 hover:bg-[white] dark:border-b-[#0B66F5] dark:text-white hover:dark:bg-[#0B66F5]"
                            >
                              <Link
                                href={`/${locale}/${subItem.link}`}
                                className="block w-full"
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                  {/*
                                <li className="group">
                    <Link
                      className="custom-login block rounded-[35px] border-b border-[#0B66F5] px-[15px] py-[10px] text-[#0B66F5] backdrop-blur-[12.5px] dark:border-zinc-600 dark:text-white"
                      href={`/${locale}/login`}
                    >
                      <span className="block duration-300 group-hover:scale-[1.1]">
                        {t('login')}
                      </span>
                    </Link>
                  </li>
                     */}
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
          <div className="animate-grow inabsolute block h-[1px] overflow-x-hidden bg-[#050505] dark:bg-[#FAFAFA]"></div>
        </div>
      </header>
      <div className="absolute mt-[15px] flex w-full justify-end pr-[30px] lg:hidden">
        <ThemeChange />
      </div>
      <div className="relative mx-auto max-w-[1842px]">
        <div className="animate-scale-in-out absolute -right-[50px] -top-[170px] -z-10 hidden h-[300px] w-[300px] bg-cover bg-center bg-group-pattern-light dark:bg-group-pattern dark:opacity-[.1] lg:block" />
      </div>
    </>
  )
}

export default Header
