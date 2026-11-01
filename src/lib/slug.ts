import { prisma } from './prisma'

export function slugify(title: string): string {
  return title
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function generateUniqueProjectSlug(
  title: string,
  excludeId?: string
): Promise<string> {
  const base = slugify(title) || 'project'
  let slug = base
  let suffix = 2

  while (true) {
    const existing = await prisma.project.findFirst({ where: { slug } })
    if (!existing || existing.id === excludeId) {
      return slug
    }
    slug = `${base}-${suffix}`
    suffix += 1
  }
}
