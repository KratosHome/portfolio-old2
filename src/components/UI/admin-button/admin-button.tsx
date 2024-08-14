import { FC } from 'react'

export const AdminButton: FC<any> = ({ children, onClick }) => {
  return (
    <button
      className="bg-amber-900 px-5 py-2 duration-300 hover:scale-[1.1]"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
