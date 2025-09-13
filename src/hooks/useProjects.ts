import { useState, useEffect, useCallback } from 'react'
import { projectsApi } from '@/lib/api'
import { TOAST_MESSAGES } from '@/lib/constants'
import toast from 'react-hot-toast'

export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  githubLink?: string
  liveLink?: string
  images: string[]
  awards: string[]
  category: string
  createdAt: string
  updatedAt: string
}

export interface ProjectFormData {
  title: string
  description: string
  techStack: string
  githubLink: string
  liveLink: string
  images: string[]
  awards: string
  category: string
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await projectsApi.getAll()
      setProjects(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : TOAST_MESSAGES.PROJECTS.FETCH_ERROR
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  const createProject = useCallback(async (projectData: ProjectFormData) => {
    try {
      const processedData = {
        ...projectData,
        techStack: projectData.techStack.split(',').map(tech => tech.trim()).filter(Boolean),
        awards: projectData.awards.split(',').map(award => award.trim()).filter(Boolean),
      }

      const newProject = await projectsApi.create(processedData)
      setProjects(prev => [newProject, ...prev])
      toast.success(TOAST_MESSAGES.PROJECTS.CREATE_SUCCESS)
      return newProject
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : TOAST_MESSAGES.PROJECTS.CREATE_ERROR
      toast.error(errorMessage)
      throw err
    }
  }, [])

  const updateProject = useCallback(async (id: string, projectData: ProjectFormData) => {
    try {
      const processedData = {
        ...projectData,
        techStack: projectData.techStack.split(',').map(tech => tech.trim()).filter(Boolean),
        awards: projectData.awards.split(',').map(award => award.trim()).filter(Boolean),
      }

      const updatedProject = await projectsApi.update(id, processedData)
      setProjects(prev => prev.map(project => 
        project.id === id ? updatedProject : project
      ))
      toast.success(TOAST_MESSAGES.PROJECTS.UPDATE_SUCCESS)
      return updatedProject
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : TOAST_MESSAGES.PROJECTS.UPDATE_ERROR
      toast.error(errorMessage)
      throw err
    }
  }, [])

  const deleteProject = useCallback(async (id: string) => {
    try {
      await projectsApi.delete(id)
      setProjects(prev => prev.filter(project => project.id !== id))
      toast.success(TOAST_MESSAGES.PROJECTS.DELETE_SUCCESS)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : TOAST_MESSAGES.PROJECTS.DELETE_ERROR
      toast.error(errorMessage)
      throw err
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  }
}

export const useProjectForm = (initialData?: ProjectFormData) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    techStack: '',
    githubLink: '',
    liveLink: '',
    images: [],
    awards: '',
    category: '',
    ...initialData,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = useCallback((field: keyof ProjectFormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  const addImage = useCallback((url: string) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, url],
    }))
  }, [])

  const removeImage = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }, [])

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      description: '',
      techStack: '',
      githubLink: '',
      liveLink: '',
      images: [],
      awards: '',
      category: '',
    })
    setIsSubmitting(false)
  }, [])

  const setFormDataFromProject = useCallback((project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(', '),
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
      images: project.images,
      awards: project.awards.join(', '),
      category: project.category,
    })
  }, [])

  return {
    formData,
    isSubmitting,
    setIsSubmitting,
    updateField,
    addImage,
    removeImage,
    resetForm,
    setFormDataFromProject,
  }
}
