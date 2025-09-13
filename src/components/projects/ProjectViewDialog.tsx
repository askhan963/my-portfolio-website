import { Project } from '@/hooks/useProjects'
import { formatDate } from '@/lib/utils'
import Dialog from '../ui/Dialog'

interface ProjectViewDialogProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectViewDialog({ project, isOpen, onClose }: ProjectViewDialogProps) {
  if (!project) return null

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      size="xl"
    >
      <div className="space-y-6">
        {/* Images */}
        {project.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Description
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Awards */}
        {project.awards.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Awards
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.awards.map((award, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm rounded-full"
                >
                  {award}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Links
          </h3>
          <div className="space-y-2">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                GitHub Repository
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Category</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{project.category}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Created</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(project.createdAt)}</p>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
