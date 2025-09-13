"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import ImageUpload from '@/components/ImageUpload'

interface ExperienceRole {
  id?: string
  title: string
  period: string
  description: string[]
}

interface Experience {
  id: string
  company: string
  companyLink?: string
  logo: string
  period: string
  roles: ExperienceRole[]
  createdAt: string
  updatedAt: string
}

export default function ExperiencePage() {
  const { data: session } = useSession()
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [formData, setFormData] = useState({
    company: '',
    companyLink: '',
    logo: '',
    period: '',
    roles: [] as ExperienceRole[],
  })

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/experience')
      const data = await response.json()
      setExperiences(data)
    } catch (error) {
      console.error('Error fetching experiences:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingExperience ? `/api/experience/${editingExperience.id}` : '/api/experience'
      const method = editingExperience ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchExperiences()
        resetForm()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save experience')
      }
    } catch (error) {
      console.error('Error saving experience:', error)
      alert('Failed to save experience')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return

    try {
      const response = await fetch(`/api/experience/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchExperiences()
      } else {
        alert('Failed to delete experience')
      }
    } catch (error) {
      console.error('Error deleting experience:', error)
      alert('Failed to delete experience')
    }
  }

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience)
    setFormData({
      company: experience.company,
      companyLink: experience.companyLink || '',
      logo: experience.logo,
      period: experience.period,
      roles: experience.roles.map(role => ({
        ...role,
        description: Array.isArray(role.description) ? role.description : [role.description]
      })),
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      company: '',
      companyLink: '',
      logo: '',
      period: '',
      roles: [],
    })
    setEditingExperience(null)
    setShowForm(false)
  }

  const handleImageUpload = (url: string, publicId: string) => {
    setFormData(prev => ({
      ...prev,
      logo: url
    }))
  }

  const addRole = () => {
    setFormData(prev => ({
      ...prev,
      roles: [...prev.roles, { title: '', period: '', description: [''] }]
    }))
  }

  const removeRole = (index: number) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.filter((_, i) => i !== index)
    }))
  }

  const updateRole = (index: number, field: keyof ExperienceRole, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.map((role, i) => 
        i === index ? { ...role, [field]: value } : role
      )
    }))
  }

  const addDescription = (roleIndex: number) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.map((role, i) => 
        i === roleIndex 
          ? { ...role, description: [...role.description, ''] }
          : role
      )
    }))
  }

  const removeDescription = (roleIndex: number, descIndex: number) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.map((role, i) => 
        i === roleIndex 
          ? { ...role, description: role.description.filter((_, j) => j !== descIndex) }
          : role
      )
    }))
  }

  const updateDescription = (roleIndex: number, descIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.map((role, i) => 
        i === roleIndex 
          ? { 
              ...role, 
              description: role.description.map((desc, j) => 
                j === descIndex ? value : desc
              )
            }
          : role
      )
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Work Experience</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Experience
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            {editingExperience ? 'Edit Experience' : 'Add New Experience'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., Tech Avenue Pvt Ltd"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company Website
                </label>
                <input
                  type="url"
                  value={formData.companyLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyLink: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Period
                </label>
                <input
                  type="text"
                  value={formData.period}
                  onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., Jan 2024 – Present | Onsite"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company Logo
                </label>
                <ImageUpload
                  onUpload={handleImageUpload}
                  folder="experience"
                  className="mb-4"
                />
                
                {formData.logo && (
                  <div className="mt-2">
                    <img
                      src={formData.logo}
                      alt="Company logo preview"
                      className="w-16 h-16 object-cover rounded-md border border-gray-300 dark:border-gray-600"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Roles & Positions
                </label>
                <button
                  type="button"
                  onClick={addRole}
                  className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700"
                >
                  Add Role
                </button>
              </div>

              {formData.roles.map((role, roleIndex) => (
                <div key={roleIndex} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">Role {roleIndex + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeRole(roleIndex)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove Role
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={role.title}
                        onChange={(e) => updateRole(roleIndex, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="e.g., Software Engineer"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Period
                      </label>
                      <input
                        type="text"
                        value={role.period}
                        onChange={(e) => updateRole(roleIndex, 'period', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="e.g., April 2024 – Present"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Responsibilities
                      </label>
                      <button
                        type="button"
                        onClick={() => addDescription(roleIndex)}
                        className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                      >
                        Add Point
                      </button>
                    </div>

                    {role.description.map((desc, descIndex) => (
                      <div key={descIndex} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={desc}
                          onChange={(e) => updateDescription(roleIndex, descIndex, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Describe your responsibility or achievement"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => removeDescription(roleIndex, descIndex)}
                          className="text-red-600 hover:text-red-800 px-2"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                {editingExperience ? 'Update Experience' : 'Create Experience'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {experiences.map((experience) => (
          <div key={experience.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                {experience.logo && (
                  <img
                    src={experience.logo}
                    alt={experience.company}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {experience.company}
                  </h3>
                  {experience.companyLink && (
                    <a
                      href={experience.companyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {experience.companyLink}
                    </a>
                  )}
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {experience.period}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(experience)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(experience.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {experience.roles.map((role, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {role.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {role.period}
                  </p>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {role.description.map((desc, descIndex) => (
                      <li key={descIndex} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
