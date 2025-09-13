"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import ImageUpload from '@/components/ImageUpload'

interface Honor {
  id: string
  title: string
  description: string
  image: string
  issuedBy: string
  issuedAt: string
  createdAt: string
  updatedAt: string
}

export default function HonorsPage() {
  const { data: session } = useSession()
  const [honors, setHonors] = useState<Honor[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingHonor, setEditingHonor] = useState<Honor | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    issuedBy: '',
    issuedAt: '',
  })

  useEffect(() => {
    fetchHonors()
  }, [])

  const fetchHonors = async () => {
    try {
      const response = await fetch('/api/honors')
      const data = await response.json()
      setHonors(data)
    } catch (error) {
      console.error('Error fetching honors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const honorData = {
        ...formData,
        issuedAt: new Date(formData.issuedAt).toISOString(),
      }

      const url = editingHonor ? `/api/honors/${editingHonor.id}` : '/api/honors'
      const method = editingHonor ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(honorData),
      })

      if (response.ok) {
        await fetchHonors()
        resetForm()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save honor')
      }
    } catch (error) {
      console.error('Error saving honor:', error)
      alert('Failed to save honor')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this honor?')) return

    try {
      const response = await fetch(`/api/honors/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchHonors()
      } else {
        alert('Failed to delete honor')
      }
    } catch (error) {
      console.error('Error deleting honor:', error)
      alert('Failed to delete honor')
    }
  }

  const handleEdit = (honor: Honor) => {
    setEditingHonor(honor)
    setFormData({
      title: honor.title,
      description: honor.description,
      image: honor.image,
      issuedBy: honor.issuedBy,
      issuedAt: new Date(honor.issuedAt).toISOString().split('T')[0], // Format for date input
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      issuedBy: '',
      issuedAt: '',
    })
    setEditingHonor(null)
    setShowForm(false)
  }

  const handleImageUpload = (url: string, publicId: string) => {
    setFormData(prev => ({
      ...prev,
      image: url
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Honors & Awards</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Honor
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            {editingHonor ? 'Edit Honor' : 'Add New Honor'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="e.g., Relational Database Certification"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Brief description of the honor or award"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Issued By
                </label>
                <input
                  type="text"
                  value={formData.issuedBy}
                  onChange={(e) => setFormData(prev => ({ ...prev, issuedBy: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., freeCodeCamp, Google"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Issued Date
                </label>
                <input
                  type="date"
                  value={formData.issuedAt}
                  onChange={(e) => setFormData(prev => ({ ...prev, issuedAt: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Certificate Image
              </label>
              <ImageUpload
                onUpload={handleImageUpload}
                folder="honors"
                className="mb-4"
              />
              
              {formData.image && (
                <div className="mt-4">
                  <img
                    src={formData.image}
                    alt="Certificate preview"
                    className="w-32 h-24 object-cover rounded-md border border-gray-300 dark:border-gray-600"
                  />
                </div>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                {editingHonor ? 'Update Honor' : 'Create Honor'}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {honors.map((honor) => (
          <div key={honor.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {honor.image && (
              <img
                src={honor.image}
                alt={honor.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {honor.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                {honor.description}
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                <p><strong>Issued by:</strong> {honor.issuedBy}</p>
                <p><strong>Date:</strong> {new Date(honor.issuedAt).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(honor)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(honor.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
