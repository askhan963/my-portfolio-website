"use client"

import { useState } from 'react'
import Button from '@/components/ui/Button'
import PasswordInput from '@/components/ui/PasswordInput'
import { PasswordChangeData } from '@/hooks/useProfile'

interface PasswordChangeFormProps {
  onSubmit: (data: PasswordChangeData) => Promise<boolean>
  onCancel: () => void
  isSubmitting: boolean
}

export default function PasswordChangeForm({
  onSubmit,
  onCancel,
  isSubmitting,
}: PasswordChangeFormProps) {
  const [formData, setFormData] = useState<PasswordChangeData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Partial<PasswordChangeData>>({})

  const handleInputChange = (field: keyof PasswordChangeData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }


  const validateForm = (): boolean => {
    const newErrors: Partial<PasswordChangeData> = {}

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required'
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required'
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'New password must be at least 6 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (formData.currentPassword && formData.newPassword && formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password'
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
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setErrors({})
    }
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Password */}
        <PasswordInput
          id="currentPassword"
          label="Current Password"
          placeholder="Enter your current password"
          value={formData.currentPassword}
          onChange={(value) => handleInputChange('currentPassword', value)}
          error={errors.currentPassword}
          disabled={isSubmitting}
        />

        {/* New Password */}
        <PasswordInput
          id="newPassword"
          label="New Password"
          placeholder="Enter your new password"
          value={formData.newPassword}
          onChange={(value) => handleInputChange('newPassword', value)}
          error={errors.newPassword}
          disabled={isSubmitting}
        />

        {/* Confirm Password */}
        <PasswordInput
          id="confirmPassword"
          label="Confirm New Password"
          placeholder="Confirm your new password"
          value={formData.confirmPassword}
          onChange={(value) => handleInputChange('confirmPassword', value)}
          error={errors.confirmPassword}
          disabled={isSubmitting}
        />

        {/* Password Requirements */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
            Password Requirements:
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• At least 6 characters long</li>
            <li>• Must be different from current password</li>
            <li>• Both password fields must match</li>
          </ul>
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
            variant="danger"
            isLoading={isSubmitting}
            loadingText="Changing..."
            disabled={isSubmitting}
          >
            Change Password
          </Button>
        </div>
      </form>
  )
}
