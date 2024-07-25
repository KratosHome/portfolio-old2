import LanguageChange from '@/components/language-change/language-change'
import ThemeChange from '@/components/theme-change/theme-change'
import Link from 'next/link'
import { getLocale } from 'next-intl/server'

const menu = [
  { name: 'Home', link: '/', subMenu: [] },
  {
    name: 'About',
    link: 'about',
    subMenu: [
      { name: 'Me', link: 'about/me' },
      { name: 'You', link: 'about/you' },
    ],
  },
  { name: 'Contact', link: 'contact', subMenu: [] },
]

export const Header = async () => {
  const locale = await getLocale()

  return (
    <header>
      <span>OLEG TKACH</span>
      <div>
        {menu.map((item) => (
          <a key={item.link} href={`/${locale}/${item.link}`}>
            {item.name}
          </a>
        ))}
      </div>
      <Link href={`/${locale}/login`}>login</Link>
      <ThemeChange />
      <LanguageChange />
    </header>
  )
}
