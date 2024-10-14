import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import ScrollToTop from '@/components/scroll-to-top/scroll-to-top'
import StarsCanvas from '@/components/star-background/star-background'
import { GoogleTagManager } from '@/components/google-tag-manager/google-tag-manager'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ReactNode } from 'react'
import Head from 'next/head'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/components/providers/theme-provider/theme-provider'
import { Footer } from '@/components/layout/footer/footer'

export default async function LocaleLayout({
  children,
}: {
  children: ReactNode
}) {
  const messages = await getMessages()

  return (
    <>
      <Head>
        <GoogleTagManager />
        <SpeedInsights />
      </Head>
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
