import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Validation schema
const updateEducationSchema = z.object({
  institution: z.string().min(1, 'Institution name is required').optional(),
  degree: z.string().min(1, 'Degree is required').optional(),
  period: z.string().min(1, 'Period is required').optional(),
  cgpa: z.string().optional(),
  logo: z.string().min(1, 'Logo is required').optional(),
  link: z.string().url('Valid URL is required').optional().or(z.literal('')),
  coreCourses: z.array(z.string().min(1, 'Course name cannot be empty')).min(1, 'At least one core course is required').optional(),
  isActive: z.boolean().optional(),
  displayOrder: z.number().int().min(0).optional(),
})

// GET /api/education/[id] - Get specific education entry
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const education = await prisma.education.findUnique({
      where: { id },
    })

    if (!education) {
      return NextResponse.json(
        {
          success: false,
          error: 'Education entry not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: education,
    })
  } catch (error) {
    console.error('Error fetching education:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch education',
      },
      { status: 500 }
    )
  }
}

// PUT /api/education/[id] - Update education entry
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
    const validatedData = updateEducationSchema.parse(body)

    const education = await prisma.education.update({
      where: { id },
      data: validatedData,
    })

    return NextResponse.json({
      success: true,
      data: education,
    })
  } catch (error) {
    console.error('Error updating education:', error)
    
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
        error: 'Failed to update education',
      },
      { status: 500 }
    )
  }
}

// DELETE /api/education/[id] - Delete education entry
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

    const education = await prisma.education.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      data: education,
    })
  } catch (error) {
    console.error('Error deleting education:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete education',
      },
      { status: 500 }
    )
  }
}
