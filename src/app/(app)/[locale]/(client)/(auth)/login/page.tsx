import { Metadata } from 'next'
import Login from '@/components/auth/login/login'

export const metadata: Metadata = {
  title: 'Логінізація | Платформа з Менторством та Блогом',
  description:
    'Увійдіть до нашої платформи з менторством та блогом, щоб отримати доступ до навчальних матеріалів, статей та підтримки від досвідчених менторів.',
  keywords:
    'логін, платформа, менторство, блог, навчання, підтримка, досвідчені ментори, статті',
  openGraph: {
    title: 'Логінізація | Платформа з Менторством та Блогом',
    description:
      'Увійдіть до нашої платформи з менторством та блогом, щоб отримати доступ до навчальних матеріалів, статей та підтримки від досвідчених менторів.',
    url: 'https://yourplatform.com/login',
    type: 'website',
    images: [
      {
        url: 'https://yourplatform.com/images/login-page-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Логінізація на платформі з менторством та блогом',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Логінізація | Платформа з Менторством та Блогом',
    description:
      'Увійдіть до нашої платформи з менторством та блогом, щоб отримати доступ до навчальних матеріалів, статей та підтримки від досвідчених менторів.',
    images: [
      {
        url: 'https://yourplatform.com/images/login-page-preview.jpg',
        alt: 'Логінізація на платформі з менторством та блогом',
      },
    ],
  },
}

export default async function LoginPage({ params: { locale } }: PageProps) {
  return (
    <>
      <Login />
    </>
  )
}
