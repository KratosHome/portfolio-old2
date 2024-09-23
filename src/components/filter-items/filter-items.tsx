'use client'
import React, { FC, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import filterIcon from '@/assets/icons/filter.svg'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import { Fragment } from 'react'

interface FilterItemsProps {
  title: string
  url: string
  filters: any
}

export const FilterItems: FC<FilterItemsProps> = ({ filters, title, url }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()

  // Функція для оновлення фільтрів в URL
  const updateFiltersInQuery = (newFilters: string[]) => {
    const queryParams = new URLSearchParams(searchParams?.toString())
    if (newFilters.length > 0) {
      queryParams.set(url, newFilters.join(','))
    } else {
      queryParams.delete(url)
    }
    router.push(`?${queryParams.toString()}`)
  }

  // Функція для перемикання фільтра
  const toggleFilter = (filterId: string) => {
    const newSelectedFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter((f) => f !== filterId)
      : [...selectedFilters, filterId]
    setSelectedFilters(newSelectedFilters)
    updateFiltersInQuery(newSelectedFilters)
  }

  // Використовуємо useEffect для ініціалізації вибраних фільтрів з URL
  useEffect(() => {
    const currentFilters = searchParams?.get(url)
    if (currentFilters) {
      setSelectedFilters(currentFilters.split(','))
    }
  }, [searchParams, url])

  return (
    <div>
      <Menu>
        <MenuButton className="my-[24px] flex">
          <Image
            src={filterIcon}
            alt={title}
            height={24}
            width={24}
            className="cursor-pointer"
          />
          <div className="ml-4">
            {selectedFilters.length > 0
              ? selectedFilters.map((filterId: string) => (
                  <span key={filterId} className="mr-2">
                    {filters.find((f: any) => f.id === filterId)?.label}
                  </span>
                ))
              : `#${title}`}
          </div>
        </MenuButton>
        <Transition
          as={Fragment}
          enter="transition-transform duration-[350ms] ease-[cubic-bezier(0.25, 1, 0.5, 1)]"
          enterFrom="opacity-0 scale-95 -translate-y-4"
          enterTo="opacity-100 scale-100 translate-y-0"
          leave="transition-transform duration-[250ms] ease-[cubic-bezier(0.25, 1, 0.5, 1)]"
          leaveFrom="opacity-100 scale-100 translate-y-0"
          leaveTo="opacity-0 scale-95 -translate-y-4"
        >
          <MenuItems
            transition
            anchor="bottom start"
            className="rounded-lg border border-black bg-gradient-to-br from-[rgba(255,255,255,0.4)] to-[rgba(255,255,255,0)] backdrop-blur-[12.5px]"
          >
            <div className="grid grid-cols-2 gap-4 p-4 lg:grid-cols-3">
              {filters.map((filter: any) => (
                <MenuItem key={filter.id}>
                  <label
                    className={`relative flex cursor-pointer items-center justify-between rounded-lg border-b-[1px] px-[12px] py-[8px] ${
                      selectedFilters.includes(filter.id)
                        ? 'border-blue-gradient bg-[#0B66F5] text-white'
                        : 'border-b-[var(--blue-gradient,#0B66F5)] bg-[linear-gradient(127deg,rgba(11,102,245,0.3)_49.23%,rgba(78,128,206,0.15)_83.27%,rgba(255,255,255,0)_102.62%)] duration-300 hover:bg-[#0B66F5]'
                    }`}
                  >
                    <span>{filter.label}</span>
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(filter.id)}
                      onChange={() => toggleFilter(filter.id)}
                      className="hidden"
                    />
                    <span
                      className={
                        'relative flex size-5 items-center justify-center rounded-full border border-white'
                      }
                    >
                      {selectedFilters.includes(filter.id) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M15 10L11 14L9 12M12 21C7.02944 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                            stroke="#FAFAFA"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                  </label>
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}
