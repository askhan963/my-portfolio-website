import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Validation schema
const updateSkillSchema = z.object({
  name: z.string().min(1, 'Skill name is required').optional(),
  category: z.string().min(1, 'Category is required').optional(),
  iconType: z.enum(['react-icon', 'custom', 'text']).optional(),
  iconName: z.string().optional(),
  iconUrl: z.string().url('Valid URL is required').optional().or(z.literal('')),
  color: z.string().optional(),
  proficiency: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
  isActive: z.boolean().optional(),
  displayOrder: z.number().int().min(0).optional(),
})

// GET /api/skills/[id] - Get specific skill
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const skill = await prisma.skill.findUnique({
      where: { id },
    })

    if (!skill) {
      return NextResponse.json(
        {
          success: false,
          error: 'Skill not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: skill,
    })
  } catch (error) {
    console.error('Error fetching skill:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch skill',
      },
      { status: 500 }
    )
  }
}

// PUT /api/skills/[id] - Update skill
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
    const validatedData = updateSkillSchema.parse(body)

    const skill = await prisma.skill.update({
      where: { id },
      data: validatedData,
    })

    return NextResponse.json({
      success: true,
      data: skill,
    })
  } catch (error) {
    console.error('Error updating skill:', error)
    
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
        error: 'Failed to update skill',
      },
      { status: 500 }
    )
  }
}

// DELETE /api/skills/[id] - Delete skill
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

    const skill = await prisma.skill.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      data: skill,
    })
  } catch (error) {
    console.error('Error deleting skill:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete skill',
      },
      { status: 500 }
    )
  }
}
