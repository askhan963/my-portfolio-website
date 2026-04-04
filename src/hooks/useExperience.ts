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

export const useExperience = ({ enabled = true } = {}) => {
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

  const createExperience = useCallback(async (data: ExperienceFormData) => {
    try {
      setLoading(true)
      const response = await experienceApi.create(data)
      setExperiences(prev => [response, ...prev])
      toast.success(TOAST_MESSAGES.EXPERIENCE.CREATE_SUCCESS)
      return response
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to create experience'
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updateExperience = useCallback(async (id: string, data: ExperienceFormData) => {
    try {
      setLoading(true)
      const response = await experienceApi.update(id, data)
      setExperiences(prev => prev.map(exp => exp.id === id ? response : exp))
      toast.success(TOAST_MESSAGES.EXPERIENCE.UPDATE_SUCCESS)
      return response
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to update experience'
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteExperience = useCallback(async (id: string) => {
    try {
      setLoading(true)
      await experienceApi.delete(id)
      setExperiences(prev => prev.filter(exp => exp.id !== id))
      toast.success(TOAST_MESSAGES.EXPERIENCE.DELETE_SUCCESS)
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to delete experience'
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (enabled) {
      fetchExperiences()
    }
  }, [fetchExperiences, enabled])

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
