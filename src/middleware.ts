import { getToken } from 'next-auth/jwt'
import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

const adminPages = ['/admin', '/settings']
const userPages = ['/admin/user', 'admin/students', 'admin/project']
const loginPage = '/login'

export default async function middleware(req: NextRequest) {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    throw new Error('AUTH_SECRET is not defined')
  }
  const session = await getToken({ req, secret })
  console.log('session', session)

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
    console.log('isUserPage', isUserPage)
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
