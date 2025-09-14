"use client"

import { useState } from 'react'
import { UserIcon, KeyIcon, PencilIcon } from '@heroicons/react/24/outline'
import { useProfile, ProfileFormData } from '@/hooks/useProfile'
import ProfileForm from '@/components/profile/ProfileForm'
import PasswordChangeForm from '@/components/profile/PasswordChangeForm'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { formatDate } from '@/lib/utils'

export default function ProfilePage() {
  const { profile, loading, error, updateProfile, changePassword } = useProfile()
  const [showProfileForm, setShowProfileForm] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleProfileUpdate = async (formData: ProfileFormData): Promise<boolean> => {
    setIsSubmitting(true)
    try {
      const success = await updateProfile(formData)
      if (success) {
        setShowProfileForm(false)
      }
      return success
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePasswordChange = async (passwordData: any): Promise<boolean> => {
    setIsSubmitting(true)
    try {
      const success = await changePassword(passwordData)
      if (success) {
        setShowPasswordForm(false)
      }
      return success
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setShowProfileForm(false)
    setShowPasswordForm(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600 dark:text-gray-400">Profile not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account information and security settings
          </p>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-start space-x-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            {profile.image ? (
              <img
                src={profile.image}
                alt={profile.name || 'Profile'}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-2 border-gray-200 dark:border-gray-700">
                <UserIcon className="h-10 w-10 text-gray-400" />
              </div>
            )}
          </div>

          {/* Profile Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {profile.name || 'No name set'}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {profile.email}
                </p>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center">
                    <span className="font-medium">Role:</span>
                    <span className="ml-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                      {profile.role}
                    </span>
                  </span>
                  <span>
                    Member since {formatDate(profile.createdAt)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowProfileForm(true)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200"
              >
                <PencilIcon className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <KeyIcon className="h-5 w-5 mr-2" />
              Security
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage your password and security settings
            </p>
          </div>
          <button
            onClick={() => setShowPasswordForm(true)}
            className="flex items-center space-x-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium transition-colors duration-200"
          >
            <KeyIcon className="h-4 w-4" />
            <span>Change Password</span>
          </button>
        </div>
      </div>

      {/* Profile Form Modal */}
      {showProfileForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Edit Profile
                </h3>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <ProfileForm
                initialData={{
                  name: profile.name || '',
                  email: profile.email,
                  image: profile.image || '',
                }}
                onSubmit={handleProfileUpdate}
                onCancel={handleCancel}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      )}

      {/* Password Change Form Modal */}
      {showPasswordForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Change Password
                </h3>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <PasswordChangeForm
                onSubmit={handlePasswordChange}
                onCancel={handleCancel}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
