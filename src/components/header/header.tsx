import LanguageChange from '@/components/language-change/language-change'
import ThemeChange from '@/components/theme-change/theme-change'
import Link from 'next/link'
import { getLocale } from 'next-intl/server'
import Image from 'next/image'
import { menuData } from '@/data/menuData'

export const Header = async () => {
  const locale = (await getLocale()) as LanguageProps
  const menu = menuData[locale]

  return (
    <header className="mt-[20px] py-[20px]">
      <div className="mx-auto max-w-[1442px] text-[28px] font-normal">
        <div className="relative mb-[10px] max-w-[90%]">
          <div className="flex w-full items-center justify-between">
            <Link href="/" className="flex gap-[6px] text-[28px]">
              <Image src={'/logo.png'} alt={'logo'} width="40" height="40" />
              <span className="block">OLEG TKACH</span>
            </Link>
            <nav>
              <ul className="flex items-center gap-[32px]">
                {menu.map((item) => (
                  <li key={item.link} className="">
                    <Link href={`/${locale}/${item.link}`}>{item.name}</Link>
                  </li>
                ))}
                <li className="rounded-[35px] border-b border-zinc-600 bg-[linear-gradient(153deg,_rgba(255,255,255,0.12)_2.19%,_rgba(255,255,255,0)_99.21%)] bg-gradient-to-r from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] px-[15px] py-[10px] backdrop-blur-[12.5px]">
                  <Link href={`/${locale}/login`}>Login</Link>
                </li>
              </ul>
            </nav>
            <div className="flex items-center gap-[15px]">
              <ThemeChange />
              <LanguageChange />
            </div>
          </div>
          <div className="bg-group-pattern absolute -right-[270px] -top-[100px] -z-10 h-[300px] w-[300px] bg-cover bg-center opacity-[.1]" />
        </div>
      </div>
      <div
        className="relative"
        style={{ width: 'calc(90vw - ((110vw - 1542px) / 3))' }}
      >
        <div className="animate-grow absolute block h-[1px] overflow-x-hidden bg-[#FAFAFA]"></div>
      </div>
    </header>
  )
}
