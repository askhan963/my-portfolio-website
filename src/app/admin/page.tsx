import DashboardStats from '@/components/admin/DashboardStats'
import RecentActivity from '@/components/admin/RecentActivity'
import Link from 'next/link'
import { 
  FolderIcon, 
  TrophyIcon, 
  BriefcaseIcon,
  ArrowRightIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

export default function AdminDashboard() {
  const quickActions = [
    {
      title: 'Add New Project',
      description: 'Create a new portfolio project',
      href: '/admin/projects',
      icon: FolderIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      hoverColor: 'hover:bg-blue-100 dark:hover:bg-blue-900/30'
    },
    {
      title: 'Add Honor/Award',
      description: 'Add a new certificate or award',
      href: '/admin/honors',
      icon: TrophyIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      hoverColor: 'hover:bg-yellow-100 dark:hover:bg-yellow-900/30'
    },
    {
      title: 'Add Experience',
      description: 'Add work experience entry',
      href: '/admin/experience',
      icon: BriefcaseIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      hoverColor: 'hover:bg-green-100 dark:hover:bg-green-900/30'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
        <p className="text-blue-100 text-lg">
          Manage your portfolio content and track your progress
        </p>
      </div>

      {/* Stats Cards */}
      <DashboardStats />

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className={`p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 ${action.bgColor} ${action.hoverColor} transition-all duration-200 hover:shadow-md group`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 sm:p-3 rounded-lg bg-white dark:bg-gray-800`}>
                    <action.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${action.color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 text-sm sm:text-base">
                      {action.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                      {action.description}
                    </p>
                  </div>
                </div>
                <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        
        {/* Quick Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Portfolio Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Total Projects</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Awards & Certificates</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Verified</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Work Experience</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Complete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}