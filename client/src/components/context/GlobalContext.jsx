import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode' // Исправлено здесь
import { useNavigate } from 'react-router-dom'
import { api } from '../http'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || ''
  )
  const [adminUsers, setAdminUsers] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [role, setRole] = useState(localStorage.getItem('role') || null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

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
      const res = await api.post(
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
      const res = await api.post(
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
      const res = await api.get('/user', {
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
      await api.post('/auth/logout', null, {
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
    } catch (error) {
      console.log(error)
    }
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
