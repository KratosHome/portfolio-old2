import '../globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/header/header'
import { ThemeProvider } from '@/components/theme-provider/theme-provider'
import ScrollToTop from '@/components/scroll-to-top/scroll-to-top'
import StarsCanvas from '@/components/star-background/star-background'
import { GoogleTagManager } from '@/components/google-tag-manager/google-tag-manager'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ReactNode } from 'react'

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()
  //  const t = await getTranslations('HomePage')

  return (
    <html lang={locale} suppressHydrationWarning>
      work
    </html>
  )
}
export function generateStaticParams() {
  return [{ params: { locale: 'en' } }, { params: { locale: 'uk' } }]
}
