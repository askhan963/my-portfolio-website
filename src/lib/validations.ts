import { z } from 'zod'

// User schemas
export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  image: z.string().optional(),
  role: z.enum(['ADMIN', 'VIEWER']).default('VIEWER'),
})

// Project form sends comma- or newline-separated strings; API/DB store string[]
const commaSeparatedStrings = (val: unknown) => {
  if (typeof val === 'string') {
    return val
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return val
}

const newlineSeparatedStrings = (val: unknown) => {
  if (typeof val === 'string') {
    return val
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
  }
  return val
}

const projectTechStackSchema = z.preprocess(
  commaSeparatedStrings,
  z.array(z.string()).min(1, 'At least one tech stack item is required')
)

const projectOptionalListSchema = z.preprocess(
  commaSeparatedStrings,
  z.array(z.string()).default([])
)

const projectMultilineListSchema = z.preprocess(
  newlineSeparatedStrings,
  z.array(z.string()).default([])
)

// Project schemas
export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  techStack: projectTechStackSchema,
  githubLink: z.string().url().optional().or(z.literal('')),
  liveLink: z.string().url().optional().or(z.literal('')),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  awards: projectOptionalListSchema,
  category: z.string().min(1, 'Category is required'),
  // New Case Study Fields
  content: z.string().optional(),
  problemStatement: z.string().optional(),
  solution: z.string().optional(),
  features: projectMultilineListSchema,
  challenges: projectMultilineListSchema,
  learnings: projectMultilineListSchema,
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
})

export const createProjectSchema = projectSchema
export const updateProjectSchema = projectSchema.partial()

// Honor schemas
export const honorSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().min(1, 'Image is required'),
  issuedBy: z.string().min(1, 'Issued by is required'),
  issuedAt: z.string().datetime().or(z.date()),
})

export const createHonorSchema = honorSchema
export const updateHonorSchema = honorSchema.partial()

// Experience schemas
// Form sends newline-separated string; API/DB store string[]
const experienceDescriptionSchema = z.preprocess((val) => {
  if (typeof val === 'string') {
    return val
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
  }
  return val
}, z.array(z.string().min(1)).min(1, 'At least one description is required'))

export const experienceRoleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  period: z.string().min(1, 'Period is required'),
  description: experienceDescriptionSchema,
})

export const experienceSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  companyLink: z.string().url().optional().or(z.literal('')),
  logo: z.string().min(1, 'Logo is required'),
  period: z.string().min(1, 'Period is required'),
  roles: z.array(experienceRoleSchema).min(1, 'At least one role is required'),
})

export const createExperienceSchema = experienceSchema
export const updateExperienceSchema = experienceSchema.partial()

// Type exports
export type User = z.infer<typeof userSchema>
export type Project = z.infer<typeof projectSchema>
export type Honor = z.infer<typeof honorSchema>
export type Experience = z.infer<typeof experienceSchema>
export type ExperienceRole = z.infer<typeof experienceRoleSchema>
