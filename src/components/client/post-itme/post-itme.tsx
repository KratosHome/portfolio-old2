'use client'
import './post-item.scss'
import { FC, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { formatDate } from '@/utils/formatDate'
import { useLocale } from 'use-intl'
import { removeLocaleFromUrl } from '@/utils/removeLocaleFromUrl'
import { useTheme } from 'next-themes'
import { CardBody, CardContainer, CardItem } from '@/components/UI/3d-card'

interface BlogListType {
  item: IPost
}

export const PostItem: FC<BlogListType> = ({ item }) => {
  const locale = useLocale()
  const { theme } = useTheme()

  const [truncatedText, setTruncatedText] = useState(item.subTitle)

  useEffect(() => {
    const maxLength = 120
    if (item.subTitle.length > maxLength) {
      setTruncatedText(item.subTitle.substring(0, maxLength) + '...')
    } else {
      setTruncatedText(item.subTitle)
    }
  }, [item.subTitle])

  const cleanUrl = removeLocaleFromUrl(item.url)

  return (
    <Link href={`/${locale}/blog/${cleanUrl}`}>
      <CardContainer className="inter-var">
        <CardBody className="post-item-card block h-max max-w-[396px] rounded-md border border-black bg-gradient-to-br from-white/20 to-white/0 p-1">
          <CardItem
            translateZ="40"
            className="text-[20px] font-bold text-[#0B66F5]"
          >
            {item.title}
          </CardItem>
          <CardItem translateZ="100" className="mt-4 w-full">
            <Image
              height="1000"
              width="1000"
              src={item.img}
              alt={item.title}
              className="h-[260px] w-[396px] rounded-md"
            />
          </CardItem>
          <CardItem as="p" translateZ="70" className="mt-[12px] text-[15px]">
            {truncatedText}
          </CardItem>
          <CardItem
            translateZ={20}
            target="__blank"
            className="ext-[16px] font-bold"
          >
            <span className="mr-1">Category: </span>
            {item.categories &&
              item.categories.map((cat: string) => (
                <span key={cat} className="mr-2">
                  {cat}
                </span>
              ))}
          </CardItem>
          <div className="mb-3 mt-0 flex items-center justify-between">
            <div className="flex justify-between text-[16px]">
              <span className="mr-2 text-[#0B66F5]">{item.authorUsername}</span>
              <div>{formatDate(item.createdAt, false)}</div>
            </div>

            <div className="mt-[18px] flex items-end justify-end">
              <div className="flex size-[50px] items-center justify-center rounded-full border border-stone-500/30 bg-[#0B66F5] bg-gradient-to-r to-white/0 dark:bg-transparent">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="Arrow 2"
                    d="M13.8645 0.63571C13.8645 0.359567 13.6406 0.135708 13.3645 0.135706L8.86448 0.135674C8.58834 0.135672 8.36448 0.359528 8.36448 0.63567C8.36448 0.911812 8.58833 1.13567 8.86447 1.13567L12.8645 1.1357L12.8644 5.1357C12.8644 5.41184 13.0883 5.6357 13.3644 5.63571C13.6406 5.63571 13.8644 5.41185 13.8644 5.13571L13.8645 0.63571ZM0.989293 13.7178L13.718 0.989262L13.0109 0.28215L0.282191 13.0107L0.989293 13.7178Z"
                    stroke={theme === 'dark' ? '#FAFAFA' : '#000'}
                  />
                </svg>
              </div>
            </div>
          </div>
        </CardBody>
      </CardContainer>
    </Link>
  )
}
