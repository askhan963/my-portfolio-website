"use client"

import { useState } from 'react'
import { UserIcon, EnvelopeIcon, PhotoIcon } from '@heroicons/react/24/outline'
import ImageUpload from '@/components/ImageUpload'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { ProfileFormData } from '@/hooks/useProfile'

interface ProfileFormProps {
  initialData: ProfileFormData
  onSubmit: (data: ProfileFormData) => Promise<boolean>
  onCancel: () => void
  isSubmitting: boolean
}

export default function ProfileForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>(initialData)
  const [errors, setErrors] = useState<Partial<ProfileFormData>>({})

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<ProfileFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (formData.image && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(formData.image)) {
      newErrors.image = 'Please enter a valid image URL'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const success = await onSubmit(formData)
    if (success) {
      setErrors({})
    }
  }

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({ ...prev, image: url }))
    if (errors.image) {
      setErrors(prev => ({ ...prev, image: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <Input
          type="text"
          label="Full Name"
          icon={<UserIcon className="h-4 w-4" />}
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Enter your full name"
          disabled={isSubmitting}
          error={errors.name}
        />

        {/* Email Field */}
        <Input
          type="email"
          label="Email Address"
          icon={<EnvelopeIcon className="h-4 w-4" />}
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Enter your email address"
          disabled={isSubmitting}
          error={errors.email}
        />

        {/* Profile Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <PhotoIcon className="h-4 w-4 inline mr-2" />
            Profile Image
          </label>
          <div className="space-y-4">
            {/* Image Upload Component */}
            <ImageUpload
              onUpload={(url) => handleImageUpload(url)}
              folder="profile"
              className="w-full"
            />
            
            {/* Manual URL Input */}
            <Input
              type="url"
              value={formData.image}
              onChange={(e) => handleInputChange('image', e.target.value)}
              placeholder="Or enter image URL manually"
              disabled={isSubmitting}
              error={errors.image}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            loadingText="Updating..."
            disabled={isSubmitting}
          >
            Update Profile
          </Button>
        </div>
      </form>
  )
}
