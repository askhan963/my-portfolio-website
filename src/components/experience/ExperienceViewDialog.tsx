import { Experience } from '@/hooks/useExperience'
import { formatDate } from '@/lib/utils'
import Dialog from '../ui/Dialog'

interface ExperienceViewDialogProps {
  experience: Experience | null
  isOpen: boolean
  onClose: () => void
}

export default function ExperienceViewDialog({ experience, isOpen, onClose }: ExperienceViewDialogProps) {
  if (!experience) return null

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={experience.company}
      size="xl"
    >
      <div className="space-y-6">
        {/* Company Header */}
        <div className="flex items-start space-x-4">
          {experience.logo && (
            <img
              src={experience.logo}
              alt={`${experience.company} logo`}
              className="w-16 h-16 object-cover rounded-lg"
            />
          )}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {experience.company}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {experience.period}
            </p>
            {experience.companyLink && (
              <a
                href={experience.companyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
              >
                Visit Company Website →
              </a>
            )}
          </div>
        </div>

        {/* Roles */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Roles & Responsibilities
          </h4>
          <div className="space-y-4">
            {experience.roles.map((role, index) => (
              <div key={role.id || index} className="border-l-4 border-blue-200 dark:border-blue-800 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-md font-medium text-gray-900 dark:text-white">
                    {role.title}
                  </h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {role.period}
                  </span>
                </div>
                {role.description.length > 0 && (
                  <ul className="space-y-1">
                    {role.description.map((desc, descIndex) => (
                      <li key={descIndex} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Metadata */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Created: {formatDate(experience.createdAt)}</p>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
