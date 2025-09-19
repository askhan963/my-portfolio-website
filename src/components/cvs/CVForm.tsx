"use client"

import { useState } from 'react'
import { XMarkIcon, DocumentIcon } from '@heroicons/react/24/outline'
import { CVFormData } from '@/hooks/useCVs'
import { VALIDATION } from '@/lib/constants'

interface CVFormProps {
  formData: CVFormData
  onFieldChange: (field: keyof CVFormData, value: string | boolean) => void
  onFileUpload: (file: File) => void
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
  isSubmitting: boolean
  isEditing: boolean
  errors: Record<string, string>
}

export default function CVForm({
  formData,
  onFieldChange,
  onFileUpload,
  onSubmit,
  onCancel,
  isSubmitting,
  isEditing,
  errors,
}: CVFormProps) {
  const [dragActive, setDragActive] = useState(false)
  const [fileError, setFileError] = useState('')

  const handleFileSelect = (file: File) => {
    setFileError('')
    
    // Validate file type
    if (!(VALIDATION.ALLOWED_CV_TYPES as readonly string[]).includes(file.type)) {
      setFileError('Please upload a PDF or Word document')
      return
    }

    // Validate file size
    if (file.size > VALIDATION.MAX_CV_FILE_SIZE) {
      setFileError(`File size must be less than ${VALIDATION.MAX_CV_FILE_SIZE / (1024 * 1024)}MB`)
      return
    }

    onFileUpload(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => onFieldChange('title', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., Web Developer Resume"
          disabled={isSubmitting}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description *
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => onFieldChange('description', e.target.value)}
          rows={3}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Brief description of this CV..."
          disabled={isSubmitting}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
        )}
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          CV File *
        </label>
        
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
            dragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600'
          } ${errors.downloadLink ? 'border-red-500' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isSubmitting}
          />
          
          <div className="space-y-2">
            <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium text-blue-600 dark:text-blue-400">
                Click to upload
              </span>
              {' '}or drag and drop
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              PDF, DOC, DOCX up to {VALIDATION.MAX_CV_FILE_SIZE / (1024 * 1024)}MB
            </p>
          </div>
        </div>

        {fileError && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fileError}</p>
        )}

        {errors.downloadLink && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.downloadLink}</p>
        )}

        {/* File info */}
        {formData.fileName && (
          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
            <div className="flex items-center space-x-2">
              <DocumentIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {formData.fileName}
              </span>
              {formData.fileSize && (
                <span className="text-xs text-gray-500">
                  ({formatFileSize(formData.fileSize)})
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Active status */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive}
          onChange={(e) => onFieldChange('isActive', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          disabled={isSubmitting}
        />
        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Set as active CV (only one CV can be active at a time)
        </label>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update CV' : 'Create CV'}
        </button>
      </div>
    </form>
  )
}
