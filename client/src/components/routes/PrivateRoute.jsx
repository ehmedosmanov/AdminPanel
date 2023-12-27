import React, { useContext } from 'react'
import { AuthContext } from '../context/GlobalContext'
import { Outlet, Navigate } from 'react-router-dom'
const PrivateRoute = ({ check }) => {
  const { user, role } = useContext(AuthContext)
  const isAuthorized = check.includes(role)
  return isAuthorized ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRoute
