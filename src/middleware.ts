import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: [
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
  ],
  defaultLocale: 'en',
  localeDetection: true,
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
