"use client"

import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useProjects, useProjectForm, Project } from '@/hooks/useProjects'
import ProjectCard from '@/components/projects/ProjectCard'
import ProjectForm from '@/components/projects/ProjectForm'
import ProjectViewDialog from '@/components/projects/ProjectViewDialog'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function ProjectsPage() {
  const {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
  } = useProjects()

  const {
    formData,
    isSubmitting,
    setIsSubmitting,
    updateField,
    addImage,
    removeImage,
    resetForm,
    setFormDataFromProject,
  } = useProjectForm()

  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [viewingProject, setViewingProject] = useState<Project | null>(null)
  const [deletingProject, setDeletingProject] = useState<Project | null>(null)

  const handleCreate = () => {
    resetForm()
    setEditingProject(null)
    setShowForm(true)
  }

  const handleEdit = (project: Project) => {
    setFormDataFromProject(project)
    setEditingProject(project)
    setShowForm(true)
  }

  const handleView = (project: Project) => {
    setViewingProject(project)
  }

  const handleDeleteClick = (project: Project) => {
    setDeletingProject(project)
  }

  const handleDeleteConfirm = async () => {
    if (!deletingProject) return

    try {
      setIsSubmitting(true)
      await deleteProject(deletingProject.id)
      setDeletingProject(null)
    } catch (error) {
      console.error('Error deleting project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsSubmitting(true)
      
      if (editingProject) {
        await updateProject(editingProject.id, formData)
      } else {
        await createProject(formData)
      }
      
      resetForm()
      setEditingProject(null)
      setShowForm(false)
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    resetForm()
    setEditingProject(null)
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your portfolio projects
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <ProjectForm
          formData={formData}
          onFieldChange={updateField}
          onImageAdd={addImage}
          onImageRemove={removeImage}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          isEditing={!!editingProject}
        />
      )}

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-600 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No projects yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Get started by creating your first project.
          </p>
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onDelete={(id) => {
                const project = projects.find(p => p.id === id)
                if (project) handleDeleteClick(project)
              }}
              onView={handleView}
            />
          ))}
        </div>
      )}

      {/* View Dialog */}
      <ProjectViewDialog
        project={viewingProject}
        isOpen={!!viewingProject}
        onClose={() => setViewingProject(null)}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deletingProject}
        onClose={() => setDeletingProject(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Project"
        message={`Are you sure you want to delete "${deletingProject?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isSubmitting}
      />
    </div>
  )
}
