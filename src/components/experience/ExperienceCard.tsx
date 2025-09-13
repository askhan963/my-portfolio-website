import { useState } from 'react'
import { PencilIcon, TrashIcon, EyeIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Experience } from '@/hooks/useExperience'
import { formatDate } from '@/lib/utils'

interface ExperienceCardProps {
  experience: Experience
  onEdit: (experience: Experience) => void
  onDelete: (id: string) => void
  onView?: (experience: Experience) => void
}

export default function ExperienceCard({ experience, onEdit, onDelete, onView }: ExperienceCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            {experience.logo && !imageError ? (
              <img
                src={experience.logo}
                alt={`${experience.company} logo`}
                className="w-12 h-12 object-cover rounded-lg"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 text-lg font-semibold">
                  {experience.company.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Company Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {experience.company}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {experience.period}
                </p>
              </div>
              {onView && (
                <button
                  onClick={() => onView(experience)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Roles */}
            <div className="mt-3 space-y-2">
              {experience.roles.map((role, index) => (
                <div key={role.id || index} className="border-l-2 border-blue-200 dark:border-blue-800 pl-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {role.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {role.period}
                  </p>
                  {role.description.length > 0 && (
                    <ul className="mt-1 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {role.description.slice(0, 2).map((desc, descIndex) => (
                        <li key={descIndex} className="flex items-start">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span className="line-clamp-1">{desc}</span>
                        </li>
                      ))}
                      {role.description.length > 2 && (
                        <li className="text-gray-500 dark:text-gray-500">
                          +{role.description.length - 2} more responsibilities
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Company Link */}
            {experience.companyLink && (
              <div className="mt-3">
                <a
                  href={experience.companyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Visit Company Website →
                </a>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => onEdit(experience)}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200"
              >
                <PencilIcon className="h-4 w-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => onDelete(experience.id)}
                className="flex items-center space-x-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium transition-colors duration-200"
              >
                <TrashIcon className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
