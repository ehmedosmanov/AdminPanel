import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode' // Исправлено здесь
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 5000
})

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || ''
  )
  const [adminUsers, setAdminUsers] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [role, setRole] = useState(localStorage.getItem('role') || null)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  axiosInstance.interceptors.request.use(
    async config => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const access_token = await refreshAccessToken()
        localStorage.setItem('token', access_token)
        console.log('Updated Token:', access_token)
        axiosInstance.defaults.headers['Authorization'] =
          'Bearer ' + access_token
        originalRequest.headers['Authorization'] = 'Bearer ' + access_token
        return axiosInstance(originalRequest)
      }
      return Promise.reject(error)
    }
  )

  async function refreshAccessToken() {
    try {
      const res = await axiosInstance.post(
        '/auth/refresh',
        {},
        { withCredentials: true }
      )
      if (res.data) {
        const newToken = res.data.token
        axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + newToken
        console.log('salam', newToken)
        return newToken
      } else {
        throw new Error('Refresh token failed')
      }
    } catch (error) {
      console.error('Refresh token failed:', error)
      return null
    }
  }

  const handleAuthentication = async res => {
    if (res.data) {
      const decodeToken = jwtDecode(res.data.token)
      setUser(decodeToken)
      setToken(res.data.token)
      setRole(decodeToken.role)
      localStorage.setItem('user', JSON.stringify(decodeToken))
      localStorage.setItem('role', decodeToken.role)
      localStorage.setItem('token', res.data.token)
      setError(null)
      console.log('User authenticated:', decodeToken)
    } else {
      console.error('Authentication response does not contain token data')
      setError('Authentication failed')
    }
  }

  const register = async userData => {
    try {
      const res = await axiosInstance.post(
        '/auth/register',
        {
          username: userData.username,
          email: userData.email,
          password: userData.password
        },
        { withCredentials: true }
      )
      await handleAuthentication(res)
      navigate('/profile')
    } catch (error) {
      console.error('Registration failed:', error)
      setError(error.res?.data.message || 'Registration failed')
    }
  }

  const login = async userData => {
    try {
      const res = await axiosInstance.post(
        '/auth/login',
        {
          username: userData.username,
          password: userData.password,
          email: userData.email
        },
        { withCredentials: true }
      )
      await handleAuthentication(res)
      navigate('/profile')
    } catch (error) {
      console.error('Login failed:', error)
      setError(error.response?.data.message || 'Login failed')
    }
  }

  const getAllUsers = async () => {
    try {
      const res = await axiosInstance.get('/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = res.data.users
      setAdminUsers(data)
    } catch (error) {
      setError(error.response?.data.message)
    }
  }

  const logout = async () => {
    try {
      await axiosInstance.post('/auth/logout', null, {
        withCredentials: true
      })
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      setUser(null)
      setToken(null)
      setRole(null)
      setError(null)
      navigate('/')
    } catch (error) {}
  }

  useEffect(() => {
    getAllUsers()
  }, [token])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        error,
        register,
        role,
        login,
        logout,
        adminUsers,
        getAllUsers
      }}>
      {children}
    </AuthContext.Provider>
  )
}
