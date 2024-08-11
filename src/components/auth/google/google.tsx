'use client'
import { loginGitHubAction } from '@/server/auth/loginGitHub.server'
import google from '@/assets/icons/google.svg'
import Image from 'next/image'
import React from 'react'
import { useTranslations } from 'next-intl'

export const Google = () => {
  const t = useTranslations('login')

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await loginGitHubAction()
  }

  return (
    <form onSubmit={handleLogin}>
      <button className="flex flex-col items-center justify-center">
        <Image src={google} alt={t('google-sing-icon')} />
        <span>
          <span className="text-[#4283F0]">G</span>
          <span className="text-[#E44437]">o</span>
          <span className="text-[#F3B80A]">o</span>
          <span className="text-[#F3B80A]">g</span>
          <span className="text-[#34A555]">l</span>
          <span className="text-[#CA3035]">e</span>
        </span>
      </button>
    </form>
  )
}
