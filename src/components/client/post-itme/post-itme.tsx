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

interface blogListType {
  item: any
}

export const PostItem: FC<blogListType> = ({ item }) => {
  const { theme } = useTheme()
  const [truncatedText, setTruncatedText] = useState(item.subTitle)

  const locale = useLocale()
  const { contextSafe } = useGSAP()
  const containerRef = useRef<HTMLAnchorElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subTitleRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<any>(null)

  const handleMouseMove = contextSafe(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      const { left, top, width, height } =
        e.currentTarget.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      gsap.to(containerRef.current, {
        rotationY: 15 * x,
        rotationX: -15 * y,
        ease: 'power2.out',
        duration: 0.6,
        transformPerspective: 800,
        overwrite: 'auto',
      })
    },
  )

  const handleMouseEnter = contextSafe(() => {
    gsap.to(imgRef.current, { scale: 1.08, ease: 'power1.inOut' })
    gsap.to(titleRef.current, { scale: 1.08, ease: 'power1.inOut' })
    gsap.to(subTitleRef.current, { scale: 1.05, ease: 'power1.inOut' })
  })

  const handleMouseLeave = contextSafe(() => {
    gsap.to(containerRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: 'power2.inOut',
      duration: 0.45,
      overwrite: 'auto',
    })

    gsap.to(imgRef.current, { scale: 1, ease: 'power1.inOut' })
    gsap.to(titleRef.current, { scale: 1, ease: 'power1.inOut' })
    gsap.to(subTitleRef.current, { scale: 1, ease: 'power1.inOut' })
  })

  const cleanUrl = removeLocaleFromUrl(item.url)

  useEffect(() => {
    const maxLength = 120
    if (item.subTitle.length > maxLength) {
      setTruncatedText(item.subTitle.substring(0, maxLength) + '...')
    } else {
      setTruncatedText(item.subTitle)
    }
  }, [item.subTitle])

  return (
    <Link
      ref={containerRef}
      href={`/${locale}/blog/${cleanUrl}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="post-item-card block h-max max-w-[396px] rounded-md border border-black bg-gradient-to-br from-white/20 to-white/0 backdrop-blur-[12.5px]"
    >
      <Image
        src={item.img}
        alt={item.title}
        ref={imgRef}
        className="h-[260px] w-[396px] rounded-md"
        width={396}
        height={260}
      />
      <div className="mx-[16px] mb-[16px] mt-[18px] flex h-full max-h-[350px] flex-col justify-between">
        <div>
          <div>
            <span
              className="block text-[20px] font-bold text-[#0B66F5]"
              ref={titleRef}
            >
              {item.title}
            </span>
            <div className="text-[16px] font-bold">
              <span>Category: </span>
              {item.categories &&
                item.categories.map((cat: string) => (
                  <span key={cat} className="mr-2">
                    {cat}
                  </span>
                ))}
            </div>
          </div>
          <div ref={subTitleRef} className="mt-[12px] text-[20px]">
            <div>{truncatedText}</div>
          </div>
        </div>
        <div className="mt-[24px]">
          <div className="flex justify-between text-[16px]">
            <span className="text-[#0B66F5]">{item.authorUsername}</span>
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
      </div>
    </Link>
  )
}
