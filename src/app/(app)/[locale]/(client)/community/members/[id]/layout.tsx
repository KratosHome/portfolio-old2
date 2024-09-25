import { ReactNode } from 'react'

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: LanguageProps }
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
