import { useState, useEffect, useCallback } from 'react'
import { experienceApi } from '@/lib/api'
import { TOAST_MESSAGES } from '@/lib/constants'
import toast from 'react-hot-toast'

export interface ExperienceRole {
  id: string
  title: string
  period: string
  description: string[]
  experienceId: string
  createdAt: string
  updatedAt: string
}

export interface Experience {
  id: string
  company: string
  companyLink?: string
  logo: string
  period: string
  roles: ExperienceRole[]
  createdAt: string
  updatedAt: string
}

export interface ExperienceFormData {
  company: string
  companyLink: string
  logo: string
  period: string
  roles: {
    title: string
    period: string
    description: string
  }[]
}

export const useExperience = () => {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchExperiences = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await experienceApi.getAll()
      setExperiences(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch experiences'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  const createExperience = useCallback(async (experienceData: ExperienceFormData) => {
    try {
      const processedData = {
        ...experienceData,
        roles: experienceData.roles.map(role => ({
          ...role,
          description: role.description.split('\n').filter(Boolean),
        })),
      }

      const newExperience = await experienceApi.create(processedData)
      setExperiences(prev => [newExperience, ...prev])
      toast.success('Experience created successfully!')
      return newExperience
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create experience'
      toast.error(errorMessage)
      throw err
    }
  }, [])

  const updateExperience = useCallback(async (id: string, experienceData: ExperienceFormData) => {
    try {
      const processedData = {
        ...experienceData,
        roles: experienceData.roles.map(role => ({
          ...role,
          description: role.description.split('\n').filter(Boolean),
        })),
      }

      const updatedExperience = await experienceApi.update(id, processedData)
      setExperiences(prev => prev.map(experience => 
        experience.id === id ? updatedExperience : experience
      ))
      toast.success('Experience updated successfully!')
      return updatedExperience
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update experience'
      toast.error(errorMessage)
      throw err
    }
  }, [])

  const deleteExperience = useCallback(async (id: string) => {
    try {
      await experienceApi.delete(id)
      setExperiences(prev => prev.filter(experience => experience.id !== id))
      toast.success('Experience deleted successfully!')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete experience'
      toast.error(errorMessage)
      throw err
    }
  }, [])

  useEffect(() => {
    fetchExperiences()
  }, [fetchExperiences])

  return {
    experiences,
    loading,
    error,
    fetchExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
  }
}

export const useExperienceForm = (initialData?: ExperienceFormData) => {
  const [formData, setFormData] = useState<ExperienceFormData>({
    company: '',
    companyLink: '',
    logo: '',
    period: '',
    roles: [{ title: '', period: '', description: '' }],
    ...initialData,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = useCallback((field: keyof ExperienceFormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  const setLogo = useCallback((url: string) => {
    setFormData(prev => ({
      ...prev,
      logo: url,
    }))
  }, [])

  const addRole = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      roles: [...prev.roles, { title: '', period: '', description: '' }],
    }))
  }, [])

  const removeRole = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.filter((_, i) => i !== index),
    }))
  }, [])

  const updateRole = useCallback((index: number, field: keyof ExperienceFormData['roles'][0], value: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.map((role, i) => 
        i === index ? { ...role, [field]: value } : role
      ),
    }))
  }, [])

  const resetForm = useCallback(() => {
    setFormData({
      company: '',
      companyLink: '',
      logo: '',
      period: '',
      roles: [{ title: '', period: '', description: '' }],
    })
    setIsSubmitting(false)
  }, [])

  const setFormDataFromExperience = useCallback((experience: Experience) => {
    setFormData({
      company: experience.company,
      companyLink: experience.companyLink || '',
      logo: experience.logo,
      period: experience.period,
      roles: experience.roles.map(role => ({
        title: role.title,
        period: role.period,
        description: role.description.join('\n'),
      })),
    })
  }, [])

  return {
    formData,
    isSubmitting,
    setIsSubmitting,
    updateField,
    setLogo,
    addRole,
    removeRole,
    updateRole,
    resetForm,
    setFormDataFromExperience,
  }
}
