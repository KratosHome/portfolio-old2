'use client'

import { useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [userPreferredTheme, setUserPreferredTheme] = useState<
    'light' | 'dark' | 'system'
  >('system')

  useEffect(() => {
    const getUserPreferredTheme = () => {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
      return 'light'
    }
    setUserPreferredTheme(getUserPreferredTheme())
  }, [])

  return (
    <NextThemesProvider {...props} defaultTheme={userPreferredTheme}>
      {children}
    </NextThemesProvider>
  )
}

/*
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props} defaultTheme="system">
      {children}
    </NextThemesProvider>
  )
}
 */
