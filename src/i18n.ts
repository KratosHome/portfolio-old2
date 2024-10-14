import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

const locales = [
  'de',
  'en',
  'es',
  'fr',
  'hi',
  'it',
  'ja',
  'ko',
  'pt',
  'sv',
  'uk',
  'zh',
]

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`../localization/${locale}.json`)).default,
  }
})
