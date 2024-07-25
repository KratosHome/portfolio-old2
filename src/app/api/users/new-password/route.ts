import { NextRequest, NextResponse } from 'next/server'
import { connectToDb } from '@/server/connectToDb'
import { User } from '@/server/users/userSchema'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  if (request.method !== 'POST')
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  const data = await request.json()
  const { token, password, repeatPassword } = data
  if (password !== repeatPassword)
    return NextResponse.json(
      { error: 'Passwords do not match' },
      { status: 400 },
    )

  try {
    await connectToDb()
    const user = await User.findOne({ resetPasswordToken: token })
    if (!user) throw new Error('Invalid or expired reset token')
    if (user.resetPasswordToken === null)
      throw new Error('Invalid or expired reset token')

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    user.resetPasswordToken = null
    await user.save()

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Failed to update password' },
      { status: 500 },
    )
  }
}
