import { useState } from 'react'
import Image from 'next/image'
import { XMarkIcon } from '@heroicons/react/24/outline'
import ImageUpload from '@/components/ImageUpload'
import { HonorFormData } from '@/hooks/useHonors'
import Button from '@/components/ui/Button'

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
              <Image
                src={formData.image}
                alt="Certificate preview"
                width={128}
                height={128}
                className="w-full h-32 object-cover rounded-md"
              />
              <Button
                type="button"
                onClick={() => onImageSet('')}
                variant="danger"
                size="sm"
                className="absolute -top-2 -right-2 rounded-full w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                disabled={isSubmitting}
              >
                <XMarkIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : (isEditing ? 'Update Honor' : 'Create Honor')}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            variant="secondary"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
