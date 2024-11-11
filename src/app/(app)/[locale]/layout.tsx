import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'


import './globals.scss'
import localFont from 'next/font/local'
import Hedaer from '@/components/header/hedaer'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/components/theme-provider/theme-provider'

const sansationBold = localFont({
  src: '../../fonts/Sansation_Bold.ttf',
  variable: '--font-sansation-bold',
  weight: '700',
})

const sansationBoldItalic = localFont({
  src: '../../fonts/Sansation_Bold_Italic.ttf',
  variable: '--font-sansation-bold-italic',
  weight: '700',
  style: 'italic',
})

const sansationItalic = localFont({
  src: '../../fonts/Sansation_Italic.ttf',
  variable: '--font-sansation-italic',
  weight: '400',
  style: 'italic',
})

const sansationLight = localFont({
  src: '../../fonts/Sansation_Light.ttf',
  variable: '--font-sansation-light',
  weight: '300',
})

const sansationLightItalic = localFont({
  src: '../../fonts/Sansation_Light_Italic.ttf',
  variable: '--font-sansation-light-italic',
  weight: '300',
  style: 'italic',
})

const sansationRegular = localFont({
  src: '../../fonts/Sansation_Regular.ttf',
  variable: '--font-sansation-regular',
  weight: '400',
})

export default async function RootLayout({
                                           children,
                                         }: {
  children: React.ReactNode;
}) {
  const locale = await getLocale()

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
    <body
      className={`${sansationBold.variable} ${sansationBoldItalic.variable} ${sansationItalic.variable} ${sansationLight.variable} ${sansationLightItalic.variable} ${sansationRegular.variable} antialiased`}>
    <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
      <SessionProvider>
        <NextIntlClientProvider messages={messages}>
          <Hedaer />
          {children}
        </NextIntlClientProvider>
      </SessionProvider>
    </ThemeProvider>
    </body>
    </html>
  )
}