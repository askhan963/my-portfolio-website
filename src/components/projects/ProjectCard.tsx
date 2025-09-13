import { useState } from 'react'
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline'
import { Project } from '@/hooks/useProjects'
import { formatDate } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  onEdit: (project: Project) => void
  onDelete: (id: string) => void
  onView?: (project: Project) => void
}

export default function ProjectCard({ project, onEdit, onDelete, onView }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {project.images.length > 0 && !imageError && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            onError={() => setImageError(true)}
          />
          {onView && (
            <button
              onClick={() => onView(project)}
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
            {project.title}
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {project.category}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {project.techStack.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
              +{project.techStack.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
          <span>Created: {formatDate(project.createdAt)}</span>
          {project.awards.length > 0 && (
            <span className="text-yellow-600 dark:text-yellow-400">
              {project.awards.length} award{project.awards.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(project)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200"
          >
            <PencilIcon className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(project.id)}
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
