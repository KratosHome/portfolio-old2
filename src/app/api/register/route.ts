import { NextRequest, NextResponse } from 'next/server'
import { connectToDb } from '@/server/connectToDb'
import { User } from '@/server/users/user-schema'
// import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  if (request.method !== 'POST')
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  const data = await request.json()
  const { username, email, password, img, passwordRepeat } = data

  if (password !== passwordRepeat)
    return NextResponse.json(
      { error: 'Passwords do not match' },
      { status: 400 },
    )

  try {
    await connectToDb()
    const userExists = await User.findOne({ email: email.toLowerCase() })

    if (userExists)
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 },
      )

    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password: '', // hashedPassword,
      img,
    })

    await newUser.save()

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Something went wrong!' },
      { status: 500 },
    )
  }
}
