'use client'
import { loginGitHubAction } from '@/server/auth/loginGitHub.server'
import React from 'react'

export const GitHub = () => {
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await loginGitHubAction()
  }

  return (
    <form onSubmit={handleLogin}>
      <button>GitHub</button>
    </form>
  )
}

export default GitHub
