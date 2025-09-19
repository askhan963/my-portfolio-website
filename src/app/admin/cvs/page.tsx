"use client"

import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useCVs, useCVForm, CV, CVFormData } from '@/hooks/useCVs'
import CVCard from '@/components/cvs/CVCard'
import CVForm from '@/components/cvs/CVForm'
import CVViewDialog from '@/components/cvs/CVViewDialog'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { uploadApi } from '@/lib/api'
import { VALIDATION } from '@/lib/constants'
import toast from 'react-hot-toast'

export default function CVsPage() {
  const { cvs, loading, createCV, updateCV, deleteCV } = useCVs()
  const [showForm, setShowForm] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedCV, setSelectedCV] = useState<CV | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const {
    formData,
    setFormData,
    errors,
    isSubmitting: formSubmitting,
    setIsSubmitting: setFormSubmitting,
    handleFieldChange,
    validateForm,
    resetForm,
  } = useCVForm()

  const handleCreateClick = () => {
    resetForm()
    setIsEditing(false)
    setShowForm(true)
  }

  const handleEditClick = (cv: CV) => {
    setFormData({
      title: cv.title,
      description: cv.description,
      downloadLink: cv.downloadLink,
      fileName: cv.fileName || '',
      fileSize: cv.fileSize,
      fileType: cv.fileType || '',
      isActive: cv.isActive,
    })
    setIsEditing(true)
    setShowForm(true)
  }

  const handleViewClick = (cv: CV) => {
    setSelectedCV(cv)
    setShowViewDialog(true)
  }

  const handleDeleteClick = (id: string) => {
    const cv = cvs.find(c => c.id === id)
    setSelectedCV(cv || null)
    setShowDeleteDialog(true)
  }

  const handleFileUpload = async (file: File) => {
    try {
      setFormSubmitting(true)
      
      // Upload file to Cloudinary
      const response = await uploadApi.uploadImage(file, 'cvs')
      
      // Update form data with file info
      handleFieldChange('downloadLink', response.url)
      handleFieldChange('fileName', file.name)
      setFormData(prev => ({ ...prev, fileSize: file.size }))
      handleFieldChange('fileType', file.type)
      
      toast.success('File uploaded successfully!')
    } catch (error: any) {
      console.error('Error uploading file:', error)
      toast.error(error.response?.data?.error || 'Failed to upload file')
    } finally {
      setFormSubmitting(false)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setFormSubmitting(true)

    try {
      let success = false
      
      if (isEditing && selectedCV) {
        success = await updateCV(selectedCV.id, formData)
      } else {
        success = await createCV(formData)
      }

      if (success) {
        setShowForm(false)
        resetForm()
        setSelectedCV(null)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
      setFormSubmitting(false)
    }
  }

  const handleFormCancel = () => {
    setShowForm(false)
    resetForm()
    setSelectedCV(null)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedCV) return

    setIsSubmitting(true)
    try {
      const success = await deleteCV(selectedCV.id)
      if (success) {
        setShowDeleteDialog(false)
        setSelectedCV(null)
      }
    } catch (error) {
      console.error('Error deleting CV:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false)
    setSelectedCV(null)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            CV Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your CVs and resumes
          </p>
        </div>
        <button
          onClick={handleCreateClick}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add CV
        </button>
      </div>

      {/* CVs Grid */}
      {cvs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No CVs found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Get started by uploading your first CV.
          </p>
          <button
            onClick={handleCreateClick}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add CV
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cvs.map((cv) => (
            <CVCard
              key={cv.id}
              cv={cv}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              onView={handleViewClick}
            />
          ))}
        </div>
      )}

      {/* CV Form Dialog */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {isEditing ? 'Edit CV' : 'Add New CV'}
                </h2>
                <button
                  onClick={handleFormCancel}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <CVForm
                formData={formData}
                onFieldChange={handleFieldChange}
                onFileUpload={handleFileUpload}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                isSubmitting={formSubmitting}
                isEditing={isEditing}
                errors={errors}
              />
            </div>
          </div>
        </div>
      )}

      {/* View Dialog */}
      <CVViewDialog
        cv={selectedCV}
        isOpen={showViewDialog}
        onClose={() => setShowViewDialog(false)}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete CV"
        message={`Are you sure you want to delete "${selectedCV?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isSubmitting}
        variant="danger"
      />
    </div>
  )
}
