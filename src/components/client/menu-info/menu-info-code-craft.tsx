import Link from 'next/link'
import { useLocale } from 'use-intl'
import Image from 'next/image'

const MenuInfoCodeCraft = () => {
  const locale = useLocale() as ILocale
  return (
    <Link
      href={`/${locale}`}
      className="relative flex gap-2 font-bold uppercase"
    >
      <Image src={'/logo.svg'} alt={'logo'} width="40" height="40" />
      <span> code craft</span>
      <span className="absolute -bottom-2 right-0 text-[10px]">master</span>
    </Link>
  )
}

export default MenuInfoCodeCraft
