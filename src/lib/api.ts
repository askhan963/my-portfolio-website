import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { API_ENDPOINTS, HTTP_METHODS } from './constants'

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth token here if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access')
    } else if (error.response?.status === 403) {
      // Handle forbidden access
      console.error('Forbidden access')
    } else if (error.response?.status && error.response.status >= 500) {
      // Handle server errors
      console.error('Server error:', error.response.status)
    }
    
    return Promise.reject(error)
  }
)

// Generic API methods
export const api = {
  get: <T = any>(url: string, config = {}) => 
    apiClient.get<T>(url, config).then(response => response.data),
  
  post: <T = any>(url: string, data = {}, config = {}) => 
    apiClient.post<T>(url, data, config).then(response => response.data),
  
  put: <T = any>(url: string, data = {}, config = {}) => 
    apiClient.put<T>(url, data, config).then(response => response.data),
  
  delete: <T = any>(url: string, config = {}) => 
    apiClient.delete<T>(url, config).then(response => response.data),
  
  patch: <T = any>(url: string, data = {}, config = {}) => 
    apiClient.patch<T>(url, data, config).then(response => response.data),
}

// Projects API
export const projectsApi = {
  getAll: () => api.get(API_ENDPOINTS.PROJECTS.BASE),
  
  getById: (id: string) => api.get(API_ENDPOINTS.PROJECTS.BY_ID(id)),
  
  create: (data: any) => api.post(API_ENDPOINTS.PROJECTS.BASE, data),
  
  update: (id: string, data: any) => api.put(API_ENDPOINTS.PROJECTS.BY_ID(id), data),
  
  delete: (id: string) => api.delete(API_ENDPOINTS.PROJECTS.BY_ID(id)),
}

// Honors API
export const honorsApi = {
  getAll: () => api.get(API_ENDPOINTS.HONORS.BASE),
  
  getById: (id: string) => api.get(API_ENDPOINTS.HONORS.BY_ID(id)),
  
  create: (data: any) => api.post(API_ENDPOINTS.HONORS.BASE, data),
  
  update: (id: string, data: any) => api.put(API_ENDPOINTS.HONORS.BY_ID(id), data),
  
  delete: (id: string) => api.delete(API_ENDPOINTS.HONORS.BY_ID(id)),
}

// Experience API
export const experienceApi = {
  getAll: () => api.get(API_ENDPOINTS.EXPERIENCE.BASE),
  
  getById: (id: string) => api.get(API_ENDPOINTS.EXPERIENCE.BY_ID(id)),
  
  create: (data: any) => api.post(API_ENDPOINTS.EXPERIENCE.BASE, data),
  
  update: (id: string, data: any) => api.put(API_ENDPOINTS.EXPERIENCE.BY_ID(id), data),
  
  delete: (id: string) => api.delete(API_ENDPOINTS.EXPERIENCE.BY_ID(id)),
}

// Profile API
export const profileApi = {
  get: () => api.get(API_ENDPOINTS.PROFILE.BASE),
  
  update: (data: any) => api.put(API_ENDPOINTS.PROFILE.BASE, data),
  
  changePassword: (data: any) => api.post(API_ENDPOINTS.PROFILE.CHANGE_PASSWORD, data),
}

// Upload API
export const uploadApi = {
  uploadImage: (file: File, folder: string = 'portfolio') => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)
    
    return apiClient.post(API_ENDPOINTS.UPLOAD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000, // 30 seconds timeout for uploads
    }).then(response => response.data)
  },
}

export default apiClient
