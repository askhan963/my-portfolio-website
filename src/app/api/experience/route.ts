import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { experienceSchema } from '@/lib/validations'

// GET /api/experience - Get all experiences
export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      include: {
        roles: {
          orderBy: { createdAt: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(experiences)
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    )
  }
}

// POST /api/experience - Create new experience
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = experienceSchema.parse(body)

    // Create experience with roles
    const experience = await prisma.experience.create({
      data: {
        company: validatedData.company,
        companyLink: validatedData.companyLink,
        logo: validatedData.logo,
        period: validatedData.period,
        roles: {
          create: validatedData.roles.map(role => ({
            title: role.title,
            period: role.period,
            description: role.description,
          }))
        }
      },
      include: {
        roles: true
      }
    })

    return NextResponse.json(experience, { status: 201 })
  } catch (error) {
    console.error('Error creating experience:', error)
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid experience data', details: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 }
    )
  }
}
