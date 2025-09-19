import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Validation schemas
const createCVSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  downloadLink: z.string().url('Valid download link is required'),
  fileName: z.string().optional(),
  fileSize: z.number().optional(),
  fileType: z.string().optional(),
  isActive: z.boolean().default(true),
})

const updateCVSchema = createCVSchema.partial()

// GET /api/cvs - Get all CVs
export async function GET() {
  try {
    const cvs = await prisma.resumes.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({
      success: true,
      data: cvs,
    })
  } catch (error) {
    console.error('Error fetching CVs:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch CVs',
      },
      { status: 500 }
    )
  }
}

// POST /api/cvs - Create new CV
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
    const validatedData = createCVSchema.parse(body)

    // If setting this CV as active, deactivate all others
    if (validatedData.isActive) {
      await prisma.resumes.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      })
    }

    const cv = await prisma.resumes.create({
      data: validatedData,
    })

    return NextResponse.json({
      success: true,
      data: cv,
    })
  } catch (error) {
    console.error('Error creating CV:', error)
    
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
        error: 'Failed to create CV',
      },
      { status: 500 }
    )
  }
}
