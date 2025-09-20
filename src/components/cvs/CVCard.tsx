"use client"

import { useState } from 'react'
import Image from 'next/image'
import { PencilIcon, TrashIcon, EyeIcon, DocumentIcon } from '@heroicons/react/24/outline'
import { CV } from '@/hooks/useCVs'
import { formatDate } from '@/lib/utils'
import Button from '@/components/ui/Button'

interface CVCardProps {
  cv: CV
  onEdit: (cv: CV) => void
  onDelete: (id: string) => void
  onView?: (cv: CV) => void
}

export default function CVCard({ cv, onEdit, onDelete, onView }: CVCardProps) {
  const [imageError, setImageError] = useState(false)

  const getFileIcon = () => {
    if (cv.fileType?.includes('pdf')) {
      return '📄'
    } else if (cv.fileType?.includes('word') || cv.fileType?.includes('document')) {
      return '📝'
    }
    return '📄'
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return ''
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Header with file icon */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-4xl">
              {getFileIcon()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {cv.title}
              </h3>
              {cv.isActive && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Active
                </span>
              )}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            {onView && (
              <Button
                onClick={() => onView(cv)}
                variant="ghost"
                size="sm"
                className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                title="View CV"
              >
                <EyeIcon className="h-5 w-5" />
              </Button>
            )}
            <Button
              onClick={() => onEdit(cv)}
              variant="ghost"
              size="sm"
              className="p-2 text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors duration-200"
              title="Edit CV"
            >
              <PencilIcon className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => onDelete(cv.id)}
              variant="ghost"
              size="sm"
              className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
              title="Delete CV"
            >
              <TrashIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {cv.description}
        </p>

        {/* File details */}
        <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
          {cv.fileName && (
            <div className="flex items-center space-x-2">
              <DocumentIcon className="h-4 w-4" />
              <span className="truncate">{cv.fileName}</span>
            </div>
          )}
          {cv.fileSize && (
            <div>
              Size: {formatFileSize(cv.fileSize)}
            </div>
          )}
          <div>
            Uploaded: {formatDate(cv.createdAt)}
          </div>
        </div>

        {/* Download button */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <a
            href={cv.downloadLink}
            download={cv.fileName || cv.title}
            className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <DocumentIcon className="h-4 w-4 mr-2" />
            Download CV
          </a>
        </div>
      </div>
    </div>
  )
}
