import { FC } from 'react'
import { cn } from '@/utils/cn'

interface BigLunaProps {
  className?: string
}

export const BigLuna: FC<BigLunaProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'absolute left-1/2 top-1/2 -z-10 mx-auto -mt-[40px] size-[769px] flex-shrink-0 -translate-x-1/2 -translate-y-1/2 rotate-[-89.637deg] rounded-full bg-[linear-gradient(223deg,_rgba(223,_223,_223,_0.20)_12.99%,_rgba(0,_0,_0,_0.20)_28.97%),_linear-gradient(265deg,_#666_-44.12%,_#262626_-21.9%,_#1C1C1C_4.39%,_#000_40.18%)] lg:h-[769.29px] lg:w-[769.29px]',
        className,
      )}
    />
  )
}
