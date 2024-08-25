import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: [
    'ar',
    'de',
    'en',
    'es',
    'fr',
    'he',
    'hi',
    'it',
    'ja',
    'ko',
    'pt',
    'sv',
    'uk',
    'zh',
  ],
  defaultLocale: 'en',
  localeDetection: true,
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
