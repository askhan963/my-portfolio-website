"use client"

import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useHonors, useHonorForm, Honor } from '@/hooks/useHonors'
import HonorCard from '@/components/honors/HonorCard'
import HonorForm from '@/components/honors/HonorForm'
import HonorViewDialog from '@/components/honors/HonorViewDialog'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function HonorsPage() {
  const {
    honors,
    loading,
    error,
    createHonor,
    updateHonor,
    deleteHonor,
  } = useHonors()

  const {
    formData,
    isSubmitting,
    setIsSubmitting,
    updateField,
    setImage,
    resetForm,
    setFormDataFromHonor,
  } = useHonorForm()

  const [showForm, setShowForm] = useState(false)
  const [editingHonor, setEditingHonor] = useState<Honor | null>(null)
  const [viewingHonor, setViewingHonor] = useState<Honor | null>(null)
  const [deletingHonor, setDeletingHonor] = useState<Honor | null>(null)

  const handleCreate = () => {
    resetForm()
    setEditingHonor(null)
    setShowForm(true)
  }

  const handleEdit = (honor: Honor) => {
    setFormDataFromHonor(honor)
    setEditingHonor(honor)
    setShowForm(true)
  }

  const handleView = (honor: Honor) => {
    setViewingHonor(honor)
  }

  const handleDeleteClick = (honor: Honor) => {
    setDeletingHonor(honor)
  }

  const handleDeleteConfirm = async () => {
    if (!deletingHonor) return

    try {
      setIsSubmitting(true)
      await deleteHonor(deletingHonor.id)
      setDeletingHonor(null)
    } catch (error) {
      console.error('Error deleting honor:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsSubmitting(true)
      
      const honorData = {
        ...formData,
        issuedAt: new Date(formData.issuedAt).toISOString(),
      }
      
      if (editingHonor) {
        await updateHonor(editingHonor.id, honorData)
      } else {
        await createHonor(honorData)
      }
      
      resetForm()
      setEditingHonor(null)
      setShowForm(false)
    } catch (error) {
      console.error('Error saving honor:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    resetForm()
    setEditingHonor(null)
    setShowForm(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Honors & Awards</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your certificates and achievements
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Honor</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <HonorForm
          formData={formData}
          onFieldChange={updateField}
          onImageSet={setImage}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          isEditing={!!editingHonor}
        />
      )}

      {/* Honors Grid */}
      {honors.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-600 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No honors yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Get started by adding your first honor or award.
          </p>
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Honor
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {honors.map((honor) => (
            <HonorCard
              key={honor.id}
              honor={honor}
              onEdit={handleEdit}
              onDelete={(id) => {
                const honor = honors.find(h => h.id === id)
                if (honor) handleDeleteClick(honor)
              }}
              onView={handleView}
            />
          ))}
        </div>
      )}

      {/* View Dialog */}
      <HonorViewDialog
        honor={viewingHonor}
        isOpen={!!viewingHonor}
        onClose={() => setViewingHonor(null)}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deletingHonor}
        onClose={() => setDeletingHonor(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Honor"
        message={`Are you sure you want to delete "${deletingHonor?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isSubmitting}
      />
    </div>
  )
}
