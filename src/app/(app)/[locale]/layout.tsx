import '../globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from '@/components/theme-provider/theme-provider'
import ScrollToTop from '@/components/scroll-to-top/scroll-to-top'
import StarsCanvas from '@/components/star-background/star-background'
import { GoogleTagManager } from '@/components/google-tag-manager/google-tag-manager'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ReactNode } from 'react'
import Head from 'next/head'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { auth } from '@/server/auth/auth.server'
import { SessionProvider } from 'next-auth/react'

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()
  const session = await auth()

  console.log('messages vsdfvfd@gmail.com', session)
  return (
    <>
      <Head>
        <GoogleTagManager />
        <SpeedInsights />
      </Head>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NextIntlClientProvider messages={messages}>
          <ScrollToTop />
          <StarsCanvas />
          <SessionProvider>
            <Header />
            <main className="min-h-[100svh]">{children}</main>
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
    { params: { locale: 'en' } },
    { params: { locale: 'uk' } },
    { params: { locale: 'fr' } },
  ]
}
