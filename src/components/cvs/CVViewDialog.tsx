"use client"

import Image from 'next/image'
import { CV } from '@/hooks/useCVs'
import { formatDate } from '@/lib/utils'
import Dialog from '../ui/Dialog'
import { DocumentIcon } from '@heroicons/react/24/outline'

interface CVViewDialogProps {
  cv: CV | null
  isOpen: boolean
  onClose: () => void
}

export default function CVViewDialog({ cv, isOpen, onClose }: CVViewDialogProps) {
  if (!cv) return null

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size'
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const getFileIcon = () => {
    if (cv.fileType?.includes('pdf')) {
      return '📄'
    } else if (cv.fileType?.includes('word') || cv.fileType?.includes('document')) {
      return '📝'
    }
    return '📄'
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="CV Details"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start space-x-4">
          <div className="text-6xl">
            {getFileIcon()}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {cv.title}
            </h3>
            {cv.isActive && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mt-2">
                Active CV
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            {cv.description}
          </p>
        </div>

        {/* File Details */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            File Information
          </h4>
          <div className="space-y-2 text-sm">
            {cv.fileName && (
              <div className="flex items-center space-x-2">
                <DocumentIcon className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  <strong>Filename:</strong> {cv.fileName}
                </span>
              </div>
            )}
            {cv.fileSize && (
              <div className="text-gray-600 dark:text-gray-400">
                <strong>Size:</strong> {formatFileSize(cv.fileSize)}
              </div>
            )}
            {cv.fileType && (
              <div className="text-gray-600 dark:text-gray-400">
                <strong>Type:</strong> {cv.fileType}
              </div>
            )}
            <div className="text-gray-600 dark:text-gray-400">
              <strong>Uploaded:</strong> {formatDate(cv.createdAt)}
            </div>
            {cv.updatedAt !== cv.createdAt && (
              <div className="text-gray-600 dark:text-gray-400">
                <strong>Last Updated:</strong> {formatDate(cv.updatedAt)}
              </div>
            )}
          </div>
        </div>

        {/* Download Section */}
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
          <a
            href={cv.downloadLink}
            download={cv.fileName || cv.title}
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <DocumentIcon className="h-5 w-5 mr-2" />
            Download CV
          </a>
        </div>
      </div>
    </Dialog>
  )
}
