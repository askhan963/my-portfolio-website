import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { honorSchema } from '@/lib/validations'

// GET /api/honors - Get all honors
export async function GET() {
  try {
    const honors = await prisma.honor.findMany({
      orderBy: { issuedAt: 'desc' },
    })

    return NextResponse.json(honors)
  } catch (error) {
    console.error('Error fetching honors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch honors' },
      { status: 500 }
    )
  }
}

// POST /api/honors - Create new honor
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = honorSchema.parse(body)

    const honor = await prisma.honor.create({
      data: validatedData,
    })

    return NextResponse.json(honor, { status: 201 })
  } catch (error) {
    console.error('Error creating honor:', error)
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid honor data', details: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create honor' },
      { status: 500 }
    )
  }
}
