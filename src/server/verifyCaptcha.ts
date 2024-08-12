'use server'

export async function verifyCaptcha(token: string | null) {
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    {
      method: 'POST',
    },
  )
  const data = await response.json()
  if (data.success) {
    return console.log('Captcha Success')
  } else {
    return console.log('Captcha Failed')
  }
}
