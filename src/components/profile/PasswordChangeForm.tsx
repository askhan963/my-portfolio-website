"use client"

import { useState } from 'react'
import { LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
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
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const handleInputChange = (field: keyof PasswordChangeData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }))
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

  const PasswordInput = ({ 
    field, 
    label, 
    placeholder 
  }: { 
    field: keyof PasswordChangeData
    label: string
    placeholder: string
  }) => (
    <div>
      <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        <LockClosedIcon className="h-4 w-4 inline mr-2" />
        {label}
      </label>
      <div className="relative">
        <input
          type={showPasswords[field as keyof typeof showPasswords] ? 'text' : 'password'}
          id={field}
          value={formData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
            errors[field] ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={placeholder}
          disabled={isSubmitting}
        />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            togglePasswordVisibility(field as keyof typeof showPasswords)
          }}
          onMouseDown={(e) => e.preventDefault()}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
          disabled={isSubmitting}
          tabIndex={-1}
        >
          {showPasswords[field as keyof typeof showPasswords] ? (
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      {errors[field] && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[field]}</p>
      )}
    </div>
  )

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Password */}
        <PasswordInput
          field="currentPassword"
          label="Current Password"
          placeholder="Enter your current password"
        />

        {/* New Password */}
        <PasswordInput
          field="newPassword"
          label="New Password"
          placeholder="Enter your new password"
        />

        {/* Confirm Password */}
        <PasswordInput
          field="confirmPassword"
          label="Confirm New Password"
          placeholder="Confirm your new password"
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
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            disabled={isSubmitting}
          >
            {isSubmitting && <LoadingSpinner size="sm" />}
            <span>{isSubmitting ? 'Changing...' : 'Change Password'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
