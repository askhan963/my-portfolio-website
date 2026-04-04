import { useState, useEffect, useCallback } from 'react'
import { honorsApi } from '@/lib/api'
import { TOAST_MESSAGES } from '@/lib/constants'
import toast from 'react-hot-toast'

export interface Honor {
  id: string
  title: string
  description: string
  image: string
  issuedBy: string
  issuedAt: string
  createdAt: string
  updatedAt: string
}

export interface HonorFormData {
  title: string
  description: string
  image: string
  issuedBy: string
  issuedAt: string
}

export const useHonors = ({ enabled = true } = {}) => {
  const [honors, setHonors] = useState<Honor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchHonors = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await honorsApi.getAll()
      setHonors(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch honors'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  const createHonor = useCallback(async (data: HonorFormData) => {
    try {
      setLoading(true)
      const response = await honorsApi.create(data)
      setHonors(prev => [response, ...prev])
      toast.success(TOAST_MESSAGES.HONORS.CREATE_SUCCESS)
      return response
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || TOAST_MESSAGES.HONORS.CREATE_ERROR
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updateHonor = useCallback(async (id: string, data: HonorFormData) => {
    try {
      setLoading(true)
      const response = await honorsApi.update(id, data)
      setHonors(prev => prev.map(h => h.id === id ? response : h))
      toast.success(TOAST_MESSAGES.HONORS.UPDATE_SUCCESS)
      return response
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || TOAST_MESSAGES.HONORS.UPDATE_ERROR
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteHonor = useCallback(async (id: string) => {
    try {
      setLoading(true)
      await honorsApi.delete(id)
      setHonors(prev => prev.filter(h => h.id !== id))
      toast.success(TOAST_MESSAGES.HONORS.DELETE_SUCCESS)
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || TOAST_MESSAGES.HONORS.DELETE_ERROR
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (enabled) {
      fetchHonors()
    }
  }, [fetchHonors, enabled])

  return {
    honors,
    loading,
    error,
    fetchHonors,
    createHonor,
    updateHonor,
    deleteHonor,
  }
}

export const useHonorForm = (initialData?: HonorFormData) => {
  const [formData, setFormData] = useState<HonorFormData>({
    title: '',
    description: '',
    image: '',
    issuedBy: '',
    issuedAt: '',
    ...initialData,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = useCallback((field: keyof HonorFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  const setImage = useCallback((url: string) => {
    setFormData(prev => ({
      ...prev,
      image: url,
    }))
  }, [])

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      description: '',
      image: '',
      issuedBy: '',
      issuedAt: '',
    })
    setIsSubmitting(false)
  }, [])

  const setFormDataFromHonor = useCallback((honor: Honor) => {
    setFormData({
      title: honor.title,
      description: honor.description,
      image: honor.image,
      issuedBy: honor.issuedBy,
      issuedAt: honor.issuedAt,
    })
  }, [])

  return {
    formData,
    isSubmitting,
    setIsSubmitting,
    updateField,
    setImage,
    resetForm,
    setFormDataFromHonor,
  }
}
