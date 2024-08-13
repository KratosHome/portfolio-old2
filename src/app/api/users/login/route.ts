import { NextRequest, NextResponse } from 'next/server'
import { connectToDb } from '@/server/connectToDb'
import { signIn } from '@/server/auth/auth.server'

export async function POST(request: NextRequest) {
  if (request.method !== 'POST')
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })

  const formData = await request.formData()

  const email = formData.get('email')
  const password = formData.get('password')

  try {
    await connectToDb()

    /*
        await signIn("credentials", {
            email: email?.toLowerCase(),
            password
        });
    */

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Something went wrong!' },
      { status: 500 },
    )
  }
}
