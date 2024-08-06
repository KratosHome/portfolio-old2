'use client'
import { useState, useEffect, FC, MouseEvent } from 'react'
import { useLocale } from 'use-intl'
import Link from 'next/link'
import LanguageChange from '@/components/language-change/language-change'

interface MobileMenuProps {
  menu: any
}

export const MobileMenu: FC<MobileMenuProps> = ({ menu }) => {
  const locale = useLocale()
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    if (opened) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [opened])

  const containerClasses = `tham tham-e-squeeze tham-w-12  ${opened ? 'tham-active' : ''}`

  const overlayClasses = `fixed inset-0 bg-gray-500 bg-opacity-0 z-10 transition-opacity top-[80px] duration-500 ease-in ${
    opened ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`

  const menuClasses = `p-[12px] z-20 w-[240px] h-max border-stone-500/30 absolute -top-[20px] rounded-lg border bg-[linear-gradient(127deg,_rgba(11,_102,_245,_0.30)_49.23%,_rgba(78,_128,_206,_0.15)_83.27%,_rgba(255,_255,_255,_0.00)_102.62%)] backdrop-blur-[12.5px] transition-all duration-500 ease-in ${
    opened ? 'right-5' : 'right-[-100vw]'
  }`

  const handleOverlayClick = () => {
    setOpened(false)
  }

  const handleMenuClick = (e: MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div className="z-20 block lg:hidden">
      <div className={containerClasses} onClick={() => setOpened(!opened)}>
        <div className="tham-box">
          <div className="tham-inner bg-white" />
        </div>
      </div>
      <div className={overlayClasses} onClick={handleOverlayClick}>
        <div className={menuClasses} onClick={handleMenuClick}>
          <nav>
            <ul>
              {menu.map((item: any, index: number) => (
                <li
                  key={item.id}
                  className="from-white/12 mb-[12px] rounded-lg border-b border-b-stone-500/60 bg-gradient-to-tr to-white/0 px-[12px] py-[8px] text-[16px] font-light backdrop-blur-[12.5px]"
                >
                  <Link href={`/${locale}/${item.link}`}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center justify-between">
            <Link
              href={`/${locale}/login`}
              className="custom-language from-white/12 relative rounded-3xl border-b border-b-stone-500/60 bg-gradient-to-tr to-white/0 p-[10px] px-[12px] py-[8px] text-[20px] backdrop-blur-[12.5px]"
            >
              Login
            </Link>
            <LanguageChange isMobile={true} />
          </div>
        </div>
      </div>
    </div>
  )
}
