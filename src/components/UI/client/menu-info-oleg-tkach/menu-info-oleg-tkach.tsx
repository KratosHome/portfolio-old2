'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from 'use-intl'
import { useTranslations } from 'next-intl'

const MenuInfoOlegTkach = () => {
  const locale = useLocale() as LanguageProps

  const t = useTranslations('header')

  return (
    <div>
      <Link
        href={`/${locale}`}
        className="flex items-center gap-[6px] lg:text-[28px]"
      >
        <Image src={'/logo.svg'} alt={'logo'} width="40" height="40" />
        <span className="block text-[20px] uppercase lg:text-[28px]">
          {t('name')}
        </span>
      </Link>
    </div>
  )
}

export default MenuInfoOlegTkach
