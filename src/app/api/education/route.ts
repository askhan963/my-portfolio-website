import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Validation schemas
const createEducationSchema = z.object({
  institution: z.string().min(1, 'Institution name is required'),
  degree: z.string().min(1, 'Degree is required'),
  period: z.string().min(1, 'Period is required'),
  cgpa: z.string().optional(),
  logo: z.string().min(1, 'Logo is required'),
  link: z.string().url('Valid URL is required').optional().or(z.literal('')),
  coreCourses: z.array(z.string().min(1, 'Course name cannot be empty')).min(1, 'At least one core course is required'),
  isActive: z.boolean().default(true),
  displayOrder: z.number().int().min(0).default(0),
})

const updateEducationSchema = createEducationSchema.partial()

// GET /api/education - Get all education entries
export async function GET() {
  try {
    const education = await prisma.education.findMany({
      where: { isActive: true },
      orderBy: {
        displayOrder: 'asc',
      },
    })

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

// POST /api/education - Create new education entry
export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const validatedData = createEducationSchema.parse(body)

    const education = await prisma.education.create({
      data: validatedData,
    })

    return NextResponse.json({
      success: true,
      data: education,
    })
  } catch (error) {
    console.error('Error creating education:', error)
    
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
        error: 'Failed to create education',
      },
      { status: 500 }
    )
  }
}
