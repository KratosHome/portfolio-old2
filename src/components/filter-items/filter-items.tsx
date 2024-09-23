'use client'
import React, { FC, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import filterIcon from '@/assets/icons/filter.svg'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

interface FilterItemsProps {
  title: string
  url: string
  filters: any
}

export const FilterItems: FC<FilterItemsProps> = ({ filters, title, url }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFiltersInQuery = (newFilters: string[]) => {
    const queryParams = new URLSearchParams(searchParams?.toString()) // Збереження поточних параметрів URL
    if (newFilters.length > 0) {
      queryParams.set(url, newFilters.join(',')) // Унікальний ключ для кожного фільтра
    } else {
      queryParams.delete(url)
    }
    router.push(`?${queryParams.toString()}`)
  }

  const toggleFilter = (filterId: string) => {
    const newSelectedFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter((f) => f !== filterId)
      : [...selectedFilters, filterId]
    setSelectedFilters(newSelectedFilters)
    updateFiltersInQuery(newSelectedFilters)
  }

  return (
    <div>
      <Menu>
        <MenuButton className="my-[24px] flex">
          <Image
            src={filterIcon}
            alt={'filter'}
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
        <MenuItems
          transition
          anchor="bottom start"
          className="rounded-lg border border-black bg-gradient-to-br from-[rgba(255,255,255,0.4)] to-[rgba(255,255,255,0)] backdrop-blur-[12.5px]"
        >
          <div className="grid grid-cols-3 gap-4 p-4">
            {filters.map((filter: any) => (
              <MenuItem key={filter.id}>
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-lg border-b-[1px] px-[12px] py-[8px] ${
                    selectedFilters.includes(filter.id)
                      ? 'border-blue-gradient bg-[#0B66F5] text-white'
                      : 'border-b-[var(--blue-gradient,#0B66F5)] bg-[linear-gradient(127deg,rgba(11,102,245,0.3)_49.23%,rgba(78,128,206,0.15)_83.27%,rgba(255,255,255,0)_102.62%)] duration-300 hover:bg-[#0B66F5]'
                  }`}
                >
                  <span> {filter.label}</span>
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(filter.id)}
                    onChange={() => toggleFilter(filter.id)}
                    className="mr-2"
                  />
                </label>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  )
}
