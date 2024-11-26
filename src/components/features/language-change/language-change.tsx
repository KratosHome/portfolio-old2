'use client'
import './language-change.scss'
import { useEffect, useState, Fragment } from 'react'
import { useLocale } from 'use-intl'
import Image from 'next/image'
import arrow from '@/assets/icons/arrow.svg'
import { localesData } from '@/data/locales-data'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import arrowBlack from '@/assets/icons/arrow-dark-small.svg'
import { Menu, Transition } from '@headlessui/react'

interface LanguageChangeProps {
  isMobile?: boolean
}

export default function LanguageChange({ isMobile }: LanguageChangeProps) {
  const t = useTranslations('header')
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const { theme } = useTheme()
  const [currentSrc, setCurrentSrc] = useState(arrow)

  useEffect(() => {
    setCurrentSrc(theme === 'dark' ? arrow : arrowBlack)
  }, [theme])

  const changeLocale = (sendLocale: string) => {
    const newPathname = `${sendLocale}/${pathname.split('/').slice(2).join('/')}`
    router.push(`${newPathname}`)
  }

  return (
    <div className="group flex gap-2 text-lg">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button
          className={`custom-language relative flex transform items-center gap-[8px] rounded-[35px] border-b border-zinc-600 bg-transparent uppercase backdrop-blur-[0.5px] ${
            isMobile
              ? 'px-[12px] py-[8px] text-[16px]'
              : 'px-[15px] py-[10px] text-[20px]'
          }`}
        >
          <span className="block text-[20px] duration-300 group-hover:scale-105">
            {locale}
          </span>
          <Image
            className="block duration-300 group-hover:scale-125"
            src={currentSrc}
            alt={t('switch-local')}
            width={20}
            height={20}
          />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition duration-500 ease-out"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition duration-500 ease-in"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`absolute top-[80px] z-10 ${
              isMobile ? 'left-[-40px] -translate-x-1/2' : '-ml-[40px]'
            } flex max-h-[210px] min-w-[175px] flex-col items-start gap-[6px] overflow-auto rounded-[8px] border-[1px] border-black bg-[#0B66F5] bg-gradient-to-r from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] p-[8px_12px] backdrop-blur-[12.5px] dark:bg-transparent`}
          >
            {localesData.map((loc) => (
              <Menu.Item key={loc.name}>
                {({ active }) => (
                  <div
                    onClick={() => changeLocale(`/${loc.local}`)}
                    className={`from-white/12 to-transparent/99.21 group flex w-full cursor-pointer items-center gap-2 rounded-lg border-b border-black bg-gradient-to-r px-[12px] py-[8px] normal-case backdrop-blur-[12.5px] duration-300 ${
                      active ? 'bg-white dark:bg-stone-500' : ''
                    } ${locale === loc.local ? 'font-semibold' : 'font-light'}`}
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
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
