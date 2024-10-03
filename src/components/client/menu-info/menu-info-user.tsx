import Link from 'next/link'
import { FC } from 'react'

interface MenuInfoUserProps {
  title: string | undefined | null
}

export const MenuInfoUser: FC<MenuInfoUserProps> = ({ title }) => {
  return <Link href={'/'}>{title}</Link>
}
