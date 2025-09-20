"use client"

import { useState, useEffect } from 'react'
import { cvsApi } from '@/lib/api'
import { TOAST_MESSAGES } from '@/lib/constants'
import toast from 'react-hot-toast'

// Types
export interface CV {
  id: string
  title: string
  description: string
  downloadLink: string
  fileName?: string
  fileSize?: number
  fileType?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CVFormData {
  title: string
  description: string
  downloadLink: string
  fileName?: string
  fileSize?: number
  fileType?: string
  isActive: boolean
}

// Custom hook for CVs management
export function useCVs() {
  const [cvs, setCVs] = useState<CV[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCVs = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await cvsApi.getAll()
      setCVs(response.data || [])
    } catch (err: any) {
      console.error('Error fetching CVs:', err)
      setError(err.response?.data?.error || TOAST_MESSAGES.RESUMES.FETCH_ERROR)
      toast.error(err.response?.data?.error || TOAST_MESSAGES.RESUMES.FETCH_ERROR)
    } finally {
      setLoading(false)
    }
  }

  const createCV = async (data: CVFormData): Promise<boolean> => {
    try {
      const response = await cvsApi.create(data)
      setCVs(prev => [response.data, ...prev])
      toast.success(TOAST_MESSAGES.RESUMES.CREATE_SUCCESS)
      return true
    } catch (err: any) {
      console.error('Error creating CV:', err)
      toast.error(err.response?.data?.error || TOAST_MESSAGES.RESUMES.CREATE_ERROR)
      return false
    }
  }

  const updateCV = async (id: string, data: Partial<CVFormData>): Promise<boolean> => {
    try {
      const response = await cvsApi.update(id, data)
      setCVs(prev => prev.map(cv => cv.id === id ? response.data : cv))
      toast.success(TOAST_MESSAGES.RESUMES.UPDATE_SUCCESS)
      return true
    } catch (err: any) {
      console.error('Error updating CV:', err)
      toast.error(err.response?.data?.error || TOAST_MESSAGES.RESUMES.UPDATE_ERROR)
      return false
    }
  }

  const deleteCV = async (id: string): Promise<boolean> => {
    try {
      await cvsApi.delete(id)
      setCVs(prev => prev.filter(cv => cv.id !== id))
      toast.success(TOAST_MESSAGES.RESUMES.DELETE_SUCCESS)
      return true
    } catch (err: any) {
      console.error('Error deleting CV:', err)
      toast.error(err.response?.data?.error || TOAST_MESSAGES.RESUMES.DELETE_ERROR)
      return false
    }
  }

  useEffect(() => {
    fetchCVs()
  }, [])

  return {
    cvs,
    loading,
    error,
    fetchCVs,
    createCV,
    updateCV,
    deleteCV,
  }
}

// Custom hook for CV form management
export function useCVForm(initialData?: Partial<CVFormData>) {
  const [formData, setFormData] = useState<CVFormData>({
    title: '',
    description: '',
    downloadLink: '',
    fileName: '',
    fileSize: undefined,
    fileType: '',
    isActive: true,
    ...initialData,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFieldChange = (field: keyof CVFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.downloadLink.trim()) {
      newErrors.downloadLink = 'Download link is required'
    } else {
      try {
        new URL(formData.downloadLink)
      } catch {
        newErrors.downloadLink = 'Please enter a valid URL'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      downloadLink: '',
      fileName: '',
      fileSize: undefined,
      fileType: '',
      isActive: true,
      ...initialData,
    })
    setErrors({})
    setIsSubmitting(false)
  }

  return {
    formData,
    setFormData,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleFieldChange,
    validateForm,
    resetForm,
  }
}
