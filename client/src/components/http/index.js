import axios from 'axios'

export const API_URL = `http://localhost:8000/api`

export const api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

api.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

let isRefreshing = false

api.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry &&
      !isRefreshing
    ) {
      originalRequest._isRetry = true
      isRefreshing = true
      try {
        const response = await axios.get(`${API_URL}/auth/refresh`, {
          withCredentials: true
        })
        const newToken = response.data.token
        localStorage.setItem('token', newToken)

        return api.request(originalRequest)
      } catch (e) {
        console.log('Not authorized')
      } finally {
        isRefreshing = false
      }
    }

    throw error
  }
)
