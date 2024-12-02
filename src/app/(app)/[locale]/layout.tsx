import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import React, { ReactNode } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/components/providers/theme-provider/theme-provider'
import dynamic from 'next/dynamic'
import { Loader } from '@/components/UI/client/loader/loader'
import ScrollToTop from '@/components/features/scroll-to-top/scroll-to-top'
import StarsCanvas from '@/components/UI/star-background/star-background'

const Footer = dynamic(() => import('@/components/layout/footer/footer'), {
  loading: () => <Loader />,
})

export default async function LocaleLayout({
  children,
}: {
  children: ReactNode
}) {
  const messages = await getMessages()

  return (
    <>
      <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
        <NextIntlClientProvider messages={messages}>
          <ScrollToTop />
          <StarsCanvas />
          <SessionProvider>
            <main className="min-h-[90svh]">{children}</main>
            <Footer />
          </SessionProvider>
          <ToastContainer />
        </NextIntlClientProvider>
      </ThemeProvider>
    </>
  )
}

export function generateStaticParams() {
  return [
    { params: { locale: 'ar' } },
    { params: { locale: 'de' } },
    { params: { locale: 'en' } },
    { params: { locale: 'es' } },
    { params: { locale: 'fr' } },
    { params: { locale: 'he' } },
    { params: { locale: 'hi' } },
    { params: { locale: 'it' } },
    { params: { locale: 'ja' } },
    { params: { locale: 'ko' } },
    { params: { locale: 'pt' } },
    { params: { locale: 'sv' } },
    { params: { locale: 'uk' } },
    { params: { locale: 'zh' } },
  ]
}
