import { useState } from 'react'
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline'
import { Honor } from '@/hooks/useHonors'
import { formatDate } from '@/lib/utils'

interface HonorCardProps {
  honor: Honor
  onEdit: (honor: Honor) => void
  onDelete: (id: string) => void
  onView?: (honor: Honor) => void
}

export default function HonorCard({ honor, onEdit, onDelete, onView }: HonorCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {honor.image && !imageError && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={honor.image}
            alt={honor.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            onError={() => setImageError(true)}
          />
          {onView && (
            <button
              onClick={() => onView(honor)}
              className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center"
            >
              <EyeIcon className="h-8 w-8 text-white opacity-0 hover:opacity-100 transition-opacity duration-200" />
            </button>
          )}
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
            {honor.title}
          </h3>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {honor.description}
        </p>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium">Issued by:</span>
            <span className="ml-2">{honor.issuedBy}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium">Date:</span>
            <span className="ml-2">{formatDate(honor.issuedAt)}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
          <span>Created: {formatDate(honor.createdAt)}</span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(honor)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200"
          >
            <PencilIcon className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(honor.id)}
            className="flex items-center space-x-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium transition-colors duration-200"
          >
            <TrashIcon className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  )
}
