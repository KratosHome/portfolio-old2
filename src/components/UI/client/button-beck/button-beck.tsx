'use client'
import arrow from '@/assets/icons/arrow-left.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

export const ButtonBeck = () => {
  const router = useRouter()
  const t = useTranslations('auth')
  return (
    <>
      <button onClick={() => router.back()}>
        <Image src={arrow} width={50} height={50} alt={t('arrow-beck')} />
      </button>
    </>
  )
}
