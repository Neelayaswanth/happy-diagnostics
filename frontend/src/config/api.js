// API configuration
// In development, use localhost. In production, use environment variable or relative path

const getApiBaseUrl = () => {
  // Check if we're in development (localhost)
  if (import.meta.env.DEV) {
    // In development, use localhost backend
    return 'http://localhost:5000'
  }
  
  // In production, use environment variable or default to relative path
  // If backend is deployed separately, set VITE_API_URL in Netlify environment variables
  return import.meta.env.VITE_API_URL || ''
}

export const API_BASE_URL = getApiBaseUrl()

// Helper function to build API URLs
export const getApiUrl = (endpoint) => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
  
  if (API_BASE_URL) {
    return `${API_BASE_URL}/${cleanEndpoint}`
  }
  
  // If no base URL, use relative path (for same-origin requests)
  return `/${cleanEndpoint}`
}

// Helper function for API requests
export const apiRequest = async (endpoint, options = {}) => {
  const url = getApiUrl(endpoint)
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }
  
  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  })
  
  return response
}

