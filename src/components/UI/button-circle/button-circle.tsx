import './button-circle.scss'
import Image from 'next/image'
import ArrowRight from '@/assets/icons/ArrowRight.svg'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

interface ButtonCircleProps {
  title: string
}

export const ButtonCircle: FC<ButtonCircleProps> = ({ title }) => {
  const t = useTranslations('home-page.hero')
  return (
    <button className="custom-button group z-20 flex aspect-square min-h-[120px] min-w-[120px] flex-shrink-0 flex-col items-center justify-center rounded-full border-[1px] border-black border-stone-500/30 bg-[rgba(255,255,255,0.12)] p-4 text-[20px] font-bold uppercase backdrop-blur-[12.5px]">
      <span className="text-center duration-500 group-hover:scale-[1.1]">
        {title}
      </span>
      <Image
        src={ArrowRight}
        alt={t('arrow-right')}
        width={70}
        height={40}
        className="w-full duration-500 group-hover:scale-[1.1]"
      />
    </button>
  )
}
