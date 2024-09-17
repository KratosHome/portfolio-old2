import './button-circle.scss'
import Image from 'next/image'
import ArrowRight from '@/assets/icons/ArrowRight.svg'
import ArrowRightLight from '@/assets/icons/ArrowRightLight.svg'
import { useTranslations } from 'next-intl'
import { FC, useEffect, useState } from 'react'
import { cn } from '@/utils/cn'
import { useTheme } from 'next-themes'
import gitHub from '@/assets/icons/github.svg'
import linkedin from '@/assets/icons/linkedin.svg'
import telegram from '@/assets/icons/telegram.svg'
import gitHubLight from '@/assets/icons/githubLight.svg'
import linkedinLight from '@/assets/icons/linkedinLight.svg'
import telegramLight from '@/assets/icons/telegramLight.svg'

interface ButtonCircleProps {
  title: string
  className?: string
  onClick?: () => void
}

export const ButtonCircle: FC<ButtonCircleProps> = ({
  title,
  className,
  onClick,
}) => {
  const t = useTranslations('home-page.hero')
  const { theme } = useTheme()

  const [arrowRightSrc, setArrowRightSrc] = useState(ArrowRight)

  useEffect(() => {
    setArrowRightSrc(theme === 'dark' ? ArrowRight : ArrowRightLight)
  }, [theme])

  return (
    <button
      onClick={onClick}
      className={cn(
        'custom-button group z-30 flex aspect-square min-h-[120px] min-w-[120px] flex-shrink-0 flex-col items-center justify-center rounded-full border-[1px] border-black border-stone-500/30 bg-[#0B66F5] p-4 text-[20px] font-bold uppercase backdrop-blur-[12.5px] dark:bg-[rgba(255,255,255,0.12)]',
        className,
      )}
    >
      <span className="text-center duration-500 group-hover:scale-[1.1]">
        {title}
      </span>
      <Image
        src={arrowRightSrc}
        alt={t('arrow-right')}
        width={70}
        height={40}
        className="w-full duration-500 group-hover:scale-[1.1]"
      />
    </button>
  )
}
