'use client'
import { useState, useEffect, FC, MouseEvent } from 'react'
import { useLocale } from 'use-intl'
import Link from 'next/link'

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
  const menuClasses = `pl-5 z-20 w-[300px] -mt-[80px] absolute flex flex-col justify-between h-[95svh] top-[80px] z-22 block bg-black pb-12 transition-all duration-500 ease-in ${
    opened ? 'right-0' : 'right-[-100vw]'
  }`
  const overlayClasses = `fixed inset-0 bg-gray-500 bg-opacity-0 z-10 transition-opacity top-[80px] duration-500 ease-in ${
    opened ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`

  const handleOverlayClick = () => {
    setOpened(false)
  }

  const handleMenuClick = (e: MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div className="block lg:hidden">
      <div className={containerClasses} onClick={() => setOpened(!opened)}>
        <div className="tham-box">
          <div className="tham-inner bg-white" />
        </div>
      </div>
      <div className={overlayClasses} onClick={handleOverlayClick}>
        <div className={menuClasses} onClick={handleMenuClick}>
          <div className="flex h-[100%] flex-col justify-between">
            <ul className="pl-5">
              {menu.map((item: any) => (
                <li
                  key={item.href}
                  className="my-2 w-full py-2 capitalize text-white"
                >
                  <Link href={`/${locale}${item.rout}`}>
                    {locale === 'en' ? item.nameEn : item.nameUa}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mb-10 block text-white">fff</div>
          </div>
        </div>
      </div>
    </div>
  )
}
