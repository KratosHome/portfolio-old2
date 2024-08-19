import { NextRequest, NextResponse } from 'next/server'
import { connectToDb } from '@/server/connectToDb'
import { Project } from '@/server/project/project-scheme.server'

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    await connectToDb()
    console.log('projects NextResponse work')
    const projects = await Project.find({
      team: { $in: [userId] },
    })

    return NextResponse.json(
      {
        success: true,
        projects,
      },
      { status: 200 },
    )
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 },
    )
  }
}
