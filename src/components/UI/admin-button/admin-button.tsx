import { FC, ReactNode, MouseEventHandler } from 'react'
import { cn } from '@/utils/cn'

interface AdminButtonProps {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  name?: string
}

export const AdminButton: FC<AdminButtonProps> = ({
  children,
  onClick,
  disabled,
  type = 'button',
  className,
  name,
}) => {
  return (
    <button
      name={name}
      type={type}
      className={cn(
        'rounded-md bg-amber-900 px-5 py-2 duration-300 hover:scale-[1.05] disabled:cursor-not-allowed disabled:bg-gray-400',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
