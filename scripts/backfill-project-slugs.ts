import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'
import { generateUniqueProjectSlug } from '../src/lib/slug'

config({ path: '.env.local' })

const prisma = new PrismaClient()

async function main() {
  console.log('🔗 Backfilling project slugs...')

  const allProjects = await prisma.project.findMany()
  const projects = allProjects.filter((project) => !project.slug)

  console.log(`Found ${projects.length} project(s) without a slug.`)

  for (const project of projects) {
    const slug = await generateUniqueProjectSlug(project.title, project.id)
    await prisma.project.update({
      where: { id: project.id },
      data: { slug },
    })
    console.log(`✅ ${project.title} -> ${slug}`)
  }

  console.log('🎉 Backfill complete.')
}

main()
  .catch((error) => {
    console.error('Backfill failed:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
