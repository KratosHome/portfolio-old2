import { FC, ReactNode, MouseEventHandler } from 'react'

interface AdminButtonProps {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

export const AdminButton: FC<AdminButtonProps> = ({
  children,
  onClick,
  disabled,
}) => {
  return (
    <button
      className="bg-amber-900 px-5 py-2 duration-300 hover:scale-[1.1] disabled:cursor-not-allowed disabled:bg-gray-400"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
