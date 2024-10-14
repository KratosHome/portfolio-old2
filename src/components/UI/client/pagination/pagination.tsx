'use client'
import { FC, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import arrow from '@/assets/icons/arrow-triangle.svg'
import arrowLight from '@/assets/icons/arrow-triangle-light.svg'
import Image from 'next/image'
import { cn } from '@/utils/cn'
import { useTheme } from 'next-themes'

interface PaginationControlProps {
  totalPages: number
}

export const Pagination: FC<PaginationControlProps> = ({ totalPages }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { contextSafe } = useGSAP()
  const page = parseInt(searchParams.get('page') ?? '1')
  const buttonRefs = useRef(null)
  const { theme } = useTheme()

  const [currentSrc, setCurrentSrc] = useState(arrow)
  useEffect(() => {
    setCurrentSrc(theme === 'dark' ? arrow : arrowLight)
  }, [theme])

  const goToPage = contextSafe((event: any, newPage: number) => {
    const button = event.currentTarget
    const queryParams = new URLSearchParams(searchParams?.toString())

    queryParams.set('page', newPage.toString())

    gsap.to(button, {
      scale: 2.5,
      duration: 0.2,
      ease: 'power1.out',
      onComplete: () => {
        gsap.to(button, { scale: 1, duration: 0.1 })
        router.push(`?${queryParams.toString()}`)
      },
    })
  })

  const renderPaginationButtons = () => {
    let buttons = []

    buttons.push(
      <button
        key={1}
        ref={buttonRefs}
        disabled={page === 1}
        className={cn(
          'mx-[18px] text-[18px]',
          page === 1 ? 'font-bold text-[#185BC3]' : '',
        )}
        onClick={(event) => goToPage(event, 1)}
      >
        {1}
      </button>,
    )

    let left = Math.max(2, page - 2)
    let right = Math.min(page + 2, totalPages - 1)

    if (totalPages > 5) {
      if (page > 4) {
        buttons.push(
          <span key="left-ellipsis" className="left-ellipsis">
            ...
          </span>,
        )
        if (totalPages - page > 3) {
          right = page + 2
        } else {
          left = totalPages - 4
        }
      }

      if (page < totalPages - 3) {
        if (page < 4) {
          right = 5
        }
      }
    }

    for (let i = left; i <= right; i++) {
      buttons.push(
        <button
          ref={buttonRefs}
          key={i}
          disabled={i === page}
          className={cn(
            'mx-[18px] text-[18px] font-bold duration-300 hover:scale-125',
            i === page ? 'text-[#185BC3]' : '',
          )}
          onClick={(event) => goToPage(event, i)}
        >
          {i}
          <div className="color-fill"></div>
        </button>,
      )
    }

    if (right < totalPages - 1) {
      buttons.push(
        <span
          key="right-ellipsis"
          className={'mr-[18px] text-[18px] font-bold'}
        >
          ...
        </span>,
      )
    }

    if (page > 1) {
      buttons.push(
        <button
          ref={buttonRefs}
          key={totalPages}
          disabled={page === totalPages}
          className={page === totalPages ? 'button-active-pagination' : ''}
          onClick={(e) => goToPage(e, totalPages)}
        >
          {totalPages}
          <div className="color-fill"></div>
        </button>,
      )
    }
    return buttons
  }

  return (
    <div className="flex w-full items-center justify-center">
      {totalPages > 1 && (
        <button
          className={cn(
            'rotate-180 transform rounded-full border transition-transform duration-300 ease-in-out hover:scale-110 hover:border-blue-500 hover:bg-blue-500 focus:outline-none dark:rotate-0',
            page === 1
              ? 'cursor-not-allowed border-[#BCBCBC] dark:opacity-50'
              : 'border-[#0B66F5] hover:shadow-lg dark:border-[#BCBCBC]',
          )}
          disabled={page === 1}
          onClick={(event) => goToPage(event, page - 1)}
        >
          <Image
            className="transform p-[20px] transition-transform duration-300 ease-in-out"
            src={currentSrc}
            alt={''}
            width={64}
            height={64}
          />
        </button>
      )}

      {renderPaginationButtons()}
      {totalPages > 1 && (
        <button
          className={`transform rounded-full border transition-transform duration-300 ease-in-out hover:scale-110 hover:border-blue-500 hover:bg-blue-500 focus:outline-none ${page === totalPages ? 'cursor-not-allowed opacity-50' : 'border-[#0B66F5] hover:shadow-lg dark:border-[#BCBCBC]'} `}
          disabled={page === totalPages}
          onClick={(event) => goToPage(event, page + 1)}
        >
          <Image
            className="transform p-[20px] transition-transform duration-300 ease-in-out dark:rotate-180"
            src={currentSrc}
            alt={''}
            width={64}
            height={64}
          />
        </button>
      )}
    </div>
  )
}
