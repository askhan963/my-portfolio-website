import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import ImageUpload from '@/components/ImageUpload'
import { HonorFormData } from '@/hooks/useHonors'

interface HonorFormProps {
  formData: HonorFormData
  onFieldChange: (field: keyof HonorFormData, value: string) => void
  onImageSet: (url: string) => void
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
  isSubmitting: boolean
  isEditing: boolean
}

export default function HonorForm({
  formData,
  onFieldChange,
  onImageSet,
  onSubmit,
  onCancel,
  isSubmitting,
  isEditing,
}: HonorFormProps) {
  const [imageUploadError, setImageUploadError] = useState<string | null>(null)

  const handleImageUpload = (url: string, publicId: string) => {
    setImageUploadError(null)
    onImageSet(url)
  }

  const handleImageUploadError = (error: string) => {
    setImageUploadError(error)
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        {isEditing ? 'Edit Honor' : 'Add New Honor'}
      </h2>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => onFieldChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => onFieldChange('description', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Issued By *
            </label>
            <input
              type="text"
              value={formData.issuedBy}
              onChange={(e) => onFieldChange('issuedBy', e.target.value)}
              placeholder="Organization Name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Issued Date *
            </label>
            <input
              type="date"
              value={formData.issuedAt}
              onChange={(e) => onFieldChange('issuedAt', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Certificate Image
          </label>
          <ImageUpload
            onUpload={handleImageUpload}
            onError={handleImageUploadError}
            folder="honors"
            className="mb-4"
            disabled={isSubmitting}
          />
          
          {imageUploadError && (
            <p className="text-red-500 text-sm mb-2">{imageUploadError}</p>
          )}
          
          {formData.image && (
            <div className="relative group max-w-xs">
              <img
                src={formData.image}
                alt="Certificate preview"
                className="w-full h-32 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => onImageSet('')}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                disabled={isSubmitting}
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isSubmitting ? 'Saving...' : (isEditing ? 'Update Honor' : 'Create Honor')}
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
