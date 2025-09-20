"use client"

import { useState, useEffect } from 'react'
import { educationApi } from '@/lib/api'
import { TOAST_MESSAGES } from '@/lib/constants'
import { toast } from 'react-hot-toast'

export interface Education {
  id: string
  institution: string
  degree: string
  period: string
  cgpa?: string
  logo: string
  link?: string
  coreCourses: string[]
  isActive: boolean
  displayOrder: number
  createdAt: string
  updatedAt: string
}

export interface EducationFormData {
  institution: string
  degree: string
  period: string
  cgpa?: string
  logo: string
  link?: string
  coreCourses: string[]
  isActive: boolean
  displayOrder: number
}

export const useEducation = () => {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch all education entries
  const fetchEducation = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await educationApi.getAll()
      
      if (response.success) {
        setEducation(response.data)
      } else {
        setError(response.error || 'Failed to fetch education')
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to fetch education'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Create new education entry
  const createEducation = async (data: EducationFormData): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await educationApi.create(data)
      
      if (response.success) {
        setEducation(prev => [...prev, response.data])
        toast.success(TOAST_MESSAGES.EDUCATION.CREATE_SUCCESS)
        return true
      } else {
        const errorMessage = response.error || 'Failed to create education entry'
        setError(errorMessage)
        toast.error(errorMessage)
        return false
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to create education entry'
      setError(errorMessage)
      toast.error(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Update education entry
  const updateEducation = async (id: string, data: Partial<EducationFormData>): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await educationApi.update(id, data)
      
      if (response.success) {
        setEducation(prev => prev.map(edu => edu.id === id ? response.data : edu))
        toast.success(TOAST_MESSAGES.EDUCATION.UPDATE_SUCCESS)
        return true
      } else {
        const errorMessage = response.error || 'Failed to update education entry'
        setError(errorMessage)
        toast.error(errorMessage)
        return false
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to update education entry'
      setError(errorMessage)
      toast.error(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Delete education entry
  const deleteEducation = async (id: string): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await educationApi.delete(id)
      
      if (response.success) {
        setEducation(prev => prev.filter(edu => edu.id !== id))
        toast.success(TOAST_MESSAGES.EDUCATION.DELETE_SUCCESS)
        return true
      } else {
        const errorMessage = response.error || 'Failed to delete education entry'
        setError(errorMessage)
        toast.error(errorMessage)
        return false
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to delete education entry'
      setError(errorMessage)
      toast.error(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Load education on mount
  useEffect(() => {
    fetchEducation()
  }, [])

  return {
    education,
    loading,
    error,
    fetchEducation,
    createEducation,
    updateEducation,
    deleteEducation,
  }
}

// Hook for managing education form
export const useEducationForm = (initialData?: Partial<EducationFormData>) => {
  const [formData, setFormData] = useState<EducationFormData>({
    institution: '',
    degree: '',
    period: '',
    cgpa: '',
    logo: '',
    link: '',
    coreCourses: [''],
    isActive: true,
    displayOrder: 0,
    ...initialData,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleFieldChange = (field: keyof EducationFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleCoreCourseChange = (index: number, value: string) => {
    const newCoreCourses = [...formData.coreCourses]
    newCoreCourses[index] = value
    setFormData(prev => ({ ...prev, coreCourses: newCoreCourses }))
  }

  const addCoreCourse = () => {
    setFormData(prev => ({ ...prev, coreCourses: [...prev.coreCourses, ''] }))
  }

  const removeCoreCourse = (index: number) => {
    if (formData.coreCourses.length > 1) {
      const newCoreCourses = formData.coreCourses.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, coreCourses: newCoreCourses }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.institution.trim()) {
      newErrors.institution = 'Institution name is required'
    }

    if (!formData.degree.trim()) {
      newErrors.degree = 'Degree is required'
    }

    if (!formData.period.trim()) {
      newErrors.period = 'Period is required'
    }

    if (!formData.logo.trim()) {
      newErrors.logo = 'Logo is required'
    } else if (!isValidUrl(formData.logo) && !formData.logo.startsWith('/')) {
      newErrors.logo = 'Please enter a valid URL or local path'
    }

    if (formData.link && formData.link.trim() && !isValidUrl(formData.link)) {
      newErrors.link = 'Please enter a valid URL'
    }

    const validCoreCourses = formData.coreCourses.filter(course => course.trim())
    if (validCoreCourses.length === 0) {
      newErrors.coreCourses = 'At least one core course is required'
    }

    if (formData.displayOrder < 0) {
      newErrors.displayOrder = 'Display order must be 0 or greater'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      period: '',
      cgpa: '',
      logo: '',
      link: '',
      coreCourses: [''],
      isActive: true,
      displayOrder: 0,
    })
    setErrors({})
  }

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  return {
    formData,
    setFormData,
    errors,
    handleFieldChange,
    handleCoreCourseChange,
    addCoreCourse,
    removeCoreCourse,
    validateForm,
    resetForm,
  }
}
