import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { TOAST_MESSAGES } from '@/lib/constants'
import { profileApi } from '@/lib/api'

export interface UserProfile {
  id: string
  name: string | null
  email: string
  image: string | null
  role: string
  createdAt: string
  updatedAt: string
}

export interface ProfileFormData {
  name: string
  email: string
  image: string
}

export interface PasswordChangeData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export function useProfile() {
  const { data: session, update } = useSession()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch profile data
  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await profileApi.get()
      setProfile(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profile'
      setError(errorMessage)
      toast.error(TOAST_MESSAGES.PROFILE.FETCH_ERROR)
    } finally {
      setLoading(false)
    }
  }

  // Update profile
  const updateProfile = async (formData: ProfileFormData): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      const updatedProfile = await profileApi.update(formData)
      setProfile(updatedProfile)
      
      // Update session with new data
      await update({
        ...session,
        user: {
          ...session?.user,
          name: updatedProfile.name,
          email: updatedProfile.email,
          image: updatedProfile.image,
        }
      })
      
      toast.success(TOAST_MESSAGES.PROFILE.UPDATE_SUCCESS)
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile'
      setError(errorMessage)
      toast.error(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Change password
  const changePassword = async (passwordData: PasswordChangeData): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      await profileApi.changePassword(passwordData)
      toast.success(TOAST_MESSAGES.PROFILE.PASSWORD_CHANGE_SUCCESS)
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to change password'
      setError(errorMessage)
      toast.error(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Load profile on mount
  useEffect(() => {
    if (session?.user?.id) {
      fetchProfile()
    }
  }, [session?.user?.id])

  return {
    profile,
    loading,
    error,
    updateProfile,
    changePassword,
    refetch: fetchProfile,
  }
}
