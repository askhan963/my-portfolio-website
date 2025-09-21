"use client"

import { useState, useEffect } from 'react'
import { skillsApi } from '@/lib/api'
import { TOAST_MESSAGES } from '@/lib/constants'
import { toast } from 'react-hot-toast'

export interface Skill {
  id: string
  name: string
  category: string
  iconType: 'react-icon' | 'custom' | 'text'
  iconName?: string
  iconUrl?: string
  color?: string
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  isActive: boolean
  displayOrder: number
  createdAt: string
  updatedAt: string
}

export interface SkillFormData {
  name: string
  category: string
  iconType: 'react-icon' | 'custom' | 'text'
  iconName?: string
  iconUrl?: string
  color?: string
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  isActive: boolean
  displayOrder: number
}

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch all skills
  const fetchSkills = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await skillsApi.getAll()
      
      if (response.success) {
        setSkills(response.data)
      } else {
        setError(response.error || 'Failed to fetch skills')
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to fetch skills'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Create new skill
  const createSkill = async (data: SkillFormData): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await skillsApi.create(data)
      
      if (response.success) {
        setSkills(prev => [...prev, response.data])
        toast.success(TOAST_MESSAGES.SKILLS.CREATE_SUCCESS)
        return true
      } else {
        const errorMessage = response.error || 'Failed to create skill'
        setError(errorMessage)
        toast.error(errorMessage)
        return false
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to create skill'
      setError(errorMessage)
      toast.error(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Update skill
  const updateSkill = async (id: string, data: Partial<SkillFormData>): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await skillsApi.update(id, data)
      
      if (response.success) {
        setSkills(prev => prev.map(skill => skill.id === id ? response.data : skill))
        toast.success(TOAST_MESSAGES.SKILLS.UPDATE_SUCCESS)
        return true
      } else {
        const errorMessage = response.error || 'Failed to update skill'
        setError(errorMessage)
        toast.error(errorMessage)
        return false
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to update skill'
      setError(errorMessage)
      toast.error(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Delete skill
  const deleteSkill = async (id: string): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await skillsApi.delete(id)
      
      if (response.success) {
        setSkills(prev => prev.filter(skill => skill.id !== id))
        toast.success(TOAST_MESSAGES.SKILLS.DELETE_SUCCESS)
        return true
      } else {
        const errorMessage = response.error || 'Failed to delete skill'
        setError(errorMessage)
        toast.error(errorMessage)
        return false
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to delete skill'
      setError(errorMessage)
      toast.error(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Load skills on mount
  useEffect(() => {
    fetchSkills()
  }, [])

  return {
    skills,
    loading,
    error,
    fetchSkills,
    createSkill,
    updateSkill,
    deleteSkill,
  }
}

// Hook for managing skill form
export const useSkillForm = (initialData?: Partial<SkillFormData>) => {
  const [formData, setFormData] = useState<SkillFormData>({
    name: '',
    category: 'Frontend',
    iconType: 'react-icon',
    iconName: '',
    iconUrl: '',
    color: '#3B82F6',
    proficiency: 'intermediate',
    isActive: true,
    displayOrder: 0,
    ...initialData,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleFieldChange = (field: keyof SkillFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Skill name is required'
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required'
    }

    if (formData.iconType === 'react-icon' && !formData.iconName?.trim()) {
      newErrors.iconName = 'Icon name is required for React Icons'
    }

    if (formData.iconType === 'custom' && !formData.iconUrl?.trim()) {
      newErrors.iconUrl = 'Icon URL is required for custom icons'
    }

    if (formData.iconType === 'text' && !formData.color?.trim()) {
      newErrors.color = 'Color is required for text-based skills'
    }

    if (formData.displayOrder < 0) {
      newErrors.displayOrder = 'Display order must be 0 or greater'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Frontend',
      iconType: 'react-icon',
      iconName: '',
      iconUrl: '',
      color: '#3B82F6',
      proficiency: 'intermediate',
      isActive: true,
      displayOrder: 0,
    })
    setErrors({})
  }

  return {
    formData,
    setFormData,
    errors,
    handleFieldChange,
    validateForm,
    resetForm,
  }
}

// Available React Icons for skills
export const REACT_ICONS = [
  // Frontend
  { name: 'FaReact', label: 'React' },
  { name: 'FaHtml5', label: 'HTML5' },
  { name: 'FaCss3', label: 'CSS3' },
  { name: 'FaJsSquare', label: 'JavaScript' },
  { name: 'SiTypescript', label: 'TypeScript' },
  { name: 'SiTailwindcss', label: 'Tailwind CSS' },
  { name: 'SiRedux', label: 'Redux' },
  { name: 'SiVite', label: 'Vite' },
  { name: 'SiNextdotjs', label: 'Next.js' },
  { name: 'SiVuedotjs', label: 'Vue.js' },
  { name: 'SiAngular', label: 'Angular' },
  { name: 'SiSvelte', label: 'Svelte' },
  
  // Backend
  { name: 'FaNodeJs', label: 'Node.js' },
  { name: 'SiExpress', label: 'Express.js' },
  { name: 'SiNestjs', label: 'NestJS' },
  { name: 'SiFastify', label: 'Fastify' },
  { name: 'SiDjango', label: 'Django' },
  { name: 'SiFlask', label: 'Flask' },
  { name: 'SiSpring', label: 'Spring' },
  { name: 'SiLaravel', label: 'Laravel' },
  { name: 'SiRubyonrails', label: 'Ruby on Rails' },
  
  // Databases
  { name: 'SiMongodb', label: 'MongoDB' },
  { name: 'SiMysql', label: 'MySQL' },
  { name: 'SiPostgresql', label: 'PostgreSQL' },
  { name: 'SiRedis', label: 'Redis' },
  { name: 'SiFirebase', label: 'Firebase' },
  { name: 'SiSupabase', label: 'Supabase' },
  
  // Tools
  { name: 'FaGitAlt', label: 'Git' },
  { name: 'FaGithub', label: 'GitHub' },
  { name: 'FaDocker', label: 'Docker' },
  { name: 'SiKubernetes', label: 'Kubernetes' },
  { name: 'SiPostman', label: 'Postman' },
  { name: 'SiInsomnia', label: 'Insomnia' },
  { name: 'SiFigma', label: 'Figma' },
  { name: 'SiAdobephotoshop', label: 'Photoshop' },
  { name: 'SiAdobexd', label: 'Adobe XD' },
  { name: 'SiVisualstudiocode', label: 'VS Code' },
  { name: 'SiIntellijidea', label: 'IntelliJ IDEA' },
  { name: 'SiWebstorm', label: 'WebStorm' },
  { name: 'SiSublimetext', label: 'Sublime Text' },
  
  // Languages
  { name: 'FaPython', label: 'Python' },
  { name: 'FaJava', label: 'Java' },
  { name: 'SiCplusplus', label: 'C++' },
  { name: 'SiCsharp', label: 'C#' },
  { name: 'SiGo', label: 'Go' },
  { name: 'SiRust', label: 'Rust' },
  { name: 'SiPhp', label: 'PHP' },
  { name: 'SiRuby', label: 'Ruby' },
  { name: 'SiSwift', label: 'Swift' },
  { name: 'SiKotlin', label: 'Kotlin' },
  { name: 'SiScala', label: 'Scala' },
  { name: 'SiR', label: 'R' },
]

// Available categories
export const SKILL_CATEGORIES = [
  'Frontend',
  'Backend', 
  'Languages',
  'Tools',
  'Database',
  'Mobile',
  'DevOps',
  'Design',
  'Other'
]

// Proficiency levels
export const PROFICIENCY_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' },
]
