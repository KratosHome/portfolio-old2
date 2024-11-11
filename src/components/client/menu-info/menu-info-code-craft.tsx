import Link from 'next/link'
import { useLocale } from 'use-intl'

const MenuInfoCodeCraft = () => {
  const locale = useLocale() as ILocale
  return <Link href={`/${locale}`}>code craft master</Link>
}

export default MenuInfoCodeCraft
