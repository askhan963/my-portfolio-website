import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Validation schemas
const createSkillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  category: z.string().min(1, 'Category is required'),
  iconType: z.enum(['react-icon', 'custom', 'text']),
  iconName: z.string().optional(),
  iconUrl: z.string().url('Valid URL is required').optional().or(z.literal('')),
  color: z.string().optional(),
  proficiency: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
  isActive: z.boolean().default(true),
  displayOrder: z.number().int().min(0).default(0),
})

const updateSkillSchema = createSkillSchema.partial()

// GET /api/skills - Get all skills
export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      where: { isActive: true },
      orderBy: [
        { category: 'asc' },
        { displayOrder: 'asc' },
        { name: 'asc' }
      ],
    })

    return NextResponse.json({
      success: true,
      data: skills,
    })
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch skills',
      },
      { status: 500 }
    )
  }
}

// POST /api/skills - Create new skill
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
    const validatedData = createSkillSchema.parse(body)

    const skill = await prisma.skill.create({
      data: validatedData,
    })

    return NextResponse.json({
      success: true,
      data: skill,
    })
  } catch (error) {
    console.error('Error creating skill:', error)
    
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
        error: 'Failed to create skill',
      },
      { status: 500 }
    )
  }
}
