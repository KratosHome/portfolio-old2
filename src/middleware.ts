import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/server/auth/auth.server'

const adminPages = ['/admin', '/settings']
const userPages = ['/admin/user', 'admin/students', 'admin/project']
const loginPage = '/login'

export default async function middleware(req: NextRequest) {
  const session = await auth()

  const { pathname } = req.nextUrl
  const locale = pathname.split('/')[1]

  if (session) {
    if (`/${locale}${loginPage}` === pathname) {
      return NextResponse.redirect(new URL(`/${locale}/admin/user`, req.url))
    }
  } else {
    const isUserPage = userPages.some((page) =>
      pathname.startsWith(`/${locale}${page}`),
    )
    if (isUserPage) {
      return NextResponse.redirect(new URL(`/${locale}`, req.url))
    }
  }

  return createMiddleware({
    locales: ['uk', 'en', 'fr'],
    defaultLocale: 'en',
    localeDetection: true,
  })(req)
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
