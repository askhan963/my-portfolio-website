"use client"

import { useProjects } from '@/hooks/useProjects'
import { useHonors } from '@/hooks/useHonors'
import { useExperience } from '@/hooks/useExperience'
import { 
  FolderIcon, 
  TrophyIcon, 
  BriefcaseIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

interface StatCardProps {
  title: string
  value: number
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
  isLoading?: boolean
}

function StatCard({ title, value, icon: Icon, color, bgColor, isLoading }: StatCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center h-20">
          <LoadingSpinner size="sm" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  )
}

export default function DashboardStats() {
  const { projects, loading: projectsLoading } = useProjects()
  const { honors, loading: honorsLoading } = useHonors()
  const { experiences, loading: experiencesLoading } = useExperience()

  const stats = [
    {
      title: 'Total Projects',
      value: projects.length,
      icon: FolderIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      isLoading: projectsLoading
    },
    {
      title: 'Honors & Awards',
      value: honors.length,
      icon: TrophyIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      isLoading: honorsLoading
    },
    {
      title: 'Work Experiences',
      value: experiences.length,
      icon: BriefcaseIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      isLoading: experiencesLoading
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
