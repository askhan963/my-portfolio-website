import { useState, useEffect } from 'react'
import { publicProfileApi } from '@/lib/api'
import { TOAST_MESSAGES } from '@/lib/constants'
import { toast } from 'react-hot-toast'

export interface PublicProfile {
  id: string
  name: string
  image: string
  headlines: string[]
  tagline: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface PublicProfileFormData {
  name: string
  image: string
  headlines: string[]
  tagline: string
  isActive: boolean
}

export const usePublicProfile = () => {
  const [profile, setProfile] = useState<PublicProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch active public profile
  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await publicProfileApi.get()
      
      if (response.success) {
        setProfile(response.data)
      } else {
        setError(response.error || 'Failed to fetch profile')
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to fetch profile'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Create new public profile
  const createProfile = async (data: PublicProfileFormData): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await publicProfileApi.create(data)
      
      if (response.success) {
        setProfile(response.data)
        toast.success(TOAST_MESSAGES.PUBLIC_PROFILE.CREATE_SUCCESS)
        return true
      } else {
        const errorMessage = response.error || 'Failed to create profile'
        setError(errorMessage)
        toast.error(errorMessage)
        return false
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to create profile'
      setError(errorMessage)
      toast.error(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Update public profile
  const updateProfile = async (id: string, data: Partial<PublicProfileFormData>): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await publicProfileApi.update(id, data)
      
      if (response.success) {
        setProfile(response.data)
        toast.success(TOAST_MESSAGES.PUBLIC_PROFILE.UPDATE_SUCCESS)
        return true
      } else {
        const errorMessage = response.error || 'Failed to update profile'
        setError(errorMessage)
        toast.error(errorMessage)
        return false
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to update profile'
      setError(errorMessage)
      toast.error(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Delete public profile
  const deleteProfile = async (id: string): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await publicProfileApi.delete(id)
      
      if (response.success) {
        if (profile?.id === id) {
          setProfile(null)
        }
        toast.success(TOAST_MESSAGES.PUBLIC_PROFILE.DELETE_SUCCESS)
        return true
      } else {
        const errorMessage = response.error || 'Failed to delete profile'
        setError(errorMessage)
        toast.error(errorMessage)
        return false
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to delete profile'
      setError(errorMessage)
      toast.error(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Load profile on mount
  useEffect(() => {
    fetchProfile()
  }, [])

  return {
    profile,
    loading,
    error,
    fetchProfile,
    createProfile,
    updateProfile,
    deleteProfile,
  }
}

// Hook for managing public profile form
export const usePublicProfileForm = (initialData?: Partial<PublicProfileFormData>) => {
  const [formData, setFormData] = useState<PublicProfileFormData>({
    name: '',
    image: '',
    headlines: [''],
    tagline: '',
    isActive: true,
    ...initialData,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleFieldChange = (field: keyof PublicProfileFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleHeadlineChange = (index: number, value: string) => {
    const newHeadlines = [...formData.headlines]
    newHeadlines[index] = value
    setFormData(prev => ({ ...prev, headlines: newHeadlines }))
  }

  const addHeadline = () => {
    setFormData(prev => ({ ...prev, headlines: [...prev.headlines, ''] }))
  }

  const removeHeadline = (index: number) => {
    if (formData.headlines.length > 1) {
      const newHeadlines = formData.headlines.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, headlines: newHeadlines }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required'
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = 'Please enter a valid URL'
    }

    if (!formData.tagline.trim()) {
      newErrors.tagline = 'Tagline is required'
    }

    const validHeadlines = formData.headlines.filter(h => h.trim())
    if (validHeadlines.length === 0) {
      newErrors.headlines = 'At least one headline is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setFormData({
      name: '',
      image: '',
      headlines: [''],
      tagline: '',
      isActive: true,
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
    handleHeadlineChange,
    addHeadline,
    removeHeadline,
    validateForm,
    resetForm,
  }
}
