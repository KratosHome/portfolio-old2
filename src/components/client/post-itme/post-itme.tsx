'use client'
import './post-item.scss'
import { FC, useRef } from 'react'
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
  const t = useTranslations('home-page.project')
  const locale = useLocale()
  const { contextSafe } = useGSAP()
  const containerRef = useRef<HTMLAnchorElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subTitleRef = useRef<HTMLSpanElement>(null)
  const imgRef = useRef<any>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const userRef = useRef<HTMLDivElement>(null)

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
    gsap.to(titleRef.current, { scale: 1.02, ease: 'power1.inOut' })
    gsap.to(subTitleRef.current, { scale: 1.07, ease: 'power1.inOut' })
    gsap.to(imgRef.current, { scale: 1.1, ease: 'power1.inOut' })
    gsap.to(buttonRef.current, { scale: 1, ease: 'power1.inOut' })
    gsap.to(userRef.current, { scale: 1.05, ease: 'power1.inOut' })
  })

  const handleMouseLeave = contextSafe(() => {
    gsap.to(containerRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: 'power2.inOut',
      duration: 0.45,
      overwrite: 'auto',
    })

    gsap.to(titleRef.current, { scale: 1, ease: 'power1.inOut' })
    gsap.to(subTitleRef.current, { scale: 1, ease: 'power1.inOut' })
    gsap.to(imgRef.current, { scale: 1, ease: 'power1.inOut' })
    gsap.to(buttonRef.current, { scale: 1, ease: 'power1.inOut' })
    gsap.to(userRef.current, { scale: 1, ease: 'power1.inOut' })
  })

  const cleanUrl = removeLocaleFromUrl(item.url)

  return (
    <Link
      ref={containerRef}
      href={`/${locale}/blog/${cleanUrl}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="post-item-card block max-w-[396px] rounded-md border border-black bg-gradient-to-br from-white/20 to-white/0 backdrop-blur-[12.5px]"
    >
      <Image
        src={item.img}
        alt={item.title}
        ref={imgRef}
        className="h-[160px] w-[396px] rounded-md"
        width={396}
        height={260}
      />
      <div className="mx-[16px] mb-[16px] mt-[18px]">
        <div ref={titleRef}>
          <span className="text-[20px] font-bold text-[#0B66F5]">
            {item.title}
          </span>
          <div className="text-[16px] font-bold">
            <span>Category: </span>
            {item.category.map((cat: string) => (
              <span key={cat}>{cat}</span>
            ))}
          </div>
        </div>
        <div ref={userRef} className="text-[12px]">
          <div>{item.subTitle}</div>
        </div>
        <div className="flex justify-between">
          <span ref={subTitleRef}>{item.authorUsername}</span>
          <div>{formatDate(item.createdAt, false)}</div>
        </div>
        <div className="flex items-end justify-end">
          <div className="[153deg,rgba(255,255,255,0.12)_2.19%,rgba(255,255,255,0)_99.21%] flex size-[50px] items-center justify-center rounded-full border border-stone-500/30 bg-gradient-to-r to-white/0">
            <Image src={arrowAslant} alt={t('arrow-link')} />
          </div>
        </div>
      </div>
    </Link>
  )
}
