"use client"

import { useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { uploadApi } from '@/lib/api'

interface ImageUploadProps {
  onUpload: (url: string, publicId: string) => void
  onError?: (error: string) => void
  folder?: string
  className?: string
  disabled?: boolean
}

export default function ImageUpload({
  onUpload,
  onError,
  folder = 'portfolio',
  className = '',
  disabled = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { data: session } = useSession()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      const errorMsg = 'Please select a valid image file (JPEG, PNG, WebP, or GIF)'
      setError(errorMsg)
      onError?.(errorMsg)
      return
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      const errorMsg = 'File size must be less than 5MB'
      setError(errorMsg)
      onError?.(errorMsg)
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload file
    uploadFile(file)
  }

  const uploadFile = async (file: File) => {
    if (!session) {
      const errorMsg = 'You must be logged in to upload files'
      setError(errorMsg)
      onError?.(errorMsg)
      return
    }

    setIsUploading(true)
    setError('')

    try {
      console.log('Starting upload for file:', file.name, 'Size:', file.size)
      const result = await uploadApi.uploadImage(file, folder)
      console.log('Upload successful:', result)
      onUpload(result.url, result.publicId)
      setPreview(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Upload error:', error)
      let errorMsg = 'Upload failed'
      
      if (error instanceof Error) {
        if (error.message.includes('timeout')) {
          errorMsg = 'Upload timed out. Please try again with a smaller file.'
        } else if (error.message.includes('Network Error')) {
          errorMsg = 'Network error. Please check your connection and try again.'
        } else {
          errorMsg = error.message
        }
      }
      
      setError(errorMsg)
      onError?.(errorMsg)
    } finally {
      setIsUploading(false)
    }
  }

  const handleClick = () => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        onClick={handleClick}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${disabled || isUploading
            ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
            : 'border-gray-400 hover:border-blue-500 hover:bg-blue-50'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled || isUploading}
        />

        {preview ? (
          <div className="space-y-2">
            <img
              src={preview}
              alt="Preview"
              className="mx-auto h-32 w-32 object-cover rounded-lg"
            />
            <p className="text-sm text-gray-600">Click to change image</p>
          </div>
        ) : (
          <div className="space-y-2">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-blue-600 hover:text-blue-500">
                Click to upload
              </span>
              <p>or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, WebP, GIF up to 5MB</p>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
            <div className="flex flex-col items-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-600 font-medium">Uploading...</span>
              <span className="text-xs text-gray-500">This may take a moment</span>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}
    </div>
  )
}
