import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Validation schema
const updateCVSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  downloadLink: z.string().url('Valid download link is required').optional(),
  fileName: z.string().optional(),
  fileSize: z.number().optional(),
  fileType: z.string().optional(),
  isActive: z.boolean().optional(),
})

// GET /api/cvs/[id] - Get CV by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const cv = await prisma.resume.findUnique({
      where: { id },
    })

    if (!cv) {
      return NextResponse.json(
        {
          success: false,
          error: 'CV not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: cv,
    })
  } catch (error) {
    console.error('Error fetching CV:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch CV',
      },
      { status: 500 }
    )
  }
}

// PUT /api/cvs/[id] - Update CV
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const validatedData = updateCVSchema.parse(body)

    // Check if CV exists
    const existingCV = await prisma.resume.findUnique({
      where: { id },
    })

    if (!existingCV) {
      return NextResponse.json(
        {
          success: false,
          error: 'CV not found',
        },
        { status: 404 }
      )
    }

    // If setting this CV as active, deactivate all others
    if (validatedData.isActive) {
      await prisma.resume.updateMany({
        where: { 
          isActive: true,
          id: { not: id }
        },
        data: { isActive: false },
      })
    }

    const cv = await prisma.resume.update({
      where: { id },
      data: validatedData,
    })

    return NextResponse.json({
      success: true,
      data: cv,
    })
  } catch (error) {
    console.error('Error updating CV:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update CV',
      },
      { status: 500 }
    )
  }
}

// DELETE /api/cvs/[id] - Delete CV
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      )
    }

    const { id } = await params

    // Check if CV exists
    const existingCV = await prisma.resume.findUnique({
      where: { id },
    })

    if (!existingCV) {
      return NextResponse.json(
        {
          success: false,
          error: 'CV not found',
        },
        { status: 404 }
      )
    }

    await prisma.resume.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'CV deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting CV:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete CV',
      },
      { status: 500 }
    )
  }
}
