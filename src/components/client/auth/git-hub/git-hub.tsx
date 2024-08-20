'use client'
import { loginGitHubAction } from '@/server/auth/loginGitHub.server'
import gitHub from '@/assets/icons/git-hub.svg'
import Image from 'next/image'
import React from 'react'
import { useTranslations } from 'next-intl'

export const GitHub = () => {
  const t = useTranslations('login')
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await loginGitHubAction()
  }

  return (
    <form onSubmit={handleLogin}>
      <button className="flex flex-col items-center justify-center">
        <Image src={gitHub} alt={t('github-sing-icon')} />
        <span>GitHub</span>
      </button>
    </form>
  )
}
