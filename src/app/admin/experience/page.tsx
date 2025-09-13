"use client"

import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useExperience, useExperienceForm, Experience } from '@/hooks/useExperience'
import ExperienceCard from '@/components/experience/ExperienceCard'
import ExperienceForm from '@/components/experience/ExperienceForm'
import ExperienceViewDialog from '@/components/experience/ExperienceViewDialog'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function ExperiencePage() {
  const {
    experiences,
    loading,
    error,
    createExperience,
    updateExperience,
    deleteExperience,
  } = useExperience()

  const {
    formData,
    isSubmitting,
    setIsSubmitting,
    updateField,
    setLogo,
    addRole,
    removeRole,
    updateRole,
    resetForm,
    setFormDataFromExperience,
  } = useExperienceForm()

  const [showForm, setShowForm] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [viewingExperience, setViewingExperience] = useState<Experience | null>(null)
  const [deletingExperience, setDeletingExperience] = useState<Experience | null>(null)

  const handleCreate = () => {
    resetForm()
    setEditingExperience(null)
    setShowForm(true)
  }

  const handleEdit = (experience: Experience) => {
    setFormDataFromExperience(experience)
    setEditingExperience(experience)
    setShowForm(true)
  }

  const handleView = (experience: Experience) => {
    setViewingExperience(experience)
  }

  const handleDeleteClick = (experience: Experience) => {
    setDeletingExperience(experience)
  }

  const handleDeleteConfirm = async () => {
    if (!deletingExperience) return

    try {
      setIsSubmitting(true)
      await deleteExperience(deletingExperience.id)
      setDeletingExperience(null)
    } catch (error) {
      console.error('Error deleting experience:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsSubmitting(true)
      
      if (editingExperience) {
        await updateExperience(editingExperience.id, formData)
      } else {
        await createExperience(formData)
      }
      
      resetForm()
      setEditingExperience(null)
      setShowForm(false)
    } catch (error) {
      console.error('Error saving experience:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    resetForm()
    setEditingExperience(null)
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Work Experience</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your professional work experience
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <ExperienceForm
          formData={formData}
          onFieldChange={updateField}
          onLogoSet={setLogo}
          onAddRole={addRole}
          onRemoveRole={removeRole}
          onUpdateRole={updateRole}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          isEditing={!!editingExperience}
        />
      )}

      {/* Experiences List */}
      {experiences.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-600 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No experience yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Get started by adding your first work experience.
          </p>
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Experience
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {experiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              onView={handleView}
            />
          ))}
        </div>
      )}

      {/* View Dialog */}
      <ExperienceViewDialog
        experience={viewingExperience}
        isOpen={!!viewingExperience}
        onClose={() => setViewingExperience(null)}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deletingExperience}
        onClose={() => setDeletingExperience(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Experience"
        message={`Are you sure you want to delete "${deletingExperience?.company}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isSubmitting}
      />
    </div>
  )
}
