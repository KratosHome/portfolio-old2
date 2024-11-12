import './globals.scss'
import { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { GoogleTagManager } from '@/components/google-tag-manager/google-tag-manager'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getLocale } from 'next-intl/server'
import localFont from 'next/font/local'

export const dynamic = 'force-dynamic'

const sansationBold = localFont({
  src: '../fonts/Sansation_Bold.ttf',
  variable: '--font-sansation-bold',
  weight: '700',
})

const sansationBoldItalic = localFont({
  src: '../fonts/Sansation_Bold_Italic.ttf',
  variable: '--font-sansation-bold-italic',
  weight: '700',
  style: 'italic',
})

const sansationItalic = localFont({
  src: '../fonts/Sansation_Italic.ttf',
  variable: '--font-sansation-italic',
  weight: '400',
  style: 'italic',
})

const sansationLight = localFont({
  src: '../fonts/Sansation_Light.ttf',
  variable: '--font-sansation-light',
  weight: '300',
})

const sansationLightItalic = localFont({
  src: '../fonts/Sansation_Light_Italic.ttf',
  variable: '--font-sansation-light-italic',
  weight: '300',
  style: 'italic',
})

const sansationRegular = localFont({
  src: '../fonts/Sansation_Regular.ttf',
  variable: '--font-sansation-regular',
  weight: '400',
})

export default async function LocaleLayout({
  children,
}: {
  children: ReactNode
}) {
  const locale = await getLocale()

  return (
    <html lang={locale} suppressHydrationWarning>
      <SpeedInsights />
      <GoogleTagManager />
      <body
        className={`${sansationBold.variable} ${sansationBoldItalic.variable} ${sansationItalic.variable} ${sansationLight.variable} ${sansationLightItalic.variable} ${sansationRegular.variable} max-w-screen relative overflow-x-hidden bg-white font-sansation antialiased dark:bg-black`}
      >
        {children}
      </body>
      <Analytics />
    </html>
  )
}
