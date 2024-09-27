import { ReactNode } from 'react'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from '@/components/theme-provider/theme-provider'
import { NextIntlClientProvider } from 'next-intl'
import ScrollToTop from '@/components/scroll-to-top/scroll-to-top'
import StarsCanvas from '@/components/star-background/star-background'
import { SessionProvider } from 'next-auth/react'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'
import { ToastContainer } from 'react-toastify'

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html>
      <body>
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <ScrollToTop />
            <StarsCanvas />
            <SessionProvider>
              <Header />
              <main className="min-h-[90svh]">{children}</main>
              <Footer />
            </SessionProvider>
            <ToastContainer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
