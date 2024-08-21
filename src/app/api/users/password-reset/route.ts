import { NextRequest, NextResponse } from 'next/server'
import { connectToDb } from '@/server/connectToDb'
import { User } from '@/server/users/user-schema.server'
import { v4 as uuidv4 } from 'uuid'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  if (request.method !== 'POST')
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  const data = await request.json()
  const { email } = data

  try {
    await connectToDb()
    const user = await User.findOne({ email })
    if (!user)
      return NextResponse.json(
        { error: 'There is no such user' },
        { status: 400 },
      )

    const resetToken = uuidv4()
    user.resetPasswordToken = resetToken
    await user.save()

    const emailTemplate = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Password Reset</title>
            </head>
            <body>
                <div style="max-width: 600px; margin: 20px auto; border: 1px solid #ddd; padding: 20px; font-family: Arial, sans-serif;">
                    <h2 style="color: #333;">Password Reset Request</h2>
                    <p>If you requested to reset your password, click the button below:</p>
                    <a href="${process.env.NEXT_URL}/en/change-password/${resetToken}" target="_blank" style="background-color: #007bff; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">Reset Password</a>
                    <p style="color: #666;">If you did not request a password reset, please ignore this email.</p>
                </div>
            </body>
            </html>
        `

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
      to: email,
      subject: 'Password Reset Request',
      text: `To reset your password, please click on this link: ${process.env.NEXT_URL}/en/reset-password/${resetToken}`,
      html: emailTemplate,
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error(err)
  }
}
