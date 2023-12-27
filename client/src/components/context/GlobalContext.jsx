import { createContext, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  )
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [role, setRole] = useState(localStorage.getItem('role') || null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const handleAuthentication = async res => {
    const decodeToken = jwtDecode(res.data.token)
    setUser(decodeToken)
    setToken(res.data.token)
    setRole(decodeToken.role)
    localStorage.setItem('user', JSON.stringify(decodeToken))
    localStorage.setItem('role', decodeToken.role)
    localStorage.setItem('token', res.data.token)
    setError(null)
    navigate('/profile')
    console.log('User authenticated:', decodeToken)
  }

  const register = async userData => {
    try {
      const res = await axios.post('http://localhost:8000/api/auth/register', {
        username: userData.username,
        email: userData.email,
        password: userData.password
      })
      await handleAuthentication(res)
    } catch (error) {
      console.error('Registration failed:', error)
      setError(error.res?.data.message || 'Registration failed')
    }
  }

  const login = async userData => {
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', {
        username: userData.username,
        password: userData.password,
        email: userData.email
      })
      await handleAuthentication(res)
    } catch (error) {
      console.error('Login failed:', error)
      setError(error.response?.data.message || 'Login failed')
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    setUser(null)
    setToken(null)
    setError(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider
      value={{ user, token, error, register, logout, role, login }}>
      {children}
    </AuthContext.Provider>
  )
}
