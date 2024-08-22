'use client'
import { useState } from 'react'
import { Menu } from '@headlessui/react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'

interface DropdownMenuProps {
  label: string
  items: Array<{ name: string; locale: string; icon?: string }>
  onItemClick: (item: { name: string; locale: string }) => void
  icon?: string
}

export default function DropdownItems({
  label,
  items,
  onItemClick,
  icon,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  useGSAP(
    () => {
      if (isOpen) {
        gsap.to('.dropdown-menu', {
          duration: 0.5,
          height: 'auto',
          opacity: 1,
          ease: 'power3.out',
        })
      } else {
        gsap.to('.dropdown-menu', {
          duration: 0.5,
          height: 0,
          opacity: 0,
          ease: 'power3.in',
        })
      }
    },
    { dependencies: [isOpen] },
  )

  return (
    <Menu as="div" className="relative flex gap-2 text-lg">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center gap-[8px] rounded-[35px] border-b border-zinc-600 bg-transparent px-[15px] py-[15px] uppercase backdrop-blur-[0.5px]"
      >
        <span className="block text-[20px]">{label}</span>
        {icon && <Image src={icon} alt="Menu Icon" width={20} height={20} />}
      </Menu.Button>

      <Menu.Items
        static
        className="dropdown-menu absolute top-[80px] z-10 -ml-[40px] flex max-h-[210px] min-w-[175px] flex-col items-start gap-[6px] overflow-auto rounded-[8px] border-[1px] border-black bg-gradient-to-r from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0)] p-[8px_12px] backdrop-blur-[12.5px]"
        style={{ height: 0, opacity: 0 }}
      >
        {items.map((item) => (
          <Menu.Item key={item.name}>
            {({ active }) => (
              <div
                onClick={() => onItemClick(item)}
                className={`group flex w-full cursor-pointer items-center gap-2 rounded-lg border-b border-black bg-gradient-to-r px-[12px] py-[8px] normal-case backdrop-blur-[12.5px] ${
                  label === item.name ? 'font-semibold' : 'font-light'
                } ${active ? 'bg-gray-100' : ''}`}
              >
                {item.icon && (
                  <Image
                    className="min-h-[20px] min-w-[20px] overflow-hidden rounded-full object-cover"
                    src={item.icon}
                    alt={item.name}
                    width={20}
                    height={20}
                  />
                )}
                <span className="text-[16px]">{item.name}</span>
              </div>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
}
