import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { connectToDb } from '@/server/connectToDb'
import { User } from '@/server/users/user-schema.server'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { AdapterUser } from '@auth/core/adapters'
import Google from '@auth/core/providers/google'

const login = async (email: string, password: string) => {
  'use server'
  try {
    await connectToDb()
    const user = await User.findOne({ email: email }).select('-resume')

    if (!user) return { success: false, message: 'User not found' }

    const isPasswordCorrect = await bcrypt.compare(
      password as string,
      user.password,
    )

    if (!isPasswordCorrect) return { success: false, message: 'Wrong password' }
    return user
  } catch (err) {
    return {
      success: false,
      message: err,
      user: null,
    }
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  theme: {
    logo: '/logo.svg',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({}),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          return await login(
            credentials.email as string,
            credentials.password as string,
          )
        } catch (err) {
          return {
            success: false,
            message: err,
            user: null,
          }
        }
      },
    }),
  ],
  callbacks: {
    async signIn() {
      return true
    },
    async session({ session, token }) {
      session.user = token.user as AdapterUser
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
  },
})
