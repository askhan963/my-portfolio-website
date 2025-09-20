import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Validation schemas
const createPublicProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  image: z.string().url('Valid image URL is required'),
  headlines: z.array(z.string().min(1, 'Headline cannot be empty')).min(1, 'At least one headline is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  isActive: z.boolean().default(true),
})

const updatePublicProfileSchema = createPublicProfileSchema.partial()

// GET /api/public-profile - Get active public profile
export async function GET() {
  try {
    const profile = await prisma.publicProfile.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      data: profile,
    })
  } catch (error) {
    console.error('Error fetching public profile:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch public profile',
      },
      { status: 500 }
    )
  }
}

// POST /api/public-profile - Create new public profile
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
    const validatedData = createPublicProfileSchema.parse(body)

    // If setting this profile as active, deactivate all others
    if (validatedData.isActive) {
      await prisma.publicProfile.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      })
    }

    const profile = await prisma.publicProfile.create({
      data: validatedData,
    })

    return NextResponse.json({
      success: true,
      data: profile,
    })
  } catch (error) {
    console.error('Error creating public profile:', error)
    
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
        error: 'Failed to create public profile',
      },
      { status: 500 }
    )
  }
}
