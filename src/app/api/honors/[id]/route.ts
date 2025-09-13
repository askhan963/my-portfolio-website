import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { honorSchema } from '@/lib/validations'

// GET /api/honors/[id] - Get single honor
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const honor = await prisma.honor.findUnique({
      where: { id },
    })

    if (!honor) {
      return NextResponse.json({ error: 'Honor not found' }, { status: 404 })
    }

    return NextResponse.json(honor)
  } catch (error) {
    console.error('Error fetching honor:', error)
    return NextResponse.json(
      { error: 'Failed to fetch honor' },
      { status: 500 }
    )
  }
}

// PUT /api/honors/[id] - Update honor
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const validatedData = honorSchema.parse(body)

    const honor = await prisma.honor.update({
      where: { id },
      data: validatedData,
    })

    return NextResponse.json(honor)
  } catch (error) {
    console.error('Error updating honor:', error)
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid honor data', details: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to update honor' },
      { status: 500 }
    )
  }
}

// DELETE /api/honors/[id] - Delete honor
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await prisma.honor.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting honor:', error)
    return NextResponse.json(
      { error: 'Failed to delete honor' },
      { status: 500 }
    )
  }
}
