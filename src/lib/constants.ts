// API Endpoints
export const API_ENDPOINTS = {
  // Projects
  PROJECTS: {
    BASE: '/api/projects',
    BY_ID: (id: string) => `/api/projects/${id}`,
  },
  // Honors
  HONORS: {
    BASE: '/api/honors',
    BY_ID: (id: string) => `/api/honors/${id}`,
  },
  // Experience
  EXPERIENCE: {
    BASE: '/api/experience',
    BY_ID: (id: string) => `/api/experience/${id}`,
  },
  // Upload
  UPLOAD: '/api/upload',
  // Profile
  PROFILE: {
    BASE: '/api/profile',
    CHANGE_PASSWORD: '/api/profile/change-password',
  },
  // Auth
  AUTH: {
    LOGIN: '/api/auth/signin',
    LOGOUT: '/api/auth/signout',
  },
} as const

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const

// API Response Status
export const API_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
} as const

// Toast Messages
export const TOAST_MESSAGES = {
  PROJECTS: {
    CREATE_SUCCESS: 'Project created successfully!',
    CREATE_ERROR: 'Failed to create project',
    UPDATE_SUCCESS: 'Project updated successfully!',
    UPDATE_ERROR: 'Failed to update project',
    DELETE_SUCCESS: 'Project deleted successfully!',
    DELETE_ERROR: 'Failed to delete project',
    FETCH_ERROR: 'Failed to fetch projects',
  },
  UPLOAD: {
    SUCCESS: 'Image uploaded successfully!',
    ERROR: 'Failed to upload image',
    INVALID_TYPE: 'Invalid file type. Please upload an image.',
    TOO_LARGE: 'File too large. Maximum size is 5MB.',
  },
  PROFILE: {
    FETCH_ERROR: 'Failed to fetch profile',
    UPDATE_SUCCESS: 'Profile updated successfully!',
    UPDATE_ERROR: 'Failed to update profile',
    PASSWORD_CHANGE_SUCCESS: 'Password changed successfully!',
    PASSWORD_CHANGE_ERROR: 'Failed to change password',
  },
  GENERAL: {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    UNKNOWN_ERROR: 'An unexpected error occurred.',
  },
} as const

// Form Validation
export const VALIDATION = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  REQUIRED_FIELDS: {
    PROJECT: ['title', 'description', 'category'],
  },
} as const

// UI Constants
export const UI = {
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
  },
  ANIMATION: {
    DURATION: 200,
  },
  DEBOUNCE: {
    SEARCH: 300,
  },
} as const
