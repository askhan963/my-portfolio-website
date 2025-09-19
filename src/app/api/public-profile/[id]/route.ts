import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Validation schema
const updatePublicProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  image: z.string().url('Valid image URL is required').optional(),
  headlines: z.array(z.string().min(1, 'Headline cannot be empty')).min(1, 'At least one headline is required').optional(),
  tagline: z.string().min(1, 'Tagline is required').optional(),
  isActive: z.boolean().optional(),
})

// GET /api/public-profile/[id] - Get specific public profile
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const profile = await prisma.publicProfile.findUnique({
      where: { id },
    })

    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          error: 'Public profile not found',
        },
        { status: 404 }
      )
    }

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

// PUT /api/public-profile/[id] - Update public profile
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
    const validatedData = updatePublicProfileSchema.parse(body)

    // If setting this profile as active, deactivate all others
    if (validatedData.isActive) {
      await prisma.publicProfile.updateMany({
        where: { 
          isActive: true,
          id: { not: id }
        },
        data: { isActive: false },
      })
    }

    const profile = await prisma.publicProfile.update({
      where: { id },
      data: validatedData,
    })

    return NextResponse.json({
      success: true,
      data: profile,
    })
  } catch (error) {
    console.error('Error updating public profile:', error)
    
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
        error: 'Failed to update public profile',
      },
      { status: 500 }
    )
  }
}

// DELETE /api/public-profile/[id] - Delete public profile
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

    const profile = await prisma.publicProfile.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      data: profile,
    })
  } catch (error) {
    console.error('Error deleting public profile:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete public profile',
      },
      { status: 500 }
    )
  }
}
