import ForgotPassword from '@/components/client/auth/forgot-password/forgot-password'

export default async function Page({ params: { locale } }: any) {
  return (
    <>
      <ForgotPassword />
    </>
  )
}
