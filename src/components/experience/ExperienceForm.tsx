import { useState } from 'react'
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import ImageUpload from '@/components/ImageUpload'
import { ExperienceFormData } from '@/hooks/useExperience'

interface ExperienceFormProps {
  formData: ExperienceFormData
  onFieldChange: (field: keyof ExperienceFormData, value: string | string[]) => void
  onLogoSet: (url: string) => void
  onAddRole: () => void
  onRemoveRole: (index: number) => void
  onUpdateRole: (index: number, field: keyof ExperienceFormData['roles'][0], value: string) => void
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
  isSubmitting: boolean
  isEditing: boolean
}

export default function ExperienceForm({
  formData,
  onFieldChange,
  onLogoSet,
  onAddRole,
  onRemoveRole,
  onUpdateRole,
  onSubmit,
  onCancel,
  isSubmitting,
  isEditing,
}: ExperienceFormProps) {
  const [imageUploadError, setImageUploadError] = useState<string | null>(null)

  const handleImageUpload = (url: string, publicId: string) => {
    setImageUploadError(null)
    onLogoSet(url)
  }

  const handleImageUploadError = (error: string) => {
    setImageUploadError(error)
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        {isEditing ? 'Edit Experience' : 'Add New Experience'}
      </h2>
      
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Company Information */}
        <div className="space-y-4">
          <h3 className="text-md font-medium text-gray-900 dark:text-white">Company Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => onFieldChange('company', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Company Website
              </label>
              <input
                type="url"
                value={formData.companyLink}
                onChange={(e) => onFieldChange('companyLink', e.target.value)}
                placeholder="https://company.com"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Overall Period *
              </label>
              <input
                type="text"
                value={formData.period}
                onChange={(e) => onFieldChange('period', e.target.value)}
                placeholder="Jan 2020 - Dec 2022"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Company Logo
            </label>
            <ImageUpload
              onUpload={handleImageUpload}
              onError={handleImageUploadError}
              folder="experience"
              className="mb-4"
              disabled={isSubmitting}
            />
            
            {imageUploadError && (
              <p className="text-red-500 text-sm mb-2">{imageUploadError}</p>
            )}
            
            {formData.logo && (
              <div className="relative group max-w-xs">
                <img
                  src={formData.logo}
                  alt="Company logo preview"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => onLogoSet('')}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  disabled={isSubmitting}
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Roles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-medium text-gray-900 dark:text-white">Roles & Responsibilities</h3>
            <button
              type="button"
              onClick={onAddRole}
              disabled={isSubmitting}
              className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Add Role</span>
            </button>
          </div>

          {formData.roles.map((role, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Role {index + 1}
                </h4>
                {formData.roles.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemoveRole(index)}
                    disabled={isSubmitting}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={role.title}
                    onChange={(e) => onUpdateRole(index, 'title', e.target.value)}
                    placeholder="Software Engineer"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Period *
                  </label>
                  <input
                    type="text"
                    value={role.period}
                    onChange={(e) => onUpdateRole(index, 'period', e.target.value)}
                    placeholder="Jan 2020 - Dec 2021"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Responsibilities (one per line) *
                </label>
                <textarea
                  value={role.description}
                  onChange={(e) => onUpdateRole(index, 'description', e.target.value)}
                  rows={3}
                  placeholder="Developed and maintained web applications&#10;Collaborated with cross-functional teams&#10;Implemented new features and bug fixes"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={isSubmitting}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Enter each responsibility on a new line
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isSubmitting ? 'Saving...' : (isEditing ? 'Update Experience' : 'Create Experience')}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
