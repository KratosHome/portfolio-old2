'use client'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()
  const changeLanguageHandler = (nextLocal: string) => {
    router.replace(`/`)
  }

  return (
    <>
      <>
        <div style={{ textAlign: 'center' }}>
          <h1>404</h1>
          <p>Oops! The page you are looking for does not exist.</p>
          <button onClick={() => changeLanguageHandler('/')}>
            Go Back Home
          </button>
        </div>
      </>
    </>
  )
}
