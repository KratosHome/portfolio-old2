import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['uk', 'en', 'fr'],
  defaultLocale: 'en',
  localeDetection: true,
})

export const config = {
  matcher: ['/', '/(uk|en|fr)/:path*'],
}
