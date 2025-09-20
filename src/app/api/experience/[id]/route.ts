import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { experienceSchema } from '@/lib/validations'

// GET /api/experience/[id] - Get single experience
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const experience = await prisma.experience.findUnique({
      where: { id },
      include: {
        roles: {
          orderBy: { createdAt: 'asc' }
        }
      }
    })

    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
    }

    return NextResponse.json(experience)
  } catch (error) {
    console.error('Error fetching experience:', error)
    return NextResponse.json(
      { error: 'Failed to fetch experience' },
      { status: 500 }
    )
  }
}

// PUT /api/experience/[id] - Update experience
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
    const validatedData = experienceSchema.parse(body)

    // Update experience and roles in a transaction
    const experience = await prisma.$transaction(async (tx) => {
      // Delete existing roles
      await tx.experienceRole.deleteMany({
        where: { experienceId: id }
      })

      // Update experience and create new roles
      return await tx.experience.update({
        where: { id },
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
    })

    return NextResponse.json(experience)
  } catch (error) {
    console.error('Error updating experience:', error)
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid experience data', details: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to update experience' },
      { status: 500 }
    )
  }
}

// DELETE /api/experience/[id] - Delete experience
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
    
    // Delete experience and related roles in a transaction
    await prisma.$transaction(async (tx) => {
      // First delete all related roles
      await tx.experienceRole.deleteMany({
        where: { experienceId: id }
      })
      
      // Then delete the experience
      await tx.experience.delete({
        where: { id },
      })
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting experience:', error)
    return NextResponse.json(
      { error: 'Failed to delete experience' },
      { status: 500 }
    )
  }
}
