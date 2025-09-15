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

export const useHonors = () => {
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

  const createHonor = useCallback(async (honorData: HonorFormData) => {
    try {
      const newHonor = await honorsApi.create(honorData)
      setHonors(prev => [newHonor, ...prev])
      toast.success('Honor created successfully!')
      return newHonor
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create honor'
      toast.error(errorMessage)
      throw err
    }
  }, [])

  const updateHonor = useCallback(async (id: string, honorData: HonorFormData) => {
    try {
      const updatedHonor = await honorsApi.update(id, honorData)
      setHonors(prev => prev.map(honor => 
        honor.id === id ? updatedHonor : honor
      ))
      toast.success('Honor updated successfully!')
      return updatedHonor
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update honor'
      toast.error(errorMessage)
      throw err
    }
  }, [])

  const deleteHonor = useCallback(async (id: string) => {
    try {
      await honorsApi.delete(id)
      setHonors(prev => prev.filter(honor => honor.id !== id))
      toast.success('Honor deleted successfully!')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete honor'
      toast.error(errorMessage)
      throw err
    }
  }, [])

  useEffect(() => {
    fetchHonors()
  }, [fetchHonors])

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
