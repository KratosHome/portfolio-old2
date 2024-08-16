'use server'
import { connectToDb } from '@/server/connectToDb'
import { User } from '@/server/users/user-schema'
import nodemailer from 'nodemailer'
import { v4 as uuidv4 } from 'uuid'
import { verifyEmailTemplate } from '@/components/emails/verify-email'

export const confirmEmailToken = async (
  id: string | undefined,
  token: string,
) => {
  'use server'
  try {
    await connectToDb()
    const user = await User.findById(id)
    if (!user) return { success: false, message: 'User not found' }

    if (user.isEmailVerifiedToken !== token)
      return { success: false, message: 'Invalid token' }

    user.isEmailVerified = true
    await user.save()

    return { success: true }
  } catch (err) {
    console.log('err confirmEmailServer', err)
    return { success: false }
  }
}

export const sendEmailTokenServer = async (data: any) => {
  try {
    const resetToken = uuidv4()
    await connectToDb()
    const user = await User.findOne({ _id: data.id })
    user.isEmailVerifiedToken = resetToken

    await user.save()
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: 'Password Reset Request',
      text: `To reset your password, please click on this link: ${process.env.NEXT_URL}/en/reset-password/${resetToken}`,
      html: verifyEmailTemplate(resetToken),
    })

    return { success: true }
  } catch (err) {
    console.log('err sendEmailTokenServer', err)
    return { success: false }
  }
}
