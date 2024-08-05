import './header.scss'
import LanguageChange from '@/components/language-change/language-change'
import ThemeChange from '@/components/theme-change/theme-change'
import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { menuData } from '@/data/menuData'
import { MobileMenu } from '@/components/header/mobile-menu'
import arrow from '@/assets/icons/arrow-small.svg'

export const Header = async () => {
  const t = await getTranslations('header')
  const locale = (await getLocale()) as LanguageProps
  const menu = menuData[locale]

  return (
    <header className="max-w-screen overflow-x-hidden pb-[300px] pt-[20px]">
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
                {menu.map((item) => (
                  <li
                    key={item.link}
                    className="group relative duration-300 hover:text-[#0B66F5]"
                  >
                    <Link href={`/${locale}/${item.link}`} className="flex">
                      <span>{item.name}</span>
                      {item.subMenu.length > 0 && (
                        <Image
                          src={arrow}
                          alt={t('arrow-menu')}
                          width="30"
                          height="30"
                        />
                      )}
                    </Link>
                    {item.subMenu.length > 0 && (
                      <ul className="absolute left-0 top-full z-20 hidden bg-white shadow-lg group-hover:block">
                        {item.subMenu.map((subItem) => (
                          <li key={subItem.link} className="hover:bg-gray-100">
                            <Link
                              href={`/${locale}/${subItem.link}`}
                              className="block px-4 py-2"
                            >
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
          <div className="animate-scale-in-out absolute -right-[270px] -top-[100px] -z-10 h-[300px] w-[300px] bg-group-pattern bg-cover bg-center opacity-[.1]" />
        </div>
      </div>
      <div className="responsive-width relative">
        <div className="animate-grow inabsolute block h-[1px] overflow-x-hidden bg-[#FAFAFA]"></div>
      </div>
    </header>
  )
}
