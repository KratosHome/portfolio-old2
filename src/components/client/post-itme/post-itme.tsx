'use client'
import './post-item.scss'
import { FC, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { formatDate } from '@/utils/formatDate'
import { useLocale } from 'use-intl'
import arrowAslant from '@/assets/icons/arrow-aslant.svg'
import { useTranslations } from 'next-intl'
import { removeLocaleFromUrl } from '@/utils/removeLocaleFromUrl'

interface blogListType {
  item: any
}

export const PostItem: FC<blogListType> = ({ item }) => {
  const t = useTranslations('post-client')

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
            <div className="[153deg,rgba(255,255,255,0.12)_2.19%,rgba(255,255,255,0)_99.21%] flex size-[50px] items-center justify-center rounded-full border border-stone-500/30 bg-gradient-to-r to-white/0">
              <Image src={arrowAslant} alt={t('arrow-link')} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
