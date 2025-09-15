import { useState } from 'react'
import Image from 'next/image'
import { XMarkIcon } from '@heroicons/react/24/outline'
import ImageUpload from '@/components/ImageUpload'
import { ProjectFormData } from '@/hooks/useProjects'
import { VALIDATION } from '@/lib/constants'

interface ProjectFormProps {
  formData: ProjectFormData
  onFieldChange: (field: keyof ProjectFormData, value: string | string[]) => void
  onImageAdd: (url: string) => void
  onImageRemove: (index: number) => void
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
  isSubmitting: boolean
  isEditing: boolean
}

export default function ProjectForm({
  formData,
  onFieldChange,
  onImageAdd,
  onImageRemove,
  onSubmit,
  onCancel,
  isSubmitting,
  isEditing,
}: ProjectFormProps) {
  const [imageUploadError, setImageUploadError] = useState<string | null>(null)

  const handleImageUpload = (url: string, publicId: string) => {
    setImageUploadError(null)
    onImageAdd(url)
  }

  const handleImageUploadError = (error: string) => {
    setImageUploadError(error)
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        {isEditing ? 'Edit Project' : 'Add New Project'}
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
              Tech Stack (comma-separated)
            </label>
            <input
              type="text"
              value={formData.techStack}
              onChange={(e) => onFieldChange('techStack', e.target.value)}
              placeholder="React, Node.js, MongoDB"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category *
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => onFieldChange('category', e.target.value)}
              placeholder="Web Development"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              GitHub Link
            </label>
            <input
              type="url"
              value={formData.githubLink}
              onChange={(e) => onFieldChange('githubLink', e.target.value)}
              placeholder="https://github.com/username/repo"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Live Link
            </label>
            <input
              type="url"
              value={formData.liveLink}
              onChange={(e) => onFieldChange('liveLink', e.target.value)}
              placeholder="https://your-project.com"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Awards (comma-separated)
          </label>
          <input
            type="text"
            value={formData.awards}
            onChange={(e) => onFieldChange('awards', e.target.value)}
            placeholder="Best Project Award, Innovation Award"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Images
          </label>
          <ImageUpload
            onUpload={handleImageUpload}
            onError={handleImageUploadError}
            folder="projects"
            className="mb-4"
            disabled={isSubmitting}
          />
          
          {imageUploadError && (
            <p className="text-red-500 text-sm mb-2">{imageUploadError}</p>
          )}
          
          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={image}
                    alt={`Project ${index + 1}`}
                    width={96}
                    height={96}
                    className="w-full h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => onImageRemove(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    disabled={isSubmitting}
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isSubmitting ? 'Saving...' : (isEditing ? 'Update Project' : 'Create Project')}
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
