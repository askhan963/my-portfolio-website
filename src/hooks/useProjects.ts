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
  // New Case Study Fields
  content?: string
  problemStatement?: string
  solution?: string
  features: string[]
  challenges: string[]
  learnings: string[]
  seoTitle?: string
  seoDescription?: string
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
  // New Case Study Fields
  content: string
  problemStatement: string
  solution: string
  features: string
  challenges: string
  learnings: string
  seoTitle: string
  seoDescription: string
}

export const useProjects = ({ enabled = true } = {}) => {
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

  // Create new project
  const createProject = useCallback(async (data: ProjectFormData) => {
    try {
      setLoading(true)
      const response = await projectsApi.create(data)
      setProjects(prev => [response, ...prev])
      toast.success(TOAST_MESSAGES.PROJECTS.CREATE_SUCCESS)
      return response
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || TOAST_MESSAGES.PROJECTS.CREATE_ERROR
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Update project
  const updateProject = useCallback(async (id: string, data: ProjectFormData) => {
    try {
      setLoading(true)
      const response = await projectsApi.update(id, data)
      setProjects(prev => prev.map(p => p.id === id ? response : p))
      toast.success(TOAST_MESSAGES.PROJECTS.UPDATE_SUCCESS)
      return response
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || TOAST_MESSAGES.PROJECTS.UPDATE_ERROR
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Delete project
  const deleteProject = useCallback(async (id: string) => {
    try {
      setLoading(true)
      await projectsApi.delete(id)
      setProjects(prev => prev.filter(p => p.id !== id))
      toast.success(TOAST_MESSAGES.PROJECTS.DELETE_SUCCESS)
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || TOAST_MESSAGES.PROJECTS.DELETE_ERROR
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (enabled) {
      fetchProjects()
    }
  }, [fetchProjects, enabled])

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
    content: '',
    problemStatement: '',
    solution: '',
    features: '',
    challenges: '',
    learnings: '',
    seoTitle: '',
    seoDescription: '',
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
      content: '',
      problemStatement: '',
      solution: '',
      features: '',
      challenges: '',
      learnings: '',
      seoTitle: '',
      seoDescription: '',
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
      content: project.content || '',
      problemStatement: project.problemStatement || '',
      solution: project.solution || '',
      features: project.features.join('\n'),
      challenges: project.challenges.join('\n'),
      learnings: project.learnings.join('\n'),
      seoTitle: project.seoTitle || '',
      seoDescription: project.seoDescription || '',
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
