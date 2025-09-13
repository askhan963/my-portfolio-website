import { Honor } from '@/hooks/useHonors'
import { formatDate } from '@/lib/utils'
import Dialog from '../ui/Dialog'

interface HonorViewDialogProps {
  honor: Honor | null
  isOpen: boolean
  onClose: () => void
}

export default function HonorViewDialog({ honor, isOpen, onClose }: HonorViewDialogProps) {
  if (!honor) return null

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={honor.title}
      size="lg"
    >
      <div className="space-y-6">
        {/* Image */}
        {honor.image && (
          <div className="relative">
            <img
              src={honor.image}
              alt={honor.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Description
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {honor.description}
          </p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Issued By</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{honor.issuedBy}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Issued Date</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(honor.issuedAt)}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Created</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(honor.createdAt)}</p>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
