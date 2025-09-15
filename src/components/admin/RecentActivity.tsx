"use client"

import { useProjects } from '@/hooks/useProjects'
import { useHonors } from '@/hooks/useHonors'
import { useExperience } from '@/hooks/useExperience'
import { formatDate } from '@/lib/utils'
import { 
  FolderIcon, 
  TrophyIcon, 
  BriefcaseIcon,
  PlusIcon,
  PencilIcon
} from '@heroicons/react/24/outline'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

interface ActivityItem {
  id: string
  type: 'project' | 'honor' | 'experience'
  title: string
  action: 'created' | 'updated'
  date: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

export default function RecentActivity() {
  const { projects, loading: projectsLoading } = useProjects()
  const { honors, loading: honorsLoading } = useHonors()
  const { experiences, loading: experiencesLoading } = useExperience()

  const isLoading = projectsLoading || honorsLoading || experiencesLoading

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="flex items-center justify-center h-32">
          <LoadingSpinner size="sm" />
        </div>
      </div>
    )
  }

  // Create activity items from all data
  const activities: ActivityItem[] = [
    ...projects.slice(0, 3).map(project => ({
      id: project.id,
      type: 'project' as const,
      title: project.title,
      action: 'created' as const,
      date: project.createdAt,
      icon: FolderIcon,
      color: 'text-blue-600'
    })),
    ...honors.slice(0, 2).map(honor => ({
      id: honor.id,
      type: 'honor' as const,
      title: honor.title,
      action: 'created' as const,
      date: honor.createdAt,
      icon: TrophyIcon,
      color: 'text-yellow-600'
    })),
    ...experiences.slice(0, 2).map(experience => ({
      id: experience.id,
      type: 'experience' as const,
      title: experience.company,
      action: 'created' as const,
      date: experience.createdAt,
      icon: BriefcaseIcon,
      color: 'text-green-600'
    }))
  ]

  // Sort by date (most recent first)
  const sortedActivities = activities
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {sortedActivities.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 dark:text-gray-600 mb-2">
              <PlusIcon className="w-8 h-8 mx-auto" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity</p>
          </div>
        ) : (
          sortedActivities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700`}>
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.action === 'created' ? 'Created' : 'Updated'} • {formatDate(activity.date)}
                </p>
              </div>
              <div className="flex-shrink-0">
                <PencilIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
